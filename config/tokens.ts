export interface Token {
  symbol: string;
  address: `0x${string}`;
  decimals: number;
  chainId: number;
}

// Tokens organized by chain ID
export const TOKENS_BY_CHAIN: Record<number, Token[]> = {
  // Ethereum Mainnet
  1: [
    {
      symbol: "USDC",
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      decimals: 6,
      chainId: 1,
    },
    {
      symbol: "USDT",
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      decimals: 6,
      chainId: 1,
    },
    {
      symbol: "DAI",
      address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      decimals: 18,
      chainId: 1,
    },
    {
      symbol: "USDS",
      address: "0xdC035D45d973E3EC169d2276DDab16f1e407384F",
      decimals: 18,
      chainId: 1,
    },
    {
      symbol: "WETH",
      address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
      decimals: 18,
      chainId: 1,
    },
    {
      symbol: "WBTC",
      address: "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599",
      decimals: 8,
      chainId: 1,
    },
    {
      symbol: "BOLD",
      address: "0x6440f144b7e50d6a8439336510312d2f54beb01d",
      decimals: 18,
      chainId: 1,
    },
  ],
  // Arbitrum
  42161: [
    {
      symbol: "USDC",
      address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
      decimals: 6,
      chainId: 42161,
    },
    {
      symbol: "USDC.e",
      address: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
      decimals: 6,
      chainId: 42161,
    },
    {
      symbol: "USDT",
      address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
      decimals: 6,
      chainId: 42161,
    },
    {
      symbol: "ARB",
      address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
      decimals: 18,
      chainId: 42161,
    },
    {
      symbol: "USND",
      address: "0x4EcF61A6C2fAB8a047ceb3b3b263B401763E9D49",
      decimals: 18,
      chainId: 42161,
    },
  ],
  // Base
  8453: [
    {
      symbol: "USDC",
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
      decimals: 6,
      chainId: 8453,
    },
    {
      symbol: "WETH",
      address: "0x4200000000000000000000000000000000000006",
      decimals: 18,
      chainId: 8453,
    },
    {
      symbol: "cbBTC",
      address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
      decimals: 8,
      chainId: 8453,
    },
    {
      symbol: "cbETH",
      address: "0x2Ae3F1Ec7F1F5012CFEAb0185bfc7aa3cf0DEc22",
      decimals: 18,
      chainId: 8453,
    },
  ],
  // Katana (placeholder addresses - update with actual addresses)
  747474: [
    {
      symbol: "USDC",
      address: "0x0000000000000000000000000000000000000001",
      decimals: 6,
      chainId: 747474,
    },
    {
      symbol: "DAI",
      address: "0x0000000000000000000000000000000000000002",
      decimals: 18,
      chainId: 747474,
    },
    {
      symbol: "WETH",
      address: "0x0000000000000000000000000000000000000003",
      decimals: 18,
      chainId: 747474,
    },
  ],
};

export const getTokensForChain = (chainId: number): Token[] => {
  return TOKENS_BY_CHAIN[chainId] || [];
};
