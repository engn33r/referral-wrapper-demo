"use client";

import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export function ConnectButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        type="button"
        disabled
        className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600/70 text-slate-100 cursor-not-allowed"
      >
        Connect Wallet
      </button>
    );
  }

  const connector = connectors[0];

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-slate-300 font-mono">
          {address.slice(0, 6)}...{address.slice(-4)}
        </span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="px-3 py-1.5 text-sm rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      disabled={!connector}
      onClick={() => connector && connect({ connector })}
      className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 hover:bg-blue-500 transition-colors disabled:bg-blue-600/70 disabled:text-slate-100 disabled:cursor-not-allowed"
    >
      Connect Wallet
    </button>
  );
}
