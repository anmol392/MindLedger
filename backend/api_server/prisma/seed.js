const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.problem.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      title: "Riemann Hypothesis Verification (Partial)",
      subject: "Math",
      tier: 5,
      reward: 0.125,
      timeLimit: 120,
      statement: "Prove the non-trivial zeros of the Riemann zeta function $\\zeta(s)$ have real part $1/2$ for the given region $\\mathbb{D}$. \n\n$$\\zeta(s) = \\sum_{n=1}^{\\infty} \\frac{1}{n^s}$$",
      type: "proof",
    }
  });

  await prisma.problem.upsert({
    where: { id: '4' },
    update: {},
    create: {
      id: '4',
      title: "Optimal Network Routing in Mesh Topology",
      subject: "CS",
      tier: 2,
      reward: 0.024,
      timeLimit: 45,
      statement: "Define a function `findShortestPath` that takes a graph represented as an adjacency matrix and returns the shortest path between node `0` and node `N-1`.",
      type: "code",
    }
  });

  await prisma.problemTranslation.upsert({
    where: { problemId_langCode: { problemId: '1', langCode: 'hi' } },
    update: {},
    create: {
       problemId: '1',
       langCode: 'hi',
       translatedBodyLatex: "[HINDI] यह प्रमाणित करें कि रीमान ज़ेटा फ़ंक्शन $\\zeta(s)$ के गैर-तुच्छ शून्य दिए गए क्षेत्र $\\mathbb{D}$ के लिए वास्तविक भाग $1/2$ रखते हैं।"
    }
  });

  console.log('Seed protocol complete.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
