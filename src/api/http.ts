type Opts = {
  signal?: AbortSignal;
  timeoutMs?: number;
  retries?: number;
};

export async function requestJSON<T>(url: string, opts: Opts = {}): Promise<T> {
  const { timeoutMs = 10000, retries = 1, signal } = opts;
  const controller = new AbortController();
  const t = setTimeout(
    () => controller.abort(new DOMException('Timeout', 'AbortError')),
    timeoutMs
  );
  const merged = mergeSignals(signal, controller.signal);

  try {
    let lastErr: unknown;
    for (let i = 0; i <= retries; i++) {
      try {
        const res = await fetch(url, {
          signal: merged,
          headers: { accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return (await res.json()) as T;
      } catch (e) {
        lastErr = e;
        if (i === retries) throw e;
        await wait(300 * (i + 1));
      }
    }
    throw lastErr;
  } finally {
    clearTimeout(t);
  }
}

function wait(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function mergeSignals(
  a?: AbortSignal,
  b?: AbortSignal
): AbortSignal | undefined {
  if (!a && !b) return undefined;
  // simple fan-in
  const ctrl = new AbortController();
  const onAbort = () => ctrl.abort();
  a?.addEventListener('abort', onAbort);
  b?.addEventListener('abort', onAbort);
  if (a?.aborted || b?.aborted) ctrl.abort();
  return ctrl.signal;
}

