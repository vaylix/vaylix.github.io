---
title: Project Context
description: Maintained non-sensitive engineering context for the Vaylix project and its current implementation.
---

This page is the maintained non-sensitive project context for humans and AI agents working in the Vaylix repository. Any change to protocol behavior, CLI semantics, persistence format, authentication, TLS, workflows, or operational defaults should update this page in the same change.

## Project Summary

Vaylix is a Rust database workspace centered on a transport-first architecture:

`client -> transport -> TCP/TLS -> transport -> server -> engine`

The current implementation is a single-node, string-to-string key/value database with:

- a custom framed binary protocol v2 with startup capability negotiation
- a shared transport crate used by both client and server
- a Tokio multi-client server
- authenticated client connections with in-server RBAC
- optional TLS and mTLS client/server transport
- segmented encrypted-at-rest WAL and encrypted snapshots
- offline PITR-oriented storage inspection, migration, verification, and restore subcommands
- append-only audit logging
- default-on negotiated outbound frame-level zstd compression
- deterministic command parsing and explicit error codes
- protocol-level OTel-aligned metrics with Prometheus text export through `METRICS PROM`

## Current Data Model

- user-visible model: `String -> String`
- in-memory map: `BTreeMap<String, String>`
- expirations: per-key absolute timestamps in milliseconds

Supported command families:

- auth and ping
- string reads and writes
- numeric operations
- TTL commands
- rename and scan
- info and metrics
- logical backup/restore
- maintenance mode
- user/role/permission management
- transaction controls

## Transaction and ACID Status

Current state:

- writes are durable through WAL + snapshot
- command execution within the engine is serialized through a dedicated engine worker
- session transactions are queued with `MULTI` / `EXEC` / `DISCARD`
- `EXEC` commits as one atomic WAL-backed batch on a single node
- transactions are bounded by a server-side lifetime limit

Not yet true:

- MVCC
- distributed transactions
- formal isolation levels
- replication-aware commit coordination

Do not describe the current implementation as full ACID.

## Transport Protocol

- protocol magic: `VTP2`
- protocol version: `2`
- required startup negotiation before command frames
- UUID request IDs
- optional request metadata for deadlines, trace IDs, and sequence numbers
- structured error payloads with stable codes and names

Current negotiated capabilities:

- `zstd`
- `request_deadline`
- `server_metrics`
- `pipelining`
- `trace_context`

`0.2.x` intentionally rejects pre-v2 frames. `0.1.0` and `0.2.0` are not wire-compatible.

## TLS

TLS is supported but disabled by default.

Server inputs:

- `--ssl`
- `--tls-cert`
- `--tls-key`
- `--tls-client-ca`

Client inputs:

- `--ssl`
- `--tls-ca-cert`
- `--tls-client-cert`
- `--tls-client-key`

mTLS is additive to username/password auth. On Unix, the server reloads the configured TLS material on `SIGHUP`.

## Authentication and RBAC

Authentication is enabled by default.

Development defaults:

- username: `vaylix`
- password: `vaylix`

`--disable-auth` is for trusted local testing only. When auth is disabled, commands execute without `AUTH` and RBAC is bypassed.

Current password policy:

- at least 12 characters
- at least one ASCII letter
- at least one ASCII digit

Current permission set:

- `read`
- `write`
- `admin`
- `backup`
- `restore`
- `metrics`
- `snapshot`
- `clear`
- `user_admin`
- `role_admin`

Permission grants are pattern-scoped over keys. The `admin` permission bypasses pattern checks.

## Persistence

Durability model:

- encrypted snapshot
- segmented WAL replay on startup
- manifest metadata for snapshot state
- storage format version `3`

Snapshot flow:

1. purge expired keys
2. seal the active WAL segment
3. serialize and encrypt snapshot state
4. write the snapshot
5. write the manifest
6. create a new active segment
7. prune sealed segments older than retention

Recovery flow:

1. load keyring
2. verify and load manifest
3. decrypt and deserialize snapshot
4. replay and verify retained WAL segments in order

Offline storage tooling:

- `vaylix storage migrate --data-dir <dir>`
- `vaylix storage verify --data-dir <dir>`
- `vaylix pitr inspect --data-dir <dir>`
- `vaylix pitr restore --source-dir <dir> --target-dir <dir> (--to-sequence <u64> | --to-timestamp-ms <u64>)`

## Logical Backup and Restore

Current logical backup commands:

- `BACKUP`
- `BACKUP TO <path>`
- `BACKUP VERIFY <logical-dump-json>`
- `BACKUP VERIFY FROM <path>`
- `RESTORE <logical-dump-json>`
- `RESTORE FROM <path>`
- `RESTORE CHECK <logical-dump-json>`
- `RESTORE CHECK FROM <path>`

Backups are JSON-based logical dumps. `backup to <path>` writes a sidecar `<path>.manifest.json` with a SHA-256 digest and dump metadata.

## Audit Logging

Audit logging is append-only JSONL under the data directory by default.

Current events record:

- audit sequence
- previous hash
- event hash
- timestamp
- connection ID
- peer
- authenticated username
- request ID
- opcode
- response status
- error code when present
- latency
- semantic event type
- sanitized details

The log is SHA-256 hash chained and verified on startup.

## Metrics and INFO

`INFO` returns deterministic section-prefixed key/value fields.

Current sections:

- `server.*`
- `transport.*`
- `storage.*`
- `persistence.*`
- `security.*`
- `runtime.*`
- `metrics.*`

`METRICS` returns OTel-aligned dotted metric names under `vaylix.*`.

`METRICS PROM` returns the same contract translated into Prometheus-safe underscore names, for example:

- `vaylix.server.request.count`
- `vaylix_server_request_count`

## Packaging and Runtime

Default container/server data directory:

- `/var/lib/vaylix`

Current server runtime settings are also exposed through `VAYLIX_*` environment variables for container use, including bind/port, data directory, backup directory, TLS settings, WAL retention, snapshot intervals, auth controls, limits, and rate limiting.

## Current Gaps

- no replication
- no sharding
- no distributed ACID semantics
- no MVCC
- no TLS certificate automation or rotation workflow
- TLS is opt-in rather than mandatory

## Guidance

- keep transport concerns out of the engine
- keep docs honest about current capability versus roadmap
- do not reintroduce a user-facing raw data-key argument
- prefer UUID-based request tracking consistently
- add tests for any protocol, persistence, auth, TLS, or workflow change
