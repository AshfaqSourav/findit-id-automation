import { test as base } from '../lib/BaseTest.js';
import path from 'path';

export function doLogin(emailKey = 'buyer') {
  const storageState = path.resolve(`LoginAuth_${emailKey}.json`);
  return base.extend({
    storageState
  });
}
