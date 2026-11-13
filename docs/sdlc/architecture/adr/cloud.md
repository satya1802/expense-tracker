<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-11-13

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Google Cloud
- Azure

## Decision Outcome

Chosen option: AWS, because Hosts the SPA (S3 + CloudFront), the API (Fargate/App Runner), managed PostgreSQL (RDS) and the scheduled budget check (EventBridge) in one account with encryption at rest and TLS in transit for the privacy requirements.

## Consequences

Multiple managed services to wire up; single-account convenience is balanced against AWS-specific configuration overhead for a small app.
<!-- sdlc:auto:end adr -->