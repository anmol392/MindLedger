# olympiad_agent.py - Main Logic and CLI Interface for the Olympiad Intellect Ledger

import hashlib
import time
import random
import sys
from typing import Dict, Any, List, Optional
from config import Colors, EXAM_LEVELS, MIN_DIFFICULTY, MAX_DIFFICULTY
from blockchain import Blockchain, Block
from tokenomics import Tokenomics
from problem_db import PROBLEM_DATABASE

class OlympiadAgent:
    def __init__(self, miner_address: str = "User1"):
        self.miner_address = miner_address
        self.blockchain = Blockchain()
        self.tokenomics = Tokenomics()
        self.history = set()  # Stores MD5 hashes of problem signatures
        self.last_3_topics = []
        self.current_difficulty = MIN_DIFFICULTY
        self.stats = {"correct": 0, "wrong": 0}
        self.current_problem = None
        self.start_time = 0

    def get_exam_level(self) -> str:
        d = self.current_difficulty
        for (low, high), level in EXAM_LEVELS.items():
            if low <= d < high:
                return level
        return "IMO Gold Medal Level"

    def generate_unique_problem(self, topic: str) -> Dict[str, Any]:
        """
        AI generation fallback to the problem database with signature uniqueness.
        """
        # (AI API generation logic would go here, falling back to DATABASE)
        tier = max(1, int(self.current_difficulty))
        while tier > 0:
            if tier in PROBLEM_DATABASE.get(topic, {}):
                options = PROBLEM_DATABASE[topic][tier]
                break
            tier -= 1
        else:
            # Absolute fallback
            options = [{"title": "General Task", "problem": "Solve for x: x^2 = 4", "approach": "x = 2 or -2"}]
        
        # Filter for uniqueness
        for prob in options:
            sig = f"{topic}|{self.current_difficulty}|{prob['title']}"
            prob_hash = hashlib.md5(sig.encode('utf-8')).hexdigest()
            if prob_hash not in self.history:
                prob['hash'] = prob_hash
                prob['topic'] = topic
                return prob
        
        # If all are seen, return a variant
        prob = random.choice(options).copy()
        prob['title'] += f" (Variant {random.randint(1,1000)})"
        prob['hash'] = hashlib.md5(f"{prob['title']}|{time.time()}".encode('utf-8')).hexdigest()
        prob['topic'] = topic
        return prob

    def get_next_problem(self) -> Dict[str, Any]:
        available_topics = [t for t in PROBLEM_DATABASE.keys() if t not in self.last_3_topics]
        if not available_topics:
            available_topics = list(PROBLEM_DATABASE.keys())
        
        topic = random.choice(available_topics)
        self.current_problem = self.generate_unique_problem(topic)
        self.history.add(self.current_problem['hash'])
        self.last_3_topics.append(topic)
        if len(self.last_3_topics) > 3:
            self.last_3_topics.pop(0)

        self.start_time = time.time()
        return self.current_problem

    def submit_solution(self, user_answer_text: str):
        if not self.current_problem:
            return None
        
        time_taken = time.time() - self.start_time
        
        # Normalize and hash solution
        ans_hash = hashlib.md5(user_answer_text.strip().lower().encode('utf-8')).hexdigest()
        
        # Anti-Cheat: Speed Check
        if self.current_difficulty > 5 and time_taken < 30:
            print(f"{Colors.RED}[SUSPICIOUS]{Colors.END} Problem solved too fast. Potential AI/Template use.")
        
        # AI Detection Pattern Heuristic (Basic)
        if "as an ai" in user_answer_text.lower() or "certainly!" in user_answer_text.lower():
            print(f"{Colors.RED}[AI DETECTED]{Colors.END} Common AI phrases found in solution.")
            return False

        # Verification (Simulated against expected approach logic)
        # In a real system, we'd hash the expected solution
        # For this demo, any non-empty answer is "correct" for flow
        is_correct = len(user_answer_text) > 2 
        
        if is_correct:
            self.stats["correct"] += 1
            # Token Reward with Halving
            reward = self.tokenomics.distribute_reward(self.miner_address, self.current_difficulty)
            
            # Add to Blockchain
            block = Block(
                height=len(self.blockchain.chain),
                timestamp=time.time(),
                problem=self.current_problem,
                solution_hash=ans_hash,
                miner_address=self.miner_address,
                previous_hash=self.blockchain.get_last_block().hash
            )
            self.blockchain.add_block(block)
            
            # Difficulty strictly increases
            self.current_difficulty = min(MAX_DIFFICULTY, round(self.current_difficulty + 0.5, 1))
            
            print(f"{Colors.GREEN}[CORRECT]{Colors.END} Reward: {reward} Tokens. Block mined at height {block.height}.")
        else:
            self.stats["wrong"] += 1
            print(f"{Colors.RED}[WRONG]{Colors.END} Try a more detailed approach.")
            # Difficulty never decreases
        
        self.current_problem = None
        return is_correct

    def run_cli(self):
        print(f"{Colors.BOLD}{Colors.CYAN}=== {Colors.YELLOW}OLYMPIAD INTELLECT LEDGER{Colors.CYAN} ==={Colors.END}")
        print(f"{Colors.BLUE}Exam Level: {self.get_exam_level()} ({self.current_difficulty}/10){Colors.END}")
        print("-" * 50)
        
        while True:
            cmd = input(f"{Colors.YELLOW}OIL >> {Colors.END}").strip().lower()
            
            if cmd == 'solve':
                prob = self.get_next_problem()
                print(f"\n{Colors.BOLD}Topic: {prob['topic']}{Colors.END}")
                print(f"{Colors.BOLD}Title: {prob['title']}{Colors.END}")
                print(f"{Colors.CYAN}{prob['problem']}{Colors.END}")
                print(f"{Colors.YELLOW}Constraints: {prob.get('constraints', 'None')}{Colors.END}")
                print(f"Submit your solution (multi-line supported, end with empty line):")
                
                lines = []
                while True:
                    line = input()
                    if line == "": break
                    lines.append(line)
                
                self.submit_solution("\n".join(lines))
            
            elif cmd == 'stats':
                acc = (self.stats['correct'] / (self.stats['correct'] + self.stats['wrong']) * 100) if (self.stats['correct'] + self.stats['wrong']) > 0 else 0
                print(f"\n{Colors.BOLD}PERFORMANCE{Colors.END}")
                print(f"- Correct: {self.stats['correct']}")
                print(f"- Wrong: {self.stats['wrong']}")
                print(f"- Accuracy: {acc:.1f}%")
                print(f"- Current Level: {self.get_exam_level()}")
                print(f"- Difficulty: {self.current_difficulty}")
            
            elif cmd == 'balance':
                bal = self.tokenomics.get_balance(self.miner_address)
                print(f"\n{Colors.GREEN}Token Balance: {bal}{Colors.END}")
            
            elif cmd == 'history':
                print(f"\n{Colors.BOLD}RECENT BLOCKS{Colors.END}")
                for b in self.blockchain.chain[-5:]:
                    print(f"H:{b.height} | {b.problem['title']} | Miner: {b.miner_address}")
            
            elif cmd == 'quit':
                print(f"\n{Colors.CYAN}Finalizing Session...{Colors.END}")
                print(f"Chain Integrity: {'VALID' if self.blockchain.validate_chain() else 'CORRUPT'}")
                print(f"Goodbye, intellect.")
                break
            
            else:
                print(f"Commands: solve, stats, balance, history, quit")

if __name__ == "__main__":
    agent = OlympiadAgent()
    agent.run_cli()
