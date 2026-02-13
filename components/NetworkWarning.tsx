"use client";

import { useAccount, useSwitchChain } from "wagmi";
import { mainnet, arbitrum, base } from "wagmi/chains";
import { katana } from "@/config/wagmi";

const SUPPORTED_CHAIN_IDS = [
  mainnet.id,
  arbitrum.id,
  base.id,
  katana.id,
];

const CHAIN_NAMES: Record<number, string> = {
  [mainnet.id]: "Ethereum",
  [arbitrum.id]: "Arbitrum",
  [base.id]: "Base",
  [katana.id]: "Katana",
};

export function NetworkWarning() {
  const { chain, isConnected } = useAccount();
  const { switchChain } = useSwitchChain();

  if (!isConnected || !chain) {
    return null;
  }

  const isSupported = SUPPORTED_CHAIN_IDS.includes(chain.id as any);

  if (isSupported) {
    return null;
  }

  return (
    <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/50 p-4 backdrop-blur">
      <div className="flex items-start gap-3">
        <span className="text-yellow-500 text-xl flex-shrink-0">⚠</span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-yellow-500 mb-1">
            Unsupported Network
          </h3>
          <p className="text-xs text-slate-300 mb-3">
            You're connected to <span className="font-semibold">{chain.name}</span> (Chain ID: {chain.id}).
            This network is not supported. Please switch to one of the supported networks:
          </p>
          <div className="flex flex-wrap gap-2">
            {SUPPORTED_CHAIN_IDS.map((chainId) => (
              <button
                key={chainId}
                onClick={() => switchChain({ chainId })}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-200 border border-yellow-500/30 transition-colors"
              >
                Switch to {CHAIN_NAMES[chainId]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
