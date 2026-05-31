import { createReleaseEntry, type ReleaseEntry } from './release-helpers';

export type { ReleaseAsset, ReleaseEntry } from './release-helpers';

export const releases: ReleaseEntry[] = [
  createReleaseEntry({ version: '0.5.0', date: '2026-05-31' }),
  createReleaseEntry({ version: '0.4.0', date: '2026-05-30' }),
  createReleaseEntry({ version: '0.3.0', date: '2026-05-30' }),
  createReleaseEntry({ version: '0.2.0', date: '2026-05-29' }),
  createReleaseEntry({ version: '0.1.0', date: '2026-05-27' }),
];
