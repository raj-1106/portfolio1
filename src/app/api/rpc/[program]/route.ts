import { NextResponse } from 'next/server';
import { rpcAllowlist, RPC_CACHE_TTL } from '@/content/config';

/**
 * In-memory cache for RPC responses.
 *
 * Best-effort only. Resets on cold start. Not a distributed rate limit.
 * Accepted tradeoff for portfolio-scale traffic.
 */
const cache = new Map<string, { data: Record<string, string | number>; cachedAt: number }>();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ program: string }> },
) {
  const { program } = await params;

  // Validate against allowlist
  const config = rpcAllowlist[program];
  if (!config) {
    return NextResponse.json(
      {
        status: 'error',
        data: null,
        error: `Program "${program}" not in allowlist`,
        cachedAt: null,
      },
      { status: 404 },
    );
  }

  // Check cache
  const cached = cache.get(program);
  if (cached && Date.now() - cached.cachedAt < RPC_CACHE_TTL) {
    return NextResponse.json({
      status: 'success',
      data: cached.data,
      error: null,
      cachedAt: cached.cachedAt,
    });
  }

  try {
    // Dispatch to correct RPC client based on chain
    let data: Record<string, string | number>;

    if (config.chain === 'svm') {
      // Dynamic import to avoid bundling @solana/web3.js on every API call
      const { fetchSolanaState } = await import('@/lib/solana-rpc');
      data = await fetchSolanaState(config.programId, config.rpcEndpoint);
    } else {
      const { fetchEvmState } = await import('@/lib/evm-rpc');
      data = await fetchEvmState(config.programId, config.rpcEndpoint);
    }

    // Update cache
    const cachedAt = Date.now();
    cache.set(program, { data, cachedAt });

    return NextResponse.json({
      status: 'success',
      data,
      error: null,
      cachedAt,
    });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'RPC fetch failed';

    // Return stale cached data if available
    if (cached) {
      return NextResponse.json({
        status: 'stale',
        data: cached.data,
        error: errorMessage,
        cachedAt: cached.cachedAt,
      });
    }

    return NextResponse.json(
      {
        status: 'error',
        data: null,
        error: errorMessage,
        cachedAt: null,
      },
      { status: 502 },
    );
  }
}
