export const CHAINS = {
  ETHEREUM: "ethereum",
  BINANCE: "binance",
  POLYGON: "polygon",
  ARBITRUM: "arbitrum",
  AVALANCHE: "avalanche",
};

export const CHAIN_RPC = {
  [CHAINS.ETHEREUM]: "https://ethereum.publicnode.com",
  [CHAINS.BINANCE]: "https://bsc.publicnode.com",
  [CHAINS.POLYGON]: "https://polygon-bor.publicnode.com",
  [CHAINS.ARBITRUM]: "https://arbitrum-one.publicnode.com",
  [CHAINS.AVALANCHE]: "https://avalanche-c-chain.publicnode.com",
};

const PAIRS = {
  AXLUSDC_USDC: "axlUSDC-USDC",
};

export const pools = [
  {
    name: PAIRS.AXLUSDC_USDC,
    chain: CHAINS.AVALANCHE,
    address: "0xd7bB79aeE866672419999a0496D99c54741D67B5",
    creationHash:
      "0xa608be9aae6eac347506547c01727a08eebb3bd0832f0aae45dd810bb1f4658a",
  },
];
