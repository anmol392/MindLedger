# blockchain.py - Proof-of-Intellect Ledger

import hashlib
import time
from typing import Dict, Any, List

class Block:
    def __init__(self, height: int, timestamp: float, problem: Dict[str, Any], solution_hash: str, miner_address: str, previous_hash: str):
        self.height = height
        self.timestamp = timestamp
        self.problem = problem
        self.solution_hash = solution_hash
        self.miner_address = miner_address
        self.previous_hash = previous_hash
        self.hash = self._calculate_hash()

    def _calculate_hash(self) -> str:
        """
        Creates a SHA-256 hash of the block's content.
        """
        content = f"{self.height}{self.timestamp}{self.problem.get('title', '')}{self.solution_hash}{self.miner_address}{self.previous_hash}"
        return hashlib.sha256(content.encode('utf-8')).hexdigest()

class Blockchain:
    def __init__(self):
        self.chain: List[Block] = []
        self.pending_solutions = {} # {problem_id: expected_solution_hash}
        self.create_genesis_block()

    def create_genesis_block(self):
        """
        Initializes the chain with a hardcoded genesis block.
        """
        genesis_block = Block(
            height=0,
            timestamp=time.time(),
            problem={"title": "Genesis Problem", "problem": "Prove that 1+1=2."},
            solution_hash=hashlib.md5("2".encode('utf-8')).hexdigest(),
            miner_address="GENESIS",
            previous_hash="0" * 64
        )
        self.chain.append(genesis_block)

    def add_block(self, block: Block) -> bool:
        """
        Validates and adds a new block to the chain.
        """
        if self.validate_block(block):
            self.chain.append(block)
            return True
        return False

    def validate_block(self, block: Block) -> bool:
        """
        Checks if the block's height and previous hash are correct.
        """
        if not self.chain:
            return True # Genesis case handled
        
        last_block = self.chain[-1]
        if block.height != last_block.height + 1:
            return False
        if block.previous_hash != last_block.hash:
            return False
        if block.hash != block._calculate_hash():
            return False
        return True

    def validate_chain(self) -> bool:
        """
        Iterates through the chain to ensure overall integrity.
        """
        for i in range(1, len(self.chain)):
            current = self.chain[i]
            prev = self.chain[i-1]
            if current.previous_hash != prev.hash:
                return False
            if current.hash != current._calculate_hash():
                return False
        return True

    def get_last_block(self) -> Block:
        return self.chain[-1]
