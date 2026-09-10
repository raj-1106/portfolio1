import type { ProjectMeta } from '@/lib/types';

// ============================================================
// Site metadata — replace placeholders with your actual info
// ============================================================

export const siteConfig = {
  name: 'Raj Lathigra',
  tagline: 'I write code that moves other people\'s money and tries very hard not to lose it.',
  description: 'Blockchain developer building DeFi protocols, on-chain applications, and enterprise distributed ledger solutions across SVM and EVM.',
  url: 'https://raj-lathigra.vercel.app',
  socials: {
    github: 'https://github.com/raj-1106',
    linkedin: 'https://linkedin.com/in/raj-lathigra',
    twitter: 'https://x.com/LathigraRaj',
    email: 'rlathigra11@gmail.com',
  },
} as const;

// ============================================================
// Navigation
// ============================================================

export const navItems = [
  { label: 'About', href: '/#about' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' },
] as const;

// ============================================================
// RPC constants
// ============================================================

export const RPC_CACHE_TTL = 30_000;       // 30s — best-effort in-memory cache
export const RPC_POLL_INTERVAL = 60_000;   // 60s — client-side polling

// ============================================================
// Project data
// ============================================================

export const projects: ProjectMeta[] = [
  {
    title: 'RoomieSplit',
    slug: 'roomiesplit',
    description: 'On-chain expense splitting and settlement protocol for shared living costs.',
    tags: ['DeFi', 'Consumer', 'Payments'],
    chain: 'svm',
    techStack: ['Rust', 'Anchor 0.31.1', 'Solana', 'React', 'TypeScript'],
    status: 'live',
    depth: 'full',
    repoUrl: 'https://github.com/raj-1106/roomiesplit',
    liveUrl: 'https://roomiesplit1.netlify.app/'
  },
  {
    title: 'Lending Protocol',
    slug: 'lending-protocol',
    description: 'Collateralized lending with automated liquidation based on real-time oracle price feeds.',
    tags: ['DeFi', 'Lending', 'Liquidation'],
    chain: 'svm',
    techStack: ['Rust', 'Anchor', 'Solana', 'Pyth Oracle'],
    status: 'completed',
    depth: 'full',
    repoUrl: 'https://github.com/raj-1106/lending-protocol',
    diagramType: 'liquidation-flow',
  },
  {
    title: 'DEX',
    slug: 'dex',
    description: 'Constant-product automated market maker (x·y=k) supporting arbitrary ERC-20 pairs.',
    tags: ['DeFi', 'DEX', 'AMM', 'EVM'],
    chain: 'evm',
    evmChain: 'amoy',
    techStack: ['Solidity', 'Foundry', 'Ethereum'],
    status: 'live',
    depth: 'full',
    repoUrl: 'https://github.com/raj-1106/dex',
    liveUrl: 'https://dex-ten-omega.vercel.app/',
    diagramType: 'amm-graph',
  },
  {
    title: 'Proof of Touch Grass',
    slug: 'proof-of-touch-grass',
    description: 'EVM-based attestation contract for real-world activity verification.',
    tags: ['Social', 'Attestation', 'EVM'],
    chain: 'evm',
    evmChain: 'sepolia',
    techStack: ['Solidity', 'Hardhat', 'Ethers.js', 'React'],
    status: 'live',
    depth: 'full',
    repoUrl: 'https://github.com/raj-1106/proof-of-touch-grass',
    liveUrl: 'https://proof-of-touchgrass.netlify.app',
  },
  {
    title: 'ERC-4626 Inflation Attack',
    slug: 'erc-4626-inflation-attack',
    description: 'A self-contained Foundry demonstration of the ERC-4626 inflation attack, complete with vulnerable vault, fuzz tests, and two production-grade fixes.',
    tags: ['Security', 'DeFi', 'EVM'],
    chain: 'evm',
    techStack: ['Solidity', 'Foundry', 'Fuzzing'],
    status: 'completed',
    depth: 'full',
    repoUrl: 'https://github.com/raj-1106/erc-4626-inflation-attack',
    diagramType: 'inflation-attack-comparison',
  },
];

// Removed Experience data to use static typed array in experience.ts

// ============================================================
// RPC allowlist — programs allowed through the proxy
// Only entries here can be fetched via /api/rpc/[program]
// ============================================================

export const rpcAllowlist: Record<string, {
  chain: 'svm' | 'evm';
  programId: string;
  rpcEndpoint: string;
}> = {
   // Populate with actual program IDs and endpoints when available
   'roomiesplit': {
    chain: 'svm',
    programId: 'BzEpHaoaEGSQwnFbSv8gVwpxh4tQBn2WS1pDTjUMbc3c',
    rpcEndpoint: 'https://api.devnet.solana.com',
   },
   'lending-protocol': {
    chain: 'svm',
    programId: '4mLbRVccVFXDkcGDBApraUxXVUfJoTUMg4gd4EBjQVuQ',
    rpcEndpoint: 'https://api.devnet.solana.com',
   },
   'proof-of-touch-grass': {
    chain: 'evm',
    programId: '0x431Fb77991919b47D7f54f18d393490707819561',
    rpcEndpoint: 'https://eth-sepolia.g.alchemy.com/v2/OOIMS_hWS2oBIZXbMyjTG',
   },
   'dex': {
    chain: 'evm',
    programId: '0x9fE7B201f1189b51FDC7C481806098A4070CCD10',
    rpcEndpoint: 'https://eth-sepolia.g.alchemy.com/v2/OOIMS_hWS2oBIZXbMyjTG',
   }
};
