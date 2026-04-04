"use strict";

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('ioredis');
const Docker = require('dockerode');
const { ethers } = require('ethers');
const crypto = require('crypto');
const axios = require('axios');
const { PrismaClient } = require('@prisma/client');
const { Queue } = require('bullmq');
const { Server: HocuspocusServer } = require('@hocuspocus/server');
const cors = require('cors');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const redisConnection = { host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379 };
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const docker = new Docker();

// BullMQ Queues
const translationQueue = new Queue('problem-translation', { connection: redisConnection });
const contestQueue = new Queue('contest-lifecycle', { connection: redisConnection });

// Hocuspocus Collaborative Server
const hocuspocus = new HocuspocusServer({
  name: 'collaborative-papers',
  port: 1234,
  timeout: 30000,
});
hocuspocus.listen();

app.use(express.json());

// 1. Session Integrity (Layer 1 Proctoring)
io.on('connection', (socket) => {
    let walletAddress = null;
    let problemId = null;
    let warnings = 0;

    socket.on('start_session', ({ wallet, pId }) => {
        walletAddress = wallet;
        problemId = pId;
        console.log(`[SESSION] Started for ${wallet} on problem ${pId}`);
    });

    // 4. Live Contest Logic (Socket.io)
    socket.on('join_contest', ({ contestId, userId }) => {
        socket.join(`contest_${contestId}`);
        console.log(`[ARENA] User ${userId} joined contest ${contestId}`);
    });

    socket.on('submit_contest_task', ({ contestId, userId, problemId, score }) => {
        // Broadcast leaderboard update to all in the contest room
        // Fetch real-time leaderboard data and emit 'leaderboard_update'
        // io.to(`contest_${contestId}`).emit('leaderboard_update', { data: [] });
    });

    // Face verification frame validation
    socket.on('proctoring_frame', async (frameData) => {
        // Send frame to AI-Engine for face verification (mock)
        // console.log(`[PROCTOR] Frame received for ${walletAddress}`);
    });

    socket.on('tab_switch', () => {
        warnings += 1;
        socket.emit('warning', { count: warnings, message: "Tab switch detected. Flagged for review." });
        if (warnings >= 3) {
            socket.emit('disqualified');
            socket.disconnect();
        }
    });
});

// 2. Code Runner (Layer 4)
app.post('/api/solve/code', async (req, res) => {
    const { code, language, problemId, wallet } = req.body;
    
    // Create Docker container for sandboxed execution
    try {
        const image = language === 'python' ? 'python:3.10-slim' : 'node:18-slim';
        const container = await docker.createContainer({
            Image: image,
            Cmd: language === 'python' ? ['python', '-c', code] : ['node', '-e', code],
            HostConfig: {
                Memory: 128 * 1024 * 1024, // 128MB limit
                CpuQuota: 50000 // 0.5 CPU limit
            }
        });

        await container.start();
        const output = await container.logs({ stdout: true, stderr: true });
        // In prod: run against hidden test cases
        res.json({ status: 'completed', output: output.toString() });
    } catch (err) {
        res.status(500).json({ error: 'Code runner failure', details: err.message });
    }
});

// 3. Solution Submission (Layers 2 & 3 Integration)
app.post('/api/solve/submit', async (req, res) => {
    const { solution, problemId, wallet, signature } = req.body;

    // Verify wallet signature
    const message = `MindLedger: Submit solution for ${problemId}`;
    const recovered = ethers.verifyMessage(message, signature);
    if (recovered.toLowerCase() !== wallet.toLowerCase()) {
        return res.status(401).json({ error: "Invalid signature" });
    }

    // SHA-256 Plagiarism check hash
    const solHash = crypto.createHash('sha256').update(solution).digest('hex');

    // 1. Get embedding from AI-Engine
    const aiEngineUrl = process.env.AI_ENGINE_URL || 'http://localhost:8001';
    const aiRes = await axios.post(`${aiEngineUrl}/analyze/fingerprint`, {
        solution_text: solution,
        problem_id: problemId,
        wallet_address: wallet
    });

    // 2. Check for Hallucination Trap (Layer 2)
    // const trapCheck = await axios.post('http://ai-engine:8001/analyze/ai-trap-detection', {
    //    solution, trap: "...fetch from PG..."
    // });

    // 3. Store in PG (mock logic)
    // await db.query('INSERT INTO submissions ...');

    // 4. Assign peer verifiers (Layer 1)
    await redis.lpush('verification_queue', JSON.stringify({ solHash, problemId, wallet }));

    res.json({ status: 'queued', message: "Submission sent to peer review network." });
});

