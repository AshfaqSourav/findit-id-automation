import { test as base } from '../lib/BaseTest.js';
import path from 'path';

export function doLogin(emailKey = 'email1') {
  const storageState = path.resolve(`LoginAuth_${emailKey}.json`);
  return base.extend({
    storageState
  });
}
