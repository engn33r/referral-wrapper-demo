# Yearn Referral Wrapper Demo

A demo web app for depositing into Yearn v3 vaults with referral tracking. This demo showcases the [referral wrapper smart contracts](https://github.com/engn33r/referral-wrapper).

The frontend interacts with the referral wrapper contracts deployed at `0x3744Df2673097d738aCaa3E463E6D638867757f2` on Mainnet, Base, Arbitrum, and Katana. Any referral code can be used, with 0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52 suggested for testing. The referral code should be decided upon with Yearn via the [partners program](https://partners.yearn.fi/).

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd referral-wrapper-demo
```

2. Install dependencies:
```bash
pnpm install
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
pnpm build
pnpm start
```
