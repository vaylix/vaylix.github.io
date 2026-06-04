# Vaylix Stability Policy

This site publishes Vaylix stability and compatibility expectations for operators and integrators.

## Storage Format Policy

- WAL, snapshot, manifest, and backup behavior are durability-critical interfaces.
- Storage format changes must be documented explicitly in release notes.
- Corruption or continuity mismatch fails closed.

## Protocol Compatibility Policy

- VTP is versioned explicitly.
- Startup negotiation is the compatibility boundary.
- Incompatible payload or opcode changes require an explicit protocol decision.

## Versioning Guarantees

- Release notes are the source of truth for compatibility-impacting behavior.
- Claimed guarantees must already be implemented and tested.
- Unsupported behavior is not implied support.
