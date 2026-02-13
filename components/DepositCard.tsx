"use client";

import { useState, useEffect } from "react";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
  useReadContract,
} from "wagmi";
import { parseUnits, isAddress } from "viem";
import { getVaultsForChain, type Vault } from "@/config/vaults";
import { getTokensForChain } from "@/config/tokens";
import { wrapperAbi, getWrapperAddress, erc20Abi } from "@/config/abis";
import { getChainLogoUrl, getChainName } from "@/lib/chains";
import Image from "next/image";

export function DepositCard() {
  const { address, isConnected, chainId, chain } = useAccount();
  const vaults = getVaultsForChain(chainId || 1);
  const tokens = getTokensForChain(chainId || 1);
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null);
  const [assets, setAssets] = useState("");
  const [referrer, setReferrer] = useState("");

  // Update selected vault when chain changes
  useEffect(() => {
    if (vaults.length > 0 && (!selectedVault || selectedVault.chainId !== chainId)) {
      setSelectedVault(vaults[0]);
    }
  }, [chainId, vaults, selectedVault]);

  const wrapperAddress = getWrapperAddress(chainId || 1);

  // Get the token address for the selected vault
  const vaultToken = tokens.find(
    (t) => t.symbol === selectedVault?.tokenSymbol
  );

  // Read token balance
  const { data: tokenBalance } = useReadContract({
    address: vaultToken?.address,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address && !!vaultToken },
  });

  // Read token allowance
  const { data: tokenAllowance } = useReadContract({
    address: vaultToken?.address,
    abi: erc20Abi,
    functionName: "allowance",
    args: address ? [address, wrapperAddress] : undefined,
    query: { enabled: !!address && !!vaultToken },
  });

  // Call all hooks before any conditional returns
  const {
    writeContract,
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess, data: receipt } =
    useWaitForTransactionReceipt({ hash: txHash });

  // Early return after all hooks
  if (!selectedVault) {
    return (
      <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 backdrop-blur">
        <h2 className="text-lg font-semibold mb-4">
          Step 2 — Deposit with Referral
        </h2>
        <p className="text-sm text-slate-400">
          Please connect your wallet and select a supported network.
        </p>
      </div>
    );
  }

  const parsedAssets =
    assets && !isNaN(Number(assets)) && Number(assets) > 0
      ? parseUnits(assets, selectedVault.tokenDecimals)
      : undefined;

  const hasInsufficientBalance =
    parsedAssets !== undefined &&
    tokenBalance !== undefined &&
    parsedAssets > (tokenBalance as bigint);

  const hasInsufficientAllowance =
    parsedAssets !== undefined &&
    tokenAllowance !== undefined &&
    parsedAssets > (tokenAllowance as bigint);

  const isValidReferrer = referrer === "" || isAddress(referrer);

  const handleDeposit = () => {
    if (
      !parsedAssets ||
      !address ||
      !isAddress(referrer) ||
      !selectedVault ||
      hasInsufficientBalance ||
      hasInsufficientAllowance
    ) return;
    reset();
    writeContract({
      address: wrapperAddress,
      abi: wrapperAbi,
      functionName: "depositWithReferral",
      args: [selectedVault.address, parsedAssets, address, referrer as `0x${string}`],
    });
  };

  return (
    <div className="rounded-2xl bg-slate-800/80 border border-slate-700 p-6 backdrop-blur">
      <h2 className="text-lg font-semibold mb-4">
        Step 2 — Deposit with Referral
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">Vault</label>
          <select
            value={selectedVault.address}
            onChange={(e) => {
              const v = vaults.find((v) => v.address === e.target.value);
              if (v) {
                setSelectedVault(v);
                reset();
              }
            }}
            className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {vaults.map((v) => (
              <option key={v.address} value={v.address}>
                {v.label}
              </option>
            ))}
          </select>
          <div className="mt-2 p-3 rounded-lg bg-slate-900/50 border border-slate-700">
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
                <p className="text-xs text-slate-500 mb-1">Vault Address:</p>
                <p className="text-xs text-slate-400 font-mono break-all">
                  {selectedVault.address}
                </p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedVault.address);
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
          <label className="block text-sm text-slate-400 mb-1">
            Assets ({selectedVault.tokenSymbol})
          </label>
          <input
            type="text"
            placeholder="0.0"
            value={assets}
            onChange={(e) => setAssets(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-600 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Receiver</label>
          <input
            type="text"
            value={address ?? ""}
            disabled
            className="w-full rounded-lg bg-slate-900/50 border border-slate-700 px-3 py-2 text-sm text-slate-400 font-mono"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-400 mb-1">Referrer</label>
          <input
            type="text"
            placeholder="0x..."
            value={referrer}
            onChange={(e) => setReferrer(e.target.value)}
            className={`w-full rounded-lg bg-slate-900 border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isValidReferrer ? "border-red-500" : "border-slate-600"
            }`}
          />
          {!isValidReferrer && (
            <p className="text-xs text-red-400 mt-1">Invalid address</p>
          )}
        </div>

        {isConnected && parsedAssets && (
          <div className="text-xs space-y-1">
            {hasInsufficientBalance && (
              <p className="text-red-400 font-medium">
                ⚠ Insufficient {selectedVault.tokenSymbol} balance
              </p>
            )}
            {hasInsufficientAllowance && !hasInsufficientBalance && (
              <p className="text-yellow-400 font-medium">
                ⚠ Insufficient allowance - Please approve tokens first (Step 1)
              </p>
            )}
          </div>
        )}

        <button
          onClick={handleDeposit}
          disabled={
            !isConnected ||
            !parsedAssets ||
            !isAddress(referrer) ||
            hasInsufficientBalance ||
            hasInsufficientAllowance ||
            isWritePending ||
            isConfirming
          }
          className="w-full py-2.5 rounded-lg font-medium text-sm bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          {!isConnected
            ? "Connect wallet first"
            : hasInsufficientBalance
              ? "Insufficient balance"
              : hasInsufficientAllowance
                ? "Insufficient allowance"
                : isWritePending
                  ? "Confirm in wallet..."
                  : isConfirming
                    ? "Confirming..."
                    : "Deposit"}
        </button>

        {isSuccess && (
          <p className="text-sm text-green-400">
            Deposit confirmed!{" "}
            {receipt?.transactionHash && chain?.blockExplorers?.default && (
              <a
                href={`${chain.blockExplorers.default.url}/tx/${receipt.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View on {chain.blockExplorers.default.name || "Explorer"}
              </a>
            )}
          </p>
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
