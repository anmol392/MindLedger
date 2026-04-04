const { Worker, Queue } = require('bullmq');
const { PrismaClient } = require('@prisma/client');
const { ethers } = require('ethers');
require('dotenv').config();

const prisma = new PrismaClient();

const contestWorker = new Worker('contest-lifecycle', async job => {
  const { contestId, action } = job.data;
  
  const contest = await prisma.contest.findUnique({ where: { id: contestId } });
  if (!contest) return;

  if (action === 'start-contest') {
    await prisma.contest.update({
      where: { id: contestId },
      data: { status: 'LIVE' }
    });
    console.log(`[Arena Protocol] Contest ${contestId} is now LIVE`);

    // Schedule end-contest job
    const queue = new Queue('contest-lifecycle');
    const delay = new Date(contest.endsAt).getTime() - Date.now();
    await queue.add('contest-lifecycle', { contestId, action: 'end-contest' }, { delay: Math.max(0, delay) });
  }

  if (action === 'end-contest') {
    await prisma.contest.update({
      where: { id: contestId },
      data: { status: 'ENDED' }
    });
    console.log(`[Arena Protocol] Contest ${contestId} has ENDED. Triggering prize distribution...`);

    // Logic for prize distribution
    // 1. Fetch leaderboard from DB/Redis
    // 2. Map winners to wallet addresses
    // 3. Call Smart Contract mintContestReward()
    // await distributePrizes(contestId);
  }
}, { 
  connection: { host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379 } 
});

module.exports = contestWorker;
