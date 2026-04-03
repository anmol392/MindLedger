# config.py - Settings and API keys for the Olympiad Intellect Ledger

import os

# API Keys (Replace with actual keys or use environment variables)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")

# ANSI Color Codes for Premium CLI Experience
class Colors:
    BLUE = "\033[94m"
    CYAN = "\033[96m"
    GREEN = "\033[92m"
    YELLOW = "\033[93m"
    RED = "\033[91m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"
    END = "\033[0m"

# System Settings
SYSTEM_NAME = "Olympiad Intellect Ledger (OIL)"
GENESIS_SUPPLY = 1_000_000
HALVING_PERIOD_YEARS = 2
MIN_DIFFICULTY = 1.0
MAX_DIFFICULTY = 10.0
REWARD_MULTIPLIER = 10.0

# Exam Mapping
EXAM_LEVELS = {
    (1, 2): "JEE Main",
    (2, 3): "JEE Advanced",
    (3, 4): "RMO/INPhO",
    (4, 5): "INMO/INChO",
    (5, 6): "IMO/IOI Training",
    (6, 7): "IMO/IOI Easy",
    (7, 8): "IMO/IOI Medium",
    (8, 9): "IMO/IOI Hard",
    (9, 11): "IMO Gold Medal Level" # Use 11 for max range check
}