// 5. AI Practice (Layer 2)
app.post('/api/practice/generate', async (req, res) => {
    try {
        const aiEngineUrl = process.env.AI_ENGINE_URL || 'http://localhost:8001';
        const aiRes = await axios.post(`${aiEngineUrl}/practice/generate`, req.body);
        res.json(aiRes.data);
    } catch (err) {
        res.status(500).json({ error: 'AI Engine unreachable' });
    }
});

app.post('/api/practice/verify', async (req, res) => {
    try {
        const aiEngineUrl = process.env.AI_ENGINE_URL || 'http://localhost:8001';
        const aiRes = await axios.post(`${aiEngineUrl}/practice/verify`, req.body);
        res.json(aiRes.data);
    } catch (err) {
        res.status(500).json({ error: 'AI Engine unreachable' });
    }
});

// 7. Feature APIs (Dashboard, Contests, Papers)
app.get('/api/dashboard', async (req, res) => {
    const { wallet } = req.query;
    // In prod: Fetch from UserDashboardCache or aggregate
    res.json({
        stats: { mntEarned: "1,250.40", solved: 145, streak: 12, rank: 245 },
        earnings: Array.from({ length: 30 }, (_, i) => ({ date: `Apr ${i + 1}`, mnt: Math.floor(Math.random() * 50) + 10 })),
        subjects: [
            { name: 'Mathematics', value: 45, color: '#00D4AA' },
            { name: 'Physics', value: 32, color: '#F59E0B' },
            { name: 'Chemistry', value: 18, color: '#10B981' },
            { name: 'Comp. Science', value: 50, color: '#7C3AED' },
        ]
    });
});

app.get('/api/contests', async (req, res) => {
    const contests = await prisma.contest.findMany({
        where: { isPublic: true },
        orderBy: { startsAt: 'asc' }
    });
    res.json(contests);
});

app.get('/api/papers', async (req, res) => {
    const papers = await prisma.paperCollaboration.findMany({
        include: { creator: true, contributions: { include: { user: true } } }
    });
    res.json(papers);
});

// 8. Dynamic Multilingual Problems
app.get('/api/problems/:id', async (req, res) => {
    const { id } = req.params;
    const { lang } = req.query;

    try {
        const problem = await prisma.problem.findUnique({
            where: { id }
        });

        if (!problem) return res.status(404).json({ error: "Problem not found" });

        if (lang && lang !== 'en') {
            const translation = await prisma.problemTranslation.findUnique({
                where: {
                    problemId_langCode: {
                        problemId: id,
                        langCode: lang
                    }
                }
            });

            if (translation) {
                return res.json({
                    ...problem,
                    body: translation.translatedBodyLatex,
                    isTranslated: true
                });
            } else {
                // Trigger background translation job
                await translationQueue.add('problem-translation', { problemId: id, langCode: lang });
                return res.json({
                    ...problem,
                    isTranslating: true,
                    message: "Translation requested. Content will update shortly."
                });
            }
        }

        res.json(problem);
    } catch (err) {
        res.status(500).json({ error: "Cognitive Retrieval Failure", details: err.message });
    }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`MindLedger API Server running on port ${PORT}`));
