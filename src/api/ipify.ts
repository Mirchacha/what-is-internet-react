import { requestJSON } from './http';
import type { MyIp } from '../types/api';

export const getMyIp = (signal?: AbortSignal) =>
  requestJSON<MyIp>('https://api.ipify.org?format=json', { signal });

