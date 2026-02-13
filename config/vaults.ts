export interface Vault {
  label: string;
  address: `0x${string}`;
  tokenSymbol: string;
  tokenDecimals: number;
  chainId: number;
}

// Vaults organized by chain ID
export const VAULTS_BY_CHAIN: Record<number, Vault[]> = {
  // Ethereum Mainnet
  1: [
    {
      label: "USDC Vault",
      address: "0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
      chainId: 1,
    },
    {
      label: "USDT Vault",
      address: "0x310B7Ea7475A0B449Cfd73bE81522F1B88eFAFaa",
      tokenSymbol: "USDT",
      tokenDecimals: 6,
      chainId: 1,
    },
    {
      label: "DAI Vault",
      address: "0x028eC7330ff87667b6dfb0D94b954c820195336c",
      tokenSymbol: "DAI",
      tokenDecimals: 18,
      chainId: 1,
    },
    {
      label: "USDS Vault",
      address: "0x182863131F9a4630fF9E27830d945B1413e347E8",
      tokenSymbol: "USDS",
      tokenDecimals: 18,
      chainId: 1,
    },
    {
      label: "WETH Vault",
      address: "0xc56413869c6CDf96496f2b1eF801fEDBdFA7dDB0",
      tokenSymbol: "WETH",
      tokenDecimals: 18,
      chainId: 1,
    },
    {
      label: "WBTC Vault",
      address: "0x751F0cC6115410A3eE9eC92d08f46Ff6Da98b708",
      tokenSymbol: "WBTC",
      tokenDecimals: 8,
      chainId: 1,
    },
    {
      label: "yBOLD Vault",
      address: "0x9F4330700a36B29952869fac9b33f45EEdd8A3d8",
      tokenSymbol: "BOLD",
      tokenDecimals: 18,
      chainId: 1,
    },
  ],
  // Arbitrum
  42161: [
    {
      label: "USDC Vault",
      address: "0x6FAF8b7fFeE3306EfcFc2BA9Fec912b4d49834C1",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
      chainId: 42161,
    },
    {
      label: "USDC.e Vault",
      address: "0x9FA306b1F4a6a83FEC98d8eBbaBEDfF78C407f6B",
      tokenSymbol: "USDC.e",
      tokenDecimals: 6,
      chainId: 42161,
    },
    {
      label: "USDT Vault",
      address: "0xc0ba9bfED28aB46Da48d2B69316A3838698EF3f5",
      tokenSymbol: "USDT",
      tokenDecimals: 6,
      chainId: 42161,
    },
    {
      label: "ARB Vault",
      address: "0x7DEB119b92b76f78C212bc54FBBb34CEA75f4d4A",
      tokenSymbol: "ARB",
      tokenDecimals: 18,
      chainId: 42161,
    },
    {
      label: "USND Vault",
      address: "0x252b965400862d94BDa35FeCF7Ee0f204a53Cc36",
      tokenSymbol: "USND",
      tokenDecimals: 18,
      chainId: 42161,
    },
  ],
  // Base
  8453: [
    {
      label: "USDC True Yield",
      address: "0xb13CF163d916917d9cD6E836905cA5f12a1dEF4B",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
      chainId: 8453,
    },
    {
      label: "USDC Horizon",
      address: "0xc3BD0A2193c8F027B82ddE3611D18589ef3f62a9",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
      chainId: 8453,
    },
    {
      label: "WETH Horizon",
      address: "0x4d81C7d534D703E0a0AECaDF668C0E0253E1f1C3",
      tokenSymbol: "WETH",
      tokenDecimals: 18,
      chainId: 8453,
    },
    {
      label: "cbBTC Horizon",
      address: "0x25f32eC89ce7732A4E9f8F3340a09259F823b7d3",
      tokenSymbol: "cbBTC",
      tokenDecimals: 8,
      chainId: 8453,
    },
    {
      label: "cbETH Horizon",
      address: "0x989381F7eFb45F97E46BE9f390a69c5d94bf9e17",
      tokenSymbol: "cbETH",
      tokenDecimals: 18,
      chainId: 8453,
    },
  ],
  // Katana (placeholder addresses for local/test deployment)
  747474: [
    {
      label: "USDC Vault",
      address: "0x0000000000000000000000000000000000000001",
      tokenSymbol: "USDC",
      tokenDecimals: 6,
      chainId: 747474,
    },
    {
      label: "DAI Vault",
      address: "0x0000000000000000000000000000000000000002",
      tokenSymbol: "DAI",
      tokenDecimals: 18,
      chainId: 747474,
    },
    {
      label: "WETH Vault",
      address: "0x0000000000000000000000000000000000000003",
      tokenSymbol: "WETH",
      tokenDecimals: 18,
      chainId: 747474,
    },
  ],
};

export const getVaultsForChain = (chainId: number): Vault[] => {
  return VAULTS_BY_CHAIN[chainId] || [];
};
