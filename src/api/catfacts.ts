import { requestJSON } from './http';
import type { CatFact } from '../types/api';

export const getCatFact = (signal?: AbortSignal) =>
  requestJSON<CatFact>('https://catfact.ninja/fact', { signal });

