import { http, createConfig } from "wagmi";
import { mainnet, arbitrum, base } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { defineChain } from "viem";

// Define Katana as a custom chain
export const katana = defineChain({
  id: 747474,
  name: "Katana",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: [
        "https://rpc.katana.network",
        "https://katana.drpc.org"
      ],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://katanascan.com" },
  },
});

export const config = createConfig({
  ssr: true,
  chains: [mainnet, arbitrum, base, katana],
  connectors: [injected()],
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
    [base.id]: http(),
    [katana.id]: http(),
  },
});
