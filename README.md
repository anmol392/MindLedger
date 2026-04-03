# 🏆 Olympiad Intellect Ledger (OIL)

The **Olympiad Intellect Ledger** is a decentralized "Proof-of-Intellect" (PoI) ecosystem that transforms high-level problem solving into a gamified blockchain experience. Mine blocks, earn tokens, and climb the ranks from **JEE Main** to **IMO Gold Medal Level**.

---

## 🚀 Key Features

- **Intellectual Mining**: Unlike traditional hash-based mining, blocks in the OIL blockchain are only added when an Olympiad-level problem is systematically solved.
- **Dynamic AI Generation**: Integrated with **Google Gemini Pro** and **OpenAI GPT-4** for an infinite supply of unique, original problems (Maths, Physics, Chemistry, Programming).
- **Token Economy**: Earn **Intellect Tokens** with built-in **reward halving** (every 2 years) and difficulty-based scaling (`10 * difficulty`).
- **Anti-Cheat Verification**: Multi-layered security including MD5 solution hashing, solving-speed detection, and AI-pattern heuristics.
- **Premium CLI Dashboard**: A vibrant, ANSI-colored terminal interface for solving problems, tracking balances, and viewing the blockchain.

---

## 🛠️ Tech Stack

- **Core**: Python 3.x
- **Blockchain**: Custom Proof-of-Intellect implementation (SHA-256 caching)
- **Tokenomics**: Dynamic reward calculation with halving and staking support
- **AI Orchestration**: Google Gemini & OpenAI API integration
- **Styling**: ANSI Escape Codes for CLI aesthetics

---

## 📦 Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/yourusername/olympiad-intellect-ledger.git
    cd olympiad-intellect-ledger
    ```

2.  **Install Dependencies**:
    ```bash
    pip install -r requirements.txt
    ```

3.  **Config (Optional)**:
    Add your API keys to `config.py` or set them as environment variables:
    ```bash
    export GEMINI_API_KEY='your_key'
    export OPENAI_API_KEY='your_key'
    ```

---

## 🕹️ How to Play

Run the main agent to enter the Mining Dashboard:

```bash
python olympiad_agent.py
```

### Commands:
- **`solve`**: Get a new unique Olympiad problem.
- **`stats`**: View your accuracy, current difficulty, and exam status.
- **`balance`**: Check your total Intellect Token holdings.
- **`history`**: See the most recent blocks added to the chain.
- **`quit`**: Exit the ledger with a final validation report.

---

## 🧩 Difficulty Mapping

The ledger maps your progress to real-world competitive benchmarks:
- **Difficulty 1-2**: JEE Main
- **Difficulty 2-3**: JEE Advanced
- **Difficulty 4-5**: INMO / INChO
- **Difficulty 9-10**: IMO Gold Medal Level

---

## 🤝 Contributing

Contributions to the problem database or the verification logic are welcome! Please fork the repository and submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
