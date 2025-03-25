import { expect } from "@playwright/test";

import * as path from 'path';
import * as fs from 'fs';

export const joinFile = (downloadPath, fileName) => {
  expect(fs.existsSync(path.join(downloadPath, fileName))).toBeTruthy();
};

