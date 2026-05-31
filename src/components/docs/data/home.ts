import {
  LuBookOpen,
  LuBoxes,
  LuCodeXml,
  LuFileStack,
  LuLock,
  LuServer,
  LuSquareTerminal,
  LuWorkflow,
} from 'react-icons/lu';
import {
  latestDockerPassword,
  latestDockerUser,
  latestSdkVersion,
  latestServerImage,
  latestServerVersion,
} from './versions';

export const homeSections = [
  {
    href: '/getting-started/install-and-build/',
    title: 'Install and build',
    description: 'Download the client binary, run the published server image, or jump to the isolated source-build path when you need local development.',
    icon: LuSquareTerminal,
  },
  {
    href: '/getting-started/run-local/',
    title: 'Run a local node',
    description: 'Start the published server image, connect with the client binary, and verify auth, compression, optional TLS/mTLS, and command flow.',
    icon: LuServer,
  },
  {
    href: '/reference/wire-protocol/',
    title: 'Inspect the wire protocol',
    description: 'Review VTP2, startup negotiation, frame checksums, compression flags, request IDs, and structured responses.',
    icon: LuWorkflow,
  },
  {
    href: '/reference/commands/',
    title: 'Use the command set',
    description: 'Check supported commands, syntax, examples, transaction boundaries, maintenance controls, backup flows, and RBAC operations.',
    icon: LuBookOpen,
  },
  {
    href: '/developer/typescript-sdk/',
    title: 'Build with the SDK',
    description: 'Use the official TypeScript SDK for application-side access, transactions, pooling, typed errors, and direct VTP2 communication.',
    icon: LuCodeXml,
  },
  {
    href: '/reference/persistence-and-recovery/',
    title: 'Understand persistence',
    description: 'Learn segmented WAL behavior, snapshots, manifests, keyring handling, backup verification, and offline PITR operations.',
    icon: LuFileStack,
  },
  {
    href: '/reference/security-model/',
    title: 'Review the security model',
    description: 'Default-on auth, RBAC, optional TLS/mTLS, password policy, auth lockouts, encrypted persistence, and audit logging.',
    icon: LuLock,
  },
  {
    href: '/architecture/system-design/',
    title: 'Read the architecture',
    description: 'See the transport-first layering, worker boundaries, maintenance mode, and the separation between protocol, runtime, and storage.',
    icon: LuBoxes,
  },
];

export const currentState = [
  'Rust key/value engine with a string-to-string model and HA-aware leader/follower replication',
  'Transport v2 with required startup negotiation and UUID request IDs',
  'Tokio multi-client server with auth, RBAC, maintenance mode, default-on compression, and quorum-backed writes by default',
  'Segmented encrypted WAL plus encrypted snapshots, storage keyring management, and offline PITR-oriented restore',
  'OTel-aligned metrics with Prometheus text export over the database protocol',
  `Official TypeScript SDK for Node.js applications via @vaylix/client ${latestSdkVersion}`,
  `Latest server release line: ${latestServerVersion}`,
];

export const boundaries = [
  'HA is single-region primary/replica; sharding and distributed ACID are not implemented',
  'Transactions are atomic on one leader, not MVCC or distributed ACID',
  'TLS and mTLS are available but still opt-in at deployment time',
  'The docs must track the current implementation, not aspirational behavior',
];

export const quickStart = `docker pull ${latestServerImage}

docker run --rm \\
  -p 9173:9173 \\
  -v vaylix-data:/var/lib/vaylix \\
  -e VAYLIX_USER=${latestDockerUser} \\
  -e VAYLIX_PASSWORD=${latestDockerPassword} \\
  ${latestServerImage}

./vaylix-client \\
  --url 'vaylix://${latestDockerUser}:${latestDockerPassword}@127.0.0.1:9173?output=table'

vaylix> ping
PONG
vaylix> set app:mode production
OK
vaylix> metrics prom
# HELP vaylix_server_request_count ...`;
