export interface ProjectMeta {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  chain: 'svm' | 'evm';
  evmChain?: 'sepolia' | 'mainnet' | 'amoy';
  techStack: string[];
  status: 'live' | 'in-progress' | 'archived';
  liveUrl?: string;
  repoUrl: string;
  rpcEndpoint?: string;
  programId?: string;
  diagramType?: 'liquidation-flow' | 'amm-graph' | 'lp-collateral-cpi' | 'inflation-attack-comparison';
  depth: 'full' | 'brief';
}

// Removed ExperienceMeta in favor of static array

export interface LiveState {
  status: 'loading' | 'success' | 'error' | 'stale';
  data: Record<string, string | number> | null;
  lastUpdated: number | null;
  error: string | null;
}

export type ChainFilter = 'all' | 'svm' | 'evm';

export type NodeStatus = 'live' | 'in-progress' | 'archived';
