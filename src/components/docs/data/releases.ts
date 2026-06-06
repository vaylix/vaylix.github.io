import { createReleaseEntry, type ReleaseEntry } from './release-helpers';

export type { ReleaseAsset, ReleaseEntry } from './release-helpers';

export const releases: ReleaseEntry[] = [
  createReleaseEntry({ version: '0.9.0', date: '2026-06-06', windowsArm: true }),
  createReleaseEntry({ version: '0.8.0', date: '2026-06-04', windowsArm: true }),
  createReleaseEntry({ version: '0.7.1', date: '2026-06-03', windowsArm: true }),
  createReleaseEntry({ version: '0.7.0', date: '2026-06-02', windowsArm: true }),
  createReleaseEntry({ version: '0.6.0', date: '2026-06-02', windowsArm: true }),
  createReleaseEntry({ version: '0.5.3', date: '2026-06-02', windowsArm: true }),
  createReleaseEntry({ version: '0.5.2', date: '2026-06-01', windowsArm: true }),
  createReleaseEntry({ version: '0.5.1', date: '2026-06-01' }),
  createReleaseEntry({ version: '0.5.0', date: '2026-05-31' }),
  createReleaseEntry({ version: '0.4.0', date: '2026-05-30' }),
  createReleaseEntry({ version: '0.3.0', date: '2026-05-30' }),
  createReleaseEntry({ version: '0.2.0', date: '2026-05-29' }),
  createReleaseEntry({ version: '0.1.0', date: '2026-05-27' }),
];
