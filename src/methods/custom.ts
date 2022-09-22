import { RequestInit } from 'node-fetch';

import { getToken } from '../auth';
import fetch from '../fetch';

export default function _custom<T>(url: string, params?: Partial<RequestInit>): Promise<T> {
  return getToken().then(fetch(url, params));
}
