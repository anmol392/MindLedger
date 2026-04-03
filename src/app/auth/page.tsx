"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Brain, Wallet, UserCheck, Shield, ChevronRight, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

type AuthStep = "connect" | "kyc" | "success";

export default function AuthPage() {
  const [step, setStep] = useState<AuthStep>("connect");
  const [loading, setLoading] = useState(false);
  const [kycData, setKycData] = useState({
    name: "",
    email: "",
    document: "",
    phone: "",
  });

  const handleConnect = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("kyc");
    }, 1500);
  };

  const handleKycSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("success");
    }, 2000);
  };

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-black p-4">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_0%,rgba(127,119,221,0.05)_0%,transparent_50%)]" />
      
      <div className="relative z-10 w-full max-w-xl">
        <AnimatePresence mode="wait">
          {step === "connect" && (
            <motion.div
              key="connect"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-[2.5rem] border border-white/5 bg-zinc-950/50 p-12 backdrop-blur-3xl"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-8 flex size-20 items-center justify-center rounded-3xl bg-primary shadow-2xl shadow-primary/30">
                  <Brain className="size-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white uppercase tracking-tighter">Onboard to MindLedger</h1>
                <p className="mt-4 max-w-xs text-zinc-500">
                  Connect your decentralized wallet to start mining POI tokens through intellectual contribution.
                </p>

                <div className="mt-12 flex w-full flex-col gap-4">
                  <button
                    onClick={handleConnect}
                    disabled={loading}
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-white px-8 text-sm font-bold text-black transition-all hover:scale-105"
                  >
                    <Wallet className="size-5" />
                    {loading ? "Connecting..." : "MetaMask"}
                  </button>
                  <button
                    onClick={handleConnect}
                    disabled={loading}
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 text-sm font-bold text-white transition-all hover:bg-white/10"
                  >
                    <Shield className="size-5" />
                    WalletConnect
                  </button>
                </div>
                
                <p className="mt-8 text-xs text-zinc-600">
                  By connecting, you agree to the Proof-of-Intellect protocol governance terms.
                </p>
              </div>
            </motion.div>
          )}

          {step === "kyc" && (
            <motion.div
              key="kyc"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="rounded-[2.5rem] border border-white/5 bg-zinc-950/50 p-12 backdrop-blur-3xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-2xl font-bold text-white uppercase tracking-tighter">Identity (KYC)</h2>
                  <p className="text-xs text-zinc-500 uppercase tracking-widest font-bold">Step 2 of 2</p>
                </div>
                <div className="rounded-full bg-orange-500/10 border border-orange-500/20 px-3 py-1 text-[10px] font-bold text-orange-500 uppercase">
                  Required for Withdraw
                </div>
              </div>

              <form onSubmit={handleKycSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Full Legal name</label>
                  <input
                    required
                    type="text"
                    value={kycData.name}
                    onChange={(e) => setKycData({...kycData, name: e.target.value})}
                    placeholder="As per Aadhaar / Passport"
                    className="h-14 rounded-2xl bg-white/5 border border-white/10 px-6 text-sm text-white placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Email Address</label>
                  <input
                    required
                    type="email"
                    value={kycData.email}
                    onChange={(e) => setKycData({...kycData, email: e.target.value})}
                    placeholder="Verified academic or personal email"
                    className="h-14 rounded-2xl bg-white/5 border border-white/10 px-6 text-sm text-white placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2">Aadhaar / PAN Number</label>
                  <input
                    required
                    type="text"
                    value={kycData.document}
                    onChange={(e) => setKycData({...kycData, document: e.target.value})}
                    placeholder="Enter document ID for FIU bridge"
                    className="h-14 rounded-2xl bg-white/5 border border-white/10 px-6 text-sm text-white placeholder-zinc-700 focus:border-primary focus:ring-0 transition-all"
                  />
                </div>

                <div className="mt-8 flex flex-col gap-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex h-14 items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-sm font-bold text-white transition-all hover:scale-105 shadow-2xl shadow-primary/20"
                  >
                    {loading ? "Verifying..." : "Complete Verification"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep("success")}
                    className="flex h-14 items-center justify-center text-[10px] font-bold text-zinc-500 uppercase hover:text-white transition-colors"
                  >
                    Skip for now (Earning only mode)
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-[2.5rem] border border-white/5 bg-zinc-950/50 p-12 backdrop-blur-3xl text-center"
            >
              <div className="mx-auto mb-8 flex size-24 items-center justify-center rounded-ull bg-green-500/10 border border-green-500/20">
                <CheckCircle2 className="size-12 text-green-500" />
              </div>
              <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Identity Linked</h2>
              <p className="mt-4 mx-auto max-w-xs text-zinc-500">
                Your wallet is now linked with your identity. You have full access to solve, verify, and withdraw rewards.
              </p>
              
              <div className="mt-12 flex flex-col gap-4">
                <Link
                  href="/dashboard"
                  className="flex h-14 items-center justify-center rounded-2xl bg-primary px-8 text-sm font-bold text-white transition-all hover:scale-105 shadow-2xl shadow-primary/20"
                >
                  Enter Dashboard
                  <ChevronRight className="ml-2 size-5" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
