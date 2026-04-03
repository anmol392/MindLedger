# tokenomics.py - Logic for the Olympiad Intellect Economy

import time
from config import GENESIS_SUPPLY, HALVING_PERIOD_YEARS, REWARD_MULTIPLIER

class Tokenomics:
    def __init__(self):
        self.genesis_timestamp = time.time()
        self.balances = {"TREASURY": GENESIS_SUPPLY}
        self.staking = {} # {address: amount}
        self.total_mined = 0

    def calculate_reward(self, difficulty: float) -> float:
        """
        Calculates reward based on (10 * difficulty) / (2^(years/2)).
        """
        elapsed_seconds = time.time() - self.genesis_timestamp
        years = elapsed_seconds / (365 * 24 * 3600)
        
        # Rule: Halving every 2 years
        halving_count = int(years / HALVING_PERIOD_YEARS)
        base_reward = REWARD_MULTIPLIER * difficulty
        
        reward = base_reward / (2 ** halving_count)
        return round(reward, 2)

    def distribute_reward(self, miner_address: str, difficulty: float):
        """
        Mints and distributes tokens based on solved problem difficulty.
        """
        reward = self.calculate_reward(difficulty)
        self.balances[miner_address] = self.balances.get(miner_address, 0.0) + reward
        self.total_mined += reward
        return reward

    def transfer(self, sender: str, receiver: str, amount: float) -> bool:
        """
        Moves tokens between addresses if sender has sufficient balance.
        """
        if self.balances.get(sender, 0.0) >= amount:
            self.balances[sender] -= amount
            self.balances[receiver] = self.balances.get(receiver, 0.0) + amount
            return True
        return False

    def stake(self, address: str, amount: float) -> bool:
        """
        Locks tokens for problem creation/verification privileges.
        """
        if self.balances.get(address, 0.0) >= amount:
            self.balances[address] -= amount
            self.staking[address] = self.staking.get(address, 0.0) + amount
            return True
        return False

    def unstake(self, address: str, amount: float) -> bool:
        """
        Releases staked tokens.
        """
        if self.staking.get(address, 0.0) >= amount:
            self.staking[address] -= amount
            self.balances[address] = self.balances.get(address, 0.0) + amount
            return True
        return False

    def get_balance(self, address: str) -> float:
        return round(self.balances.get(address, 0.0), 2)

    def get_leaderboard(self) -> list:
        """
        Returns list of top earners (excluding Treasury).
        """
        sorted_balances = sorted(
            [(addr, bal) for addr, bal in self.balances.items() if addr != "TREASURY"],
            key=lambda x: x[1],
            reverse=True
        )
        return sorted_balances[:10]
