export const getChainLogoUrl = (chainId: number) =>
  `https://token-assets-one.vercel.app/api/chains/${chainId}/logo-32.png?fallback=true`;

export const CHAIN_NAMES: Record<number, string> = {
  1: "Ethereum",
  42161: "Arbitrum",
  8453: "Base",
  747474: "Katana",
};

export const getChainName = (chainId: number) => CHAIN_NAMES[chainId] ?? `Chain ${chainId}`;
