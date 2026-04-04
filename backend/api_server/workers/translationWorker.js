const { Worker } = require('bullmq');
const { PrismaClient } = require('@prisma/client');
const axios = require('axios');
require('dotenv').config();

const prisma = new PrismaClient();

const DEEPL_LANGS = {
  'hi': 'HI', 'mr': 'MR', 'ta': 'TA', 'te': 'TE', 'bn': 'BN', 
  'gu': 'GU', 'kn': 'KN', 'ml': 'ML', 'pa': 'PA', 'ur': 'UR', 'fr': 'FR'
};

const translationWorker = new Worker('problem-translation', async job => {
  const { problemId, langCode } = job.data;
  
  const problem = await prisma.problem.findUnique({ where: { id: problemId } });
  if (!problem) return;

  const deeplTarget = DEEPL_LANGS[langCode];
  if (!deeplTarget) return;

  try {
    const response = await axios.post('https://api-free.deepl.com/v2/translate', null, {
      params: {
        auth_key: process.env.DEEPL_API_KEY,
        text: problem.statement,
        target_lang: deeplTarget,
        tag_handling: 'xml', // Preserve LaTeX tags if any
      }
    });

    const translatedBodyLatex = response.data.translations[0].text;

    await prisma.problemTranslation.create({
      data: {
        problemId,
        langCode,
        translatedBodyLatex,
      }
    });

    console.log(`[Cognitive Pipeline] Translated Problem ${problemId} to ${langCode}`);
  } catch (err) {
    console.error(`[Cognitive Queue Fail] Translation failed for ${problemId} (${langCode}):`, err.message);
    throw err;
  }
}, { 
  connection: { host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379 } 
});

module.exports = translationWorker;
