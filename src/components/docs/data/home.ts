import {
  latestDockerPassword,
  latestDockerUser,
  latestSdkVersion,
  latestServerImage,
  latestServerVersion,
} from './versions';

export const heroProperties = [
  'Raft-style quorum replication',
  'Encrypted WAL and snapshots',
  'Auth and RBAC enabled by default',
  'Structured binary protocol (VTP2)',
  'Deterministic error codes',
  'Production-oriented runtime',
];

export const heroExample = `docker run --rm \\
  -p 9173:9173 \\
  -v vaylix-data:/var/lib/vaylix \\
  -e VAYLIX_USER=${latestDockerUser} \\
  -e VAYLIX_PASSWORD=${latestDockerPassword} \\
  ${latestServerImage}:${latestServerVersion.slice(1)}
`;

export const landingDockerExample = `docker run --rm \\
  -p 9173:9173 \\
  -v vaylix-data:/var/lib/vaylix \\
  -e VAYLIX_USER=${latestDockerUser} \\
  -e VAYLIX_PASSWORD=${latestDockerPassword} \\
  ${latestServerImage}:${latestServerVersion.slice(1)}
`;

export const landingSdkExample = `import { createClient } from '@vaylix/client';

const client = createClient({
  url: 'vaylix://${latestDockerUser}:${latestDockerPassword}@127.0.0.1:9173',
});

await client.connect();

try {
  await client.set('config:feature-x', 'enabled');
  const value = await client.get('config:feature-x');
  const ttlApplied = await client.expire('config:feature-x', 60);
  const casOk = await client.set('config:feature-x', 'disabled', { ifVersion: 1n });

  console.log({ value, ttlApplied, casOk });
} finally {
  await client.close();
}`;

export const landingCliReplExample = `$ vaylix-client --url 'vaylix://vaylix:vaylix@127.0.0.1:9173'
vaylix> SET config:env production
OK
vaylix> GET config:env
production
vaylix> SET config:env staging IF VERSION 1
true
vaylix> GET config:env
staging
vaylix> TTL config:env
-1
vaylix> EXIT
$`;

export const landingCliScriptExample = `printf 'SET flags:cli on
GET flags:cli
SET flags:cli off IF VERSION 1
GET flags:cli
EXIT
' | vaylix-client --url 'vaylix://vaylix:vaylix@127.0.0.1:9173'`;

export const suitableWorkloads = [
  'Configuration and feature flag storage',
  'Distributed coordination metadata',
  'Rate limiting counters with TTL',
  'Session coordination state',
  'Internal platform state that must be consistent across nodes',
];

export const notForWorkloads = [
  'Caching: use Redis or Valkey',
  'Application data storage: use Postgres',
  'Kubernetes cluster coordination: use etcd',
  'Pub/sub messaging: use Redis, Valkey, or NATS',
];

export const guaranteeFacts = [
  'Every acknowledged write has been fsynced to the WAL.',
  'On a replicated cluster, every acknowledged write has been committed to a quorum.',
  'Reads on the same connection are consistent with the last committed write.',
  'The audit log is hash-chained and tamper-evident at startup.',
];

export const nonGuarantees = [
  'No MVCC.',
  'No distributed transactions.',
  'No claim beyond serialized leader execution, WAL durability, and quorum-backed acknowledgement.',
  'No linearizable follower reads.',
];

export const architectureLayers = ['client', 'transport', 'server', 'engine'];
export const architecturePersistence = ['replication', 'WAL', 'snapshot'];

export const architectureNotes = [
  'Transport owns framing, negotiation, compression, and request decoding.',
  'The server owns auth, RBAC, maintenance mode, replication policy, and request routing.',
  'The engine owns durable state, WAL replay, snapshots, and logical backup data.',
];

export const readinessLinks = [
  { label: 'Configuration', href: '/configuration/' },
  { label: 'Deployment', href: '/deployment/' },
  { label: 'Security', href: '/security/' },
  { label: 'Replication', href: '/replication/' },
  { label: 'Persistence', href: '/persistence/' },
  { label: 'Backup and restore', href: '/backup-and-restore/' },
];

export const compatibilityLinks = [
  { label: 'Command reference', href: '/reference/commands/' },
  { label: 'Error codes', href: '/reference/error-codes/' },
  { label: 'Protocol', href: '/reference/protocol/' },
  { label: 'Comparison', href: '/comparison/' },
  { label: 'FAQ', href: '/faq/' },
];

export const currentLine = {
  server: latestServerVersion,
  sdk: latestSdkVersion,
};
