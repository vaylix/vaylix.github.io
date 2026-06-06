export type BinaryKind = 'server' | 'client';
export type BinaryOs = 'linux' | 'macos' | 'windows';

export interface BinaryAsset {
  kind: BinaryKind;
  os: BinaryOs;
  arch: string;
  name: string;
  url: string;
}

export interface ReleaseEntry {
  version: string;
  date: string;
  summary: string;
  changes: string[];
  breakingChanges: string[];
  githubUrl: string;
  changelogUrl: string;
  assets: BinaryAsset[];
}

export interface ReleaseSeries {
  label: string;
  slug: string;
  latestVersion: string;
  latestDate: string;
  summary: string;
  href: string;
}

const repo = 'https://github.com/vaylix/vaylix';

const changelog = (anchor?: string) =>
  anchor ? `${repo}/blob/main/CHANGELOG.md#${anchor}` : `${repo}/blob/main/CHANGELOG.md`;

const releaseUrl = (version: string) => `${repo}/releases/tag/${version}`;

function asset(version: string, kind: BinaryKind, os: BinaryOs, arch: string): BinaryAsset {
  const ext = os === 'windows' ? 'zip' : 'tar.gz';
  const name = `vaylix-${kind}-${version}-${os}-${arch}.${ext}`;

  return {
    kind,
    os,
    arch,
    name,
    url: `${repo}/releases/download/${version}/${name}`,
  };
}

function assets(version: string, options: { windowsArm?: boolean } = {}): BinaryAsset[] {
  const targets: Array<[BinaryOs, string]> = [
    ['linux', 'aarch64'],
    ['linux', 'x86_64'],
    ['macos', 'aarch64'],
    ['windows', 'x86_64'],
  ];

  if (options.windowsArm) {
    targets.splice(4, 0, ['windows', 'aarch64']);
  }

  return targets.flatMap(([os, arch]) => [
    asset(version, 'server', os, arch),
    asset(version, 'client', os, arch),
  ]);
}

export const releaseSeries: ReleaseSeries[] = [
  {
    label: '0.x series',
    slug: '0.x',
    latestVersion: 'v0.9.0',
    latestDate: '2026-06-06',
    summary:
      'Established VTP2, WAL durability, encrypted persistence, RBAC, HA replication, binary-safe values, CAS, and pre-1.0 hardening contracts.',
    href: '/releases/0.x/',
  },
];

