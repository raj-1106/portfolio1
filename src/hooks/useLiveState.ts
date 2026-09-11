'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { LiveState } from '@/lib/types';
import { RPC_POLL_INTERVAL } from '@/content/config';

/**
 * Custom hook for fetching live on-chain state through the RPC proxy.
 *
 * - Fetches from /api/rpc/[program]
 * - Client-side cache: stores last successful response, serves stale data while refreshing
 * - Polls every RPC_POLL_INTERVAL (60s)
 * - On error: keeps last known data with status 'stale', doesn't blank out
 */
export function useLiveState(programSlug: string): LiveState {
  const [state, setState] = useState<LiveState>({
    status: 'loading',
    data: null,
    lastUpdated: null,
    error: null,
  });

  const lastSuccessfulData = useRef<Record<string, string | number> | null>(null);
  const lastUpdatedRef = useRef<number | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/rpc/${programSlug}`);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();

      if (json.status === 'error') {
        throw new Error(json.error || 'RPC fetch failed');
      }

      lastSuccessfulData.current = json.data;
      lastUpdatedRef.current = Date.now();

      setState({
        status: 'success',
        data: json.data,
        lastUpdated: lastUpdatedRef.current,
        error: null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';

      if (lastSuccessfulData.current) {
        setState({
          status: 'stale',
          data: lastSuccessfulData.current,
          lastUpdated: lastUpdatedRef.current,
          error: errorMessage,
        });
      } else {
        setState({
          status: 'error',
          data: null,
          lastUpdated: null,
          error: errorMessage,
        });
      }
    }
  }, [programSlug]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, RPC_POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return state;
}
