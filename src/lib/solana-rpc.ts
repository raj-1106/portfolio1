/**
 * Solana RPC client using @solana/web3.js.
 * Fetches on-chain state for SVM projects via the RPC proxy.
 * Retry: 2 attempts, exponential backoff (500ms → 1000ms)
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
 * Solana state fetcher.
 * Returns account existence, executable flag, lamports, and data length.
 */
export async function fetchSolanaState(
  programId: string,
  rpcEndpoint: string,
): Promise<Record<string, string | number>> {
  return withRetry(async () => {
    const { Connection, PublicKey } = await import('@solana/web3.js');
    const connection = new Connection(rpcEndpoint, 'confirmed');
    const pubkey = new PublicKey(programId);

    const accountInfo = await connection.getAccountInfo(pubkey);
    const result: Record<string, string | number> = {
      programId: programId.slice(0, 8) + '...',
    };

    if (!accountInfo) {
      result.status = 'not-found';
      return result;
    }

    result.executable = accountInfo.executable ? 1 : 0;
    result.lamports = accountInfo.lamports;
    result.dataLength = accountInfo.data.length;
    return result;
  });
}