export const zeroSeriesReleases: ReleaseEntry[] = [
  {
    version: 'v0.9.0',
    date: '2026-06-06',
    summary:
      'Vaylix 0.9.0 starts the pre-1.0 hardening line. It focuses on correctness boundaries, reproducible builds, explicit compatibility contracts, and safety fixes without adding new command families.',
    changes: [
      'Added stability, compatibility, non-goals, and deployment contract documents.',
      'Added build provenance through `server.git_sha` in `INFO` and locked Cargo dependency resolution in CI and release builds.',
      'Expanded deterministic replication, partition, parser, recovery, auth/RBAC, TLS, and pipelined-request tests.',
      'Hardened startup and recovery paths around ambiguous WAL layouts, interrupted renames, manifest mismatches, and Unix directory fsync behavior.',
      'Native and local server runs default to `./default.vaylix`; Docker continues to use `/var/lib/vaylix`.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.9.0'),
    changelogUrl: changelog('090---2026-06-05'),
    assets: assets('v0.9.0', { windowsArm: true }),
  },
  {
    version: 'v0.8.0',
    date: '2026-06-04',
    summary:
      'Vaylix 0.8.0 makes values binary-safe and adds deterministic version-based CAS. It also tightens transport parsing, compression placement, and fail-closed recovery tests.',
    changes: [
      'Values are opaque bytes end-to-end while keys remain UTF-8 strings.',
      'Stored values now carry a persisted `u64` version, enabling `SET <key> <value> IF VERSION <version>`.',
      'WAL, snapshots, logical backups, and replication preserve exact byte payloads and value versions.',
      'Logical backups now use v2 with base64 values while v1 text backups remain restorable.',
      'VTP decode and compression paths were hardened and benchmarked.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.8.0'),
    changelogUrl: changelog('080---2026-06-04'),
    assets: assets('v0.8.0', { windowsArm: true }),
  },
  {
    version: 'v0.7.1',
    date: '2026-06-03',
    summary:
      'Vaylix 0.7.1 is a dependency maintenance release for GitHub Actions and crates. It keeps the 0.7 performance release surface unchanged.',
    changes: [
      'Updated release and CI dependencies for compatibility.',
      'Preserved the 0.7.0 protocol, storage, command, auth/RBAC, and HA semantics.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.7.1'),
    changelogUrl: changelog(),
    assets: assets('v0.7.1', { windowsArm: true }),
  },
  {
    version: 'v0.7.0',
    date: '2026-06-02',
    summary:
      'Vaylix 0.7.0 is the in-memory performance release. It replaces the live keyspace with a sharded store and separates WAL filesystem work from the engine coordinator while preserving compatibility.',
    changes: [
      'Introduced a sharded `DashMap` engine store with value and expiration metadata stored together.',
      'Added a dedicated WAL I/O worker and an HA write coordinator for ordered batching.',
      'Added committed read indexes for leader and standalone `GET`, `MGET`, `EXISTS`, and `TTL`.',
      'Improved replication wait behavior with persistent append/heartbeat peer workers and notify-driven commit advancement.',
      'Added Unix release-build jemalloc support for supported non-musl server targets.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.7.0'),
    changelogUrl: changelog('070---2026-06-02'),
    assets: assets('v0.7.0', { windowsArm: true }),
  },
  {
    version: 'v0.6.0',
    date: '2026-06-02',
    summary:
      'Vaylix 0.6.0 improves durable write throughput without changing protocol, storage, command syntax, auth/RBAC behavior, or HA acknowledgement semantics.',
    changes: [
      'Added a stateful WAL writer with open active-segment state and safe batch append/rotation.',
      'Added bounded batching for eligible single-command writes and group commit for `sync` durability mode.',
      'Moved request-level logging off the default hot path behind `--log-requests` / `VAYLIX_LOG_REQUESTS`.',
      'Raised the default compression threshold for small frames and reduced storage encryption hot-path cost.',
      'Extended benchmark controls for WAL durability and write acknowledgement matrices.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.6.0'),
    changelogUrl: changelog('060---2026-06-02'),
    assets: assets('v0.6.0', { windowsArm: true }),
  },
  {
    version: 'v0.5.3',
    date: '2026-06-02',
    summary:
      'Vaylix 0.5.3 hardens the container runtime and validates benchmark behavior. It moves the image to a distroless Debian 13 runtime with a compiled init binary.',
    changes: [
      'Switched runtime images to `gcr.io/distroless/cc-debian13`.',
      'Added `vaylix-init` to prepare storage directories and drop privileges before starting the server.',
      'Kept Linux bind-mounted data directories working without manual host `chown`.',
      'Kept Docker env defaults, volume path, exposed port, and healthcheck behavior.',
      'Fixed benchmark read workloads so valid `GET` misses count as completed operations.',
    ],
    breakingChanges: [
      'The server storage default changed to `/var/lib/vaylix` in this release line. Bare-metal local development should pass an explicit `--data-dir` unless that path is prepared for the server user.',
    ],
    githubUrl: releaseUrl('v0.5.3'),
    changelogUrl: changelog('053---2026-06-02'),
    assets: assets('v0.5.3', { windowsArm: true }),
  },
  {
    version: 'v0.5.2',
    date: '2026-06-01',
    summary:
      'Vaylix 0.5.2 is a Docker and runtime reliability patch. It focuses on bind-mounted data directories, healthchecks, and release artifact coverage.',
    changes: [
      'Docker images now repair Linux bind-mounted storage permissions before launching as UID/GID `65532`.',
      'Added a Docker `HEALTHCHECK` implemented by the `vaylix` server binary.',
      'Allowed readiness healthchecks to authenticate from healthcheck-specific or normal startup credentials.',
      'Added Windows ARM64 archives for server and client binaries.',
      'Moved release archive SBOM generation and Sigstore signing into one Linux job after platform builds.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.5.2'),
    changelogUrl: changelog('052---2026-06-01'),
    assets: assets('v0.5.2', { windowsArm: true }),
  },
  {
    version: 'v0.5.1',
    date: '2026-06-01',
    summary:
      'Vaylix 0.5.1 fixes persisted Docker auth behavior and modularizes server internals without changing the wire protocol or HA feature surface.',
    changes: [
      'Persisted auth stores track the env-managed bootstrap admin across restarts.',
      'Changing `VAYLIX_PASSWORD` rotates the tracked startup admin password for an existing data directory.',
      'Changing `VAYLIX_USER` creates the new startup admin and retires the previous env-managed admin.',
      'Migrates existing 0.5.0 auth stores without dropping custom users or RBAC roles.',
      'Splits server startup, offline admin, backup manifest, maintenance mode, and auth lockout state into focused modules.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.5.1'),
    changelogUrl: changelog('051---2026-06-01'),
    assets: assets('v0.5.1'),
  },
  {
    version: 'v0.5.0',
    date: '2026-05-31',
    summary:
      'Vaylix 0.5.0 introduces the HA replication line: Raft-style roles, automatic leader election, quorum-backed writes, and cluster diagnostics.',
    changes: [
      'Added follower/candidate/leader roles with persisted term, vote state, heartbeats, and election timers.',
      'Added automatic leader failover for three-node clusters.',
      'Made quorum-backed write acknowledgement available through `replica` / `majority`.',
      'Added cluster-internal vote, heartbeat, append-entry, and snapshot-install RPCs over VTP2.',
      'Added `health`, `show cluster`, `show replication`, `cluster join`, and `cluster remove` operator surfaces.',
    ],
    breakingChanges: [
      'The default `--write-ack-mode` changed from `local` to quorum-backed `replica`. Use `local` explicitly only when local durability without HA acknowledgement is acceptable.',
    ],
    githubUrl: releaseUrl('v0.5.0'),
    changelogUrl: changelog('050---2026-05-31'),
    assets: assets('v0.5.0'),
  },
  {
    version: 'v0.4.0',
    date: '2026-05-30',
    summary:
      'Vaylix 0.4.0 adds manual primary/replica replication, explicit write-ack modes, and operator-facing health and replication diagnostics.',
    changes: [
      'Added leader/follower replication over the existing transport.',
      'Added snapshot bootstrap plus WAL catch-up for followers.',
      'Added write acknowledgement modes: `local`, `replica`, and `all`.',
      'Added `health`, `show replication`, `promote follower`, `pause replication`, and `resume replication`.',
      'Followers reject local writes and transactional write paths.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.4.0'),
    changelogUrl: changelog('040---2026-05-30'),
    assets: assets('v0.4.0'),
  },
  {
    version: 'v0.3.0',
    date: '2026-05-30',
    summary:
      'Vaylix 0.3.0 fixes transaction result transport. Successful `EXEC` responses now preserve structured typed results instead of flattened strings.',
    changes: [
      '`EXEC` preserves typed command results at the transport layer.',
      'Rust client rendering now uses structured transaction results.',
      'Transport and client tests were updated for the new payload shape.',
      'Workspace crates were bumped to `0.3.0`.',
    ],
    breakingChanges: [
      'Successful `EXEC` result payloads changed within protocol v2. 0.2.x clients that decode `EXEC` as a string list are not compatible with 0.3.0 transaction results.',
    ],
    githubUrl: releaseUrl('v0.3.0'),
    changelogUrl: changelog('030---2026-05-30'),
    assets: assets('v0.3.0'),
  },
  {
    version: 'v0.2.0',
    date: '2026-05-29',
    summary:
      'Vaylix 0.2.0 is the single-node hardening release. It introduces VTP2, stronger persistence and recovery behavior, RBAC, observability, TLS/mTLS, and maintenance controls.',
    changes: [
      'Introduced transport protocol v2 with `VTP2` magic, startup negotiation, compression negotiation, request deadlines, and pipelining support.',
      'Added segmented WAL, retained WAL history, offline storage verification/migration, and PITR-oriented restore tooling.',
      'Added logical backup/restore improvements with server-side backup files, manifests, verification, and dry-run checks.',
      'Added RBAC with patterned permissions, grant introspection, password rotation, and stricter password policy enforcement.',
      'Expanded `INFO`, `METRICS`, and `METRICS PROM`; added optional TLS/mTLS and maintenance mode.',
    ],
    breakingChanges: [
      '0.2.x is not wire-compatible with 0.1.0. Upgrade clients and servers together.',
      'Storage layout moved to segmented WAL under `<data-dir>/wal` with manifest format 3. Legacy monolithic `wal.log` layouts require explicit `vaylix storage migrate --data-dir <dir>`.',
    ],
    githubUrl: releaseUrl('v0.2.0'),
    changelogUrl: changelog('020---2026-05-29'),
    assets: assets('v0.2.0'),
  },
  {
    version: 'v0.1.0',
    date: '2026-05-27',
    summary:
      'Vaylix 0.1.0 is the alpha foundation release. It establishes the Rust single-node key-value database, framed binary transport, REPL client, and encrypted persistence baseline.',
    changes: [
      'Added framed binary transport with UUID request IDs, checksums, structured statuses, and explicit error codes.',
      'Added a Tokio multi-client server with a dedicated engine worker.',
      'Added the interactive `vaylix-client` REPL with plain, table, and JSON output modes.',
      'Enabled authentication and zstd frame compression by default.',
      'Added WAL plus encrypted snapshot persistence, audit logging, runtime guardrails, and single-node `MULTI` / `EXEC` / `DISCARD` transactions.',
    ],
    breakingChanges: [],
    githubUrl: releaseUrl('v0.1.0'),
    changelogUrl: changelog('010---2026-05-27'),
    assets: assets('v0.1.0'),
  },
];
