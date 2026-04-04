export const CATEGORIES = ["Global", "Math", "Physics", "Chemistry", "CS"];

export const FULL_LEADERS = [
  { rank: 1, name: "0x34...8F", tokens: 1.2504, problems: 145, country: "🇮🇳", accuracy: 99.2, role: "Grandmaster" },
  { rank: 2, name: "quantum_mind", tokens: 1.1208, problems: 122, country: "🇨🇳", accuracy: 98.5, role: "Expert" },
  { rank: 3, name: "logic_bomb", tokens: 0.9850, problems: 110, country: "🇺🇸", accuracy: 97.4, role: "Expert" },
  { rank: 4, name: "cipher_tex", tokens: 0.8502, problems: 98, country: "🇷🇺", accuracy: 96.1, role: "Professional" },
  { rank: 5, name: "prime_time", tokens: 0.7201, problems: 85, country: "🇩🇪", accuracy: 98.1, role: "Expert" },
  { rank: 6, name: "delta_solver", tokens: 0.6120, problems: 78, country: "🇧🇷", accuracy: 95.5, role: "Professional" },
  { rank: 7, name: "math_wizard", tokens: 0.5432, problems: 65, country: "🇮🇳", accuracy: 94.2, role: "Specialist" },
  { rank: 8, name: "physics_phreak", tokens: 0.4850, problems: 54, country: "🇬🇧", accuracy: 93.8, role: "Specialist" },
];

export const MOCK_PROBLEMS = [
  {
    id: "1",
    title: "Riemann Hypothesis Verification (Partial)",
    subject: "Math",
    tier: 5,
    reward: 0.125,
    timeLimit: "120m",
    solveRate: 12,
    status: "open",
  },
  {
    id: "2",
    title: "Quantum Tunneling in Carbon Nanotubes",
    subject: "Physics",
    tier: 4,
    reward: 0.084,
    timeLimit: "90m",
    solveRate: 24,
    status: "open",
  },
  {
    id: "3",
    title: "P vs NP Solution Attempt (Refusal)",
    subject: "CS",
    tier: 5,
    reward: 0.25,
    timeLimit: "180m",
    solveRate: 5,
    status: "claimed",
  },
  {
    id: "4",
    title: "Optimal Network Routing in Mesh Topology",
    subject: "CS",
    tier: 2,
    reward: 0.024,
    timeLimit: "45m",
    solveRate: 65,
    status: "open",
  },
];
