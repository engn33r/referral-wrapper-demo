export const erc20Abi = [
  {
    name: "approve",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [{ type: "bool" }],
  },
  {
    name: "allowance",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" },
    ],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "account", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    name: "decimals",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint8" }],
  },
] as const;

export const wrapperAbi = [
  {
    name: "depositWithReferral",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "vault", type: "address" },
      { name: "assets", type: "uint256" },
      { name: "receiver", type: "address" },
      { name: "referrer", type: "address" },
    ],
    outputs: [{ name: "shares", type: "uint256" }],
  },
] as const;

// Wrapper contract addresses by chain ID
// Same address deployed across all chains
const WRAPPER_ADDRESS = "0x3744Df2673097d738aCaa3E463E6D638867757f2" as const;

export const WRAPPER_ADDRESSES: Record<number, `0x${string}`> = {
  1: WRAPPER_ADDRESS,      // Ethereum Mainnet
  42161: WRAPPER_ADDRESS,  // Arbitrum
  8453: WRAPPER_ADDRESS,   // Base
  747474: WRAPPER_ADDRESS, // Katana
};

export const getWrapperAddress = (chainId: number): `0x${string}` => {
  return WRAPPER_ADDRESSES[chainId] || WRAPPER_ADDRESS;
};
