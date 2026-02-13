"use client";

import { useState, useEffect } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { mainnet, arbitrum, base } from "wagmi/chains";
import { katana } from "@/config/wagmi";
import { getChainLogoUrl, getChainName } from "@/lib/chains";
import Image from "next/image";

const SUPPORTED_CHAINS = [
  { ...mainnet, displayName: "Ethereum" },
  { ...arbitrum, displayName: "Arbitrum" },
  { ...base, displayName: "Base" },
  { ...katana, displayName: "Katana" },
];

export function ChainSelector() {
  const { chain } = useAccount();
  const { switchChain, isPending } = useSwitchChain();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentChain = SUPPORTED_CHAINS.find((c) => c.id === chain?.id);

  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 backdrop-blur">
      <h2 className="text-lg font-semibold mb-4">Select Network</h2>
      <div className="space-y-3">
        <div className="space-y-2">
          {SUPPORTED_CHAINS.map((c) => {
            const isActive = mounted && chain?.id === c.id;
            return (
              <button
                key={c.id}
                onClick={() => switchChain({ chainId: c.id })}
                disabled={isPending || isActive}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                  isActive
                    ? "bg-blue-600/20 border-blue-500 ring-1 ring-blue-500/50"
                    : "bg-slate-900 border-slate-600 hover:bg-slate-800 hover:border-slate-500"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <div className="flex items-center justify-center w-6 h-6 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
                  <Image
                    src={getChainLogoUrl(c.id)}
                    alt={c.displayName}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-sm font-medium">{c.displayName}</span>
                {isActive && (
                  <span className="ml-auto text-xs text-blue-400">Connected</span>
                )}
              </button>
            );
          })}
        </div>
        {isPending && (
          <p className="text-xs text-blue-400 text-center">Switching network...</p>
        )}
      </div>
    </div>
  );
}
