# Yearn Referral Deposit Wrapper — DApp Spec

## Overview

A minimalist, modern single-page DApp that lets users deposit into Yearn V3 vaults via the Referral Deposit Wrapper contract (`0x3744Df2673097d738aCaa3E463E6D638867757f2`) on Ethereum mainnet.

## User Flow

The DApp presents two sequential steps:

### Step 1 — Approve Token

The user approves one of the whitelisted tokens to be spent by the wrapper contract.

- **Token selector**: Dropdown of whitelisted tokens (see list below).
- **Amount input**: Text box where the user enters the approval amount (in human-readable token units, e.g. `1000` USDC).
- **Approve button**: Sends an ERC-20 `approve(spender, amount)` transaction where `spender` is `0x3744Df2673097d738aCaa3E463E6D638867757f2` and `amount` is the value converted to the token's native decimals.
- Display the current allowance for the selected token so the user knows if re-approval is needed.

### Step 2 — Deposit with Referral

The user calls `depositWithReferral()` on the wrapper contract.

```solidity
function depositWithReferral(
    address vault,
    uint256 assets,
    address receiver,
    address referrer
) external returns (uint256 shares)
```

| Parameter | Input | Notes |
|-----------|-------|-------|
| `vault` | Dropdown of whitelisted vaults | See list below |
| `assets` | Text box | Human-readable amount; converted to token decimals before sending |
| `receiver` | Auto-filled | Set to the connected wallet address (read-only display) |
| `referrer` | Text box | User manually enters an Ethereum address |

- **Deposit button**: Sends the `depositWithReferral` transaction.
- After a successful deposit, display the number of vault shares received.

## Wallet Connection

- Use **wagmi@3.4.3** + **viem** + **ConnectKit** (or **RainbowKit**) for wallet integration.
- Support MetaMask and Rabby (both inject as `window.ethereum`; any injected-provider connector covers both).
- Show connected address and a disconnect option in the header.
- Target chain: Ethereum mainnet (chainId 1). Prompt the user to switch networks if on a different chain.

## Whitelisted Tokens

| Symbol | Address | Decimals |
|--------|---------|----------|
| USDC | `0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48` | 6 |
| USDT | `0xdAC17F958D2ee523a2206206994597C13D831ec7` | 6 |
| DAI | `0x6B175474E89094C44Da98b954EedeAC495271d0F` | 18 |
| WETH | `0xC02aaA39b223FE8D0A0e5CB4F63E40fB1106F867` | 18 |

## Whitelisted Vaults

| Label | Vault Address |
|-------|---------------|
| USDC Vault | `0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204` |
| USDT Vault | `0x310B7Ea7475A0B449Cfd73aB81ab65f120579BC0` |
| DAI Vault  | `0x028eC7330ff87667b6dfb0D94b954c820195336c` |
| WETH Vault | `0xc56413869c6CDf96496f2b1eF801fEDBdFA7dDB0` |

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | **Next.js** (App Router) with TypeScript |
| Styling | **Tailwind CSS** |
| Web3 | **wagmi@3.4.3** + **viem** |
| Wallet UI | **ConnectKit** |
| Package manager | **pnpm** |

## UI / UX Guidelines

- **Minimalist & modern**: Clean white/dark card on a subtle gradient background. No unnecessary chrome.
- **Single page**: Both steps rendered as cards stacked vertically (or as a stepper). No routing needed.
- **Responsive**: Must look good on desktop and mobile widths.
- **Transaction feedback**: Show pending/confirming/success/error states for every transaction using toasts or inline status badges.
- **Input validation**: Validate addresses are valid hex, amounts are positive numbers, and the user has sufficient balance/allowance before enabling action buttons.

## Contract Details

| Item | Value |
|------|-------|
| Wrapper contract | `0x3744Df2673097d738aCaa3E463E6D638867757f2` |
| Network | Ethereum mainnet (chainId 1) |
| Required ABIs | ERC-20 (`approve`, `allowance`, `balanceOf`, `decimals`) and Wrapper (`depositWithReferral`) |

## File Structure (suggested)

```
referral-wrapper-demo/
├── app/
│   ├── layout.tsx          # Root layout, providers (wagmi, ConnectKit)
│   ├── page.tsx            # Main page composing the two step cards
│   └── globals.css         # Tailwind base styles
├── components/
│   ├── ConnectButton.tsx   # Wallet connect / disconnect
│   ├── ApproveCard.tsx     # Step 1 UI
│   └── DepositCard.tsx     # Step 2 UI
├── config/
│   ├── tokens.ts           # Whitelisted tokens list
│   ├── vaults.ts           # Whitelisted vaults list
│   ├── abis.ts             # ABI constants (ERC-20 + Wrapper)
│   └── wagmi.ts            # wagmi + ConnectKit client config
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── next.config.js
```
