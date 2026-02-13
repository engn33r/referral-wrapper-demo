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
      http: ["http://localhost:5050"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "http://localhost:5050" },
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
