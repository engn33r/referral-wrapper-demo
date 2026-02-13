"use client";

import { ConnectButton } from "@/components/ConnectButton";
import { NetworkWarning } from "@/components/NetworkWarning";
import { ChainSelector } from "@/components/ChainSelector";
import { ApproveCard } from "@/components/ApproveCard";
import { DepositCard } from "@/components/DepositCard";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 border-b border-slate-700/50">
        <h1 className="text-lg font-bold tracking-tight">
          Yearn Referral Deposit
        </h1>
        <ConnectButton />
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="w-full max-w-2xl space-y-6">
          <NetworkWarning />
          <ChainSelector />
          <ApproveCard />
          <DepositCard />
        </div>
      </main>
    </div>
  );
}
