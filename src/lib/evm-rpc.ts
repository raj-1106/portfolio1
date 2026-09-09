/**
 * EVM RPC client using viem
 * Used by the RPC proxy to fetch on-chain state for EVM projects.
 * Configured for Sepolia testnet.
 *
 * Functions:
 * - fetchEvmState: Generic dispatcher
 * - fetchTouchGrassState: Proof of Touch Grass contract state
 *
 * Retry: 2 retries, exponential backoff (500ms → 1500ms)
 */

async function withRetry<T>(
  fn: () => Promise<T>,
  retries = 2,
  baseDelay = 500,
): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (attempt === retries) throw err;
      await new Promise((resolve) =>
        setTimeout(resolve, baseDelay * Math.pow(3, attempt)),
      );
    }
  }
  throw new Error('Retry exhausted');
}

/**
 * Generic EVM state fetcher.
 * For now, does a basic balance/code check on the contract address.
 * Will be extended with contract ABI reads when the ABI is provided.
 */
export async function fetchEvmState(
  contractAddress: string,
  rpcEndpoint: string,
): Promise<Record<string, string | number>> {
  return withRetry(async () => {
    const { createPublicClient, http } = await import('viem');
    const { sepolia } = await import('viem/chains');

    const client = createPublicClient({
      chain: sepolia,
      transport: http(rpcEndpoint || undefined), // Falls back to public RPC if empty
    });

    const address = contractAddress as `0x${string}`;

    const [balance, code] = await Promise.all([
      client.getBalance({ address }),
      client.getCode({ address }),
    ]);

    const hasCode = code && code !== '0x';

    return {
      deployed: hasCode ? 1 : 0,
      balanceWei: Number(balance),
      address: contractAddress.slice(0, 8) + '...',
    };
  });
}
