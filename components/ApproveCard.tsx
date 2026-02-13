"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { getTokensForChain, type Token } from "@/config/tokens";
import { erc20Abi, getWrapperAddress } from "@/config/abis";
import { getChainLogoUrl, getChainName } from "@/lib/chains";
import Image from "next/image";

export function ApproveCard() {
  const { address, isConnected, chainId } = useAccount();
  const tokens = getTokensForChain(chainId || 1);
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);
  const [amount, setAmount] = useState("");

  // Update selected token when chain changes
  useEffect(() => {
    if (tokens.length > 0 && (!selectedToken || selectedToken.chainId !== chainId)) {
      setSelectedToken(tokens[0]);
    }
  }, [chainId, tokens, selectedToken]);

  const wrapperAddress = getWrapperAddress(chainId || 1);

  // Call all hooks before any conditional returns
  const { data: allowance, refetch: refetchAllowance } = useReadContract({
    address: selectedToken?.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: address && selectedToken ? [address, wrapperAddress] : undefined,
    query: { enabled: !!address && !!selectedToken },
  });

  const { data: balance } = useReadContract({
    address: selectedToken?.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!selectedToken },
  });

  const {
    writeContract,
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  // Refetch allowance after confirmation
  useEffect(() => {
    if (isSuccess && txHash) {
      refetchAllowance();
    }
  }, [isSuccess, txHash, refetchAllowance]);

  // Early return after all hooks
  if (!selectedToken) {
    return (
      <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold mb-4">Step 1 — Approve Token</h2>
        <p className="text-sm text-slate-400">
          Please connect your wallet and select a supported network.
        </p>
      </div>
    );
  }

  const parsedAmount =
    amount && !isNaN(Number(amount)) && Number(amount) > 0
      ? parseUnits(amount, selectedToken.decimals)
      : undefined;

  const hasInsufficientBalance =
    parsedAmount !== undefined &&
    balance !== undefined &&
    parsedAmount > (balance as bigint);

  const handleApprove = () => {
    if (!parsedAmount || !selectedToken || hasInsufficientBalance) return;
    reset();
    writeContract({
      address: selectedToken.address,
      abi: erc20Abi,
      functionName: "approve",
      args: [wrapperAddress, parsedAmount],
    });
  };

  const formattedAllowance =
    allowance !== undefined
      ? formatUnits(allowance as bigint, selectedToken.decimals)
      : "—";

  const formattedBalance =
    balance !== undefined
      ? formatUnits(balance as bigint, selectedToken.decimals)
      : "—";

  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 backdrop-blur">
      <h2 className="text-lg font-semibold mb-4">Step 1 — Approve Token</h2>

      <div className="mb-4 p-3 rounded-lg bg-slate-900/50 border border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center justify-center w-4 h-4 rounded-full overflow-hidden bg-slate-800 flex-shrink-0">
            <Image
              src={getChainLogoUrl(chainId || 1)}
              alt={getChainName(chainId || 1)}
              width={16}
              height={16}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {getChainName(chainId || 1)}
          </span>
        </div>
        <div className="flex items-start gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-500 mb-1">Wrapper Contract:</p>
            <p className="text-xs text-slate-400 font-mono break-all">
              {wrapperAddress}
            </p>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(wrapperAddress);
            }}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0 mt-5"
            title="Copy address"
          >
            Copy
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Token</label>
          <select
            value={selectedToken.symbol}
            onChange={(e) => {
              const t = tokens.find((t) => t.symbol === e.target.value);
              if (t) {
                setSelectedToken(t);
                reset();
              }
            }}
            className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tokens.map((t) => (
              <option key={t.symbol} value={t.symbol}>
                {t.symbol}
              </option>
            ))}
          </select>
          <div className="mt-2 p-3 rounded-lg bg-slate-900/50 border border-slate-700">
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 mb-1">Token Address:</p>
                <p className="text-xs text-slate-400 font-mono break-all">
                  {selectedToken.address}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedToken.address);
                }}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex-shrink-0 mt-5"
                title="Copy address"
              >
                Copy
              </button>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Amount</label>
          <input
            type="text"
            placeholder="0.0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {isConnected && (
          <div className="text-xs space-y-1">
            <p className="text-slate-400">Balance: {formattedBalance} {selectedToken.symbol}</p>
            <p className="text-slate-400">Current allowance: {formattedAllowance} {selectedToken.symbol}</p>
            {hasInsufficientBalance && (
              <p className="text-red-400 font-medium">⚠ Insufficient balance</p>
            )}
          </div>
        )}

        <button
          onClick={handleApprove}
          disabled={!isConnected || !parsedAmount || hasInsufficientBalance || isWritePending || isConfirming}
          className="w-full py-2.5 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {!isConnected
            ? "Connect wallet first"
            : hasInsufficientBalance
              ? "Insufficient balance"
              : isWritePending
                ? "Confirm in wallet..."
                : isConfirming
                  ? "Confirming..."
                  : "Approve"}
        </button>

        {isSuccess && (
          <p className="text-sm text-green-400">Approval confirmed!</p>
        )}
        {writeError && (
          <p className="text-sm text-red-400 break-all">
            {writeError.message.split("\n")[0]}
          </p>
        )}
      </div>
    </div>
  );
}
