-- MindLedger: Proof-of-Intellect Database Schema
-- Requires: pgvector extension

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users & Reputation
CREATE TABLE users (
    wallet_address VARCHAR(42) PRIMARY KEY, -- EVM compatible
    username VARCHAR(255),
    role VARCHAR(50) DEFAULT 'student', -- 'student', 'professor', 'recruiter', 'admin'
    kyc_verified BOOLEAN DEFAULT FALSE,
    poi_balance DECIMAL(20, 8) DEFAULT 0.0,
    reputation_score DECIMAL(5, 2) DEFAULT 1.00, -- 1.00 to 5.00
    expert_domains TEXT[], -- e.g., ['Math', 'CS']
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP WITH TIME ZONE
);

-- 2. Academic Problems
CREATE TABLE problems (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_wallet VARCHAR(42) REFERENCES users(wallet_address),
    title VARCHAR(255) NOT NULL,
    statement TEXT NOT NULL,
    trap_assertion TEXT, -- Machine-hallucination trap
    correct_result TEXT, -- For automated checks
    subject VARCHAR(50) NOT NULL, -- 'Math', 'Physics', 'Chemistry', 'CS'
    tier INTEGER NOT NULL CHECK (tier BETWEEN 1 AND 5),
    time_limit_minutes INTEGER NOT NULL,
    reward_tokens DECIMAL(20, 8) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Submissions & Anti-Cheat
CREATE TABLE submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    problem_id UUID REFERENCES problems(id),
    solver_wallet VARCHAR(42) REFERENCES users(wallet_address),
    solution_content TEXT NOT NULL,
    solution_hash VARCHAR(64) UNIQUE, -- SHA-256 for plagiarism check
    embedding vector(384), -- NLP embedding for similarity check (sentence-transformers)
    status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'verifying', 'approved', 'rejected', 'flagged'
    proctoring_score FLOAT DEFAULT 1.0, -- Integrity score from AI proctor
    warnings_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Peer Verification Queue
CREATE TABLE verifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID REFERENCES submissions(id),
    verifier_wallet VARCHAR(42) REFERENCES users(wallet_address),
    approved BOOLEAN,
    comments TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(submission_id, verifier_wallet)
);

-- 5. On-Chain Blocks (Mirror of Ledger)
CREATE TABLE blocks (
    block_id BIGINT PRIMARY KEY,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    problem_id UUID REFERENCES problems(id),
    solver_wallet VARCHAR(42) REFERENCES users(wallet_address),
    solution_hash VARCHAR(64),
    verifiers VARCHAR(42)[3],
    token_reward DECIMAL(20, 8),
    difficulty_tier INTEGER,
    previous_block_hash VARCHAR(64) NOT NULL
);

-- 6. Financial Ledger & CBDC Bridge
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    block_id BIGINT DEFAULT NULL, -- NULL if off-chain or bridge tx
    from_wallet VARCHAR(42),
    to_wallet VARCHAR(42),
    amount DECIMAL(20, 8),
    tx_type VARCHAR(50), -- 'mining_reward', 'tip', 'stake', 'withdraw', 'peer_reward'
    cbdc_tx_ref VARCHAR(255), -- Reference for RBI e-Rupee webhook
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Indexes
CREATE INDEX idx_submissions_embedding ON submissions USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);
CREATE INDEX idx_problems_subject ON problems(subject);
CREATE INDEX idx_users_reputation ON users(reputation_score DESC);
