"use strict";

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const Redis = require('ioredis');
const Docker = require('dockerode');
const { ethers } = require('ethers');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const docker = new Docker();

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
    const aiRes = await axios.post('http://ai-engine:8001/analyze/fingerprint', {
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

// 5. CBDC Bridge Webhook (India e-Rupee integration)
app.post('/api/cbdc/webhook', (req, res) => {
    const { tx_ref, amount, status, signature } = req.body;
    // In production: verify partner signature from FIU entity
    console.log(`[CBDC] e-Rupee disbursement update: ${tx_ref} [${status}]`);
    res.sendStatus(200);
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`MindLedger API Server running on port ${PORT}`));
