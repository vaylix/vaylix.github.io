import {
  latestDockerPassword,
  latestDockerUser,
  latestServerImage,
} from './versions';

export const heroProperties = [
  'Raft-style quorum replication',
  'Encrypted WAL and snapshot persistence',
  'Authentication and RBAC enabled by default',
  'Structured binary protocol (VTP2)',
  'Deterministic error codes',
  'Production-oriented runtime and recovery path',
];

export const heroExample = `docker run --rm \\
  -p 9173:9173 \\
  -v vaylix-data:/var/lib/vaylix \\
  -e VAYLIX_USER=${latestDockerUser} \\
  -e VAYLIX_PASSWORD=${latestDockerPassword} \\
  ${latestServerImage}

./vaylix-client --url 'vaylix://${latestDockerUser}:${latestDockerPassword}@127.0.0.1:9173'

vaylix> set control:epoch 42
OK
vaylix> get control:epoch
42`;

export const whatVaylixIs = [
  'Transport-first architecture with the protocol surface isolated from the storage engine.',
  'Deterministic durability through WAL-backed writes, snapshotting, startup validation, and explicit failure on corruption.',
  'Explicit failure semantics for protocol, storage, auth, and replication paths.',
  'Designed for operational state rather than application data modeling.',
];

export const useCases = [
  'Configuration storage',
  'Feature flags',
  'Coordination metadata',
  'Internal platform state',
  'Distributed control planes',
];

export const whatVaylixIsNot = [
  'Not a Redis-compatible data-structure server.',
  'Not a document database.',
  'Not a distributed SQL engine.',
  'Not a caching tier.',
];

export const architectureFlow = [
  'client',
  'transport',
  'server',
  'engine',
];

export const persistenceFlow = ['replication', 'WAL', 'snapshot'];

export const architectureNotes = [
  'Transport is isolated from the engine and owns framing, negotiation, compression, and request/response encoding.',
  'The engine is unaware of authentication and RBAC; those are enforced at the server layer.',
  'Replication runs over the main protocol surface instead of a separate side channel.',
];

export const guarantees = [
  'Quorum-backed write acknowledgement.',
  'No committed entry is lost.',
  'Encrypted persistence for WAL and snapshots.',
  'Deterministic startup validation before accepting traffic.',
  'Explicit failure on corruption or continuity mismatch.',
];

export const productionReadiness = [
  {
    label: 'TLS and mTLS support',
    href: '/reference/security-model/',
  },
  {
    label: 'Audit logging',
    href: '/reference/security-model/',
  },
  {
    label: 'Backup and restore',
    href: '/reference/persistence-and-recovery/',
  },
  {
    label: 'Chaos-tested replication',
    href: '/guides/server-operations/',
  },
  {
    label: 'Stability policy',
    href: '/reference/stability-and-compatibility/',
  },
];

export const gettingStartedLinks = [
  {
    label: 'Install and build',
    href: '/getting-started/install-and-build/',
  },
  {
    label: 'Run a local node',
    href: '/getting-started/run-local/',
  },
  {
    label: 'Command reference',
    href: '/reference/commands/',
  },
];

export const stabilityLinks = [
  {
    label: 'Storage format policy',
    href: '/reference/stability-and-compatibility/#storage-format-policy',
  },
  {
    label: 'Protocol compatibility policy',
    href: '/reference/stability-and-compatibility/#protocol-compatibility-policy',
  },
  {
    label: 'Versioning guarantees',
    href: '/reference/stability-and-compatibility/#versioning-guarantees',
  },
  {
    label: 'STABILITY.md',
    href: '/STABILITY.md',
  },
];
