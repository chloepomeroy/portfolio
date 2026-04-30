# System Architecture

> **NATO TIDE Hackathon 2026** — Canadian Army Team
> **Stack**: Python 3.11 / FastAPI / LangGraph / Neo4j / React / Azure OpenAI

---

## Table of Contents

1. [System Overview](#system-overview)
2. [Service Architecture](#service-architecture)
3. [LangGraph Pipeline](#langgraph-pipeline)
4. [Neo4j Graph Schema](#neo4j-graph-schema)
5. [Design Decisions](#design-decisions)
6. [Extending the System](#extending-the-system)
7. [Data Flow Example](#data-flow-example)
8. [Mermaid Diagrams](#mermaid-diagrams)

---

## System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│ Feed Sources                                                        │
│ ┌──────┐  ┌──────────────┐  ┌─────────────────┐                   │
│ │ MISP │  │ Mock Services │  │ Mock Services   │                   │
│ │:7001 │  │ :8004/sentinel│  │ :8004/certis    │                   │
│ └──┬───┘  └──────┬───────┘  └────────┬────────┘                   │
└────┼─────────────┼───────────────────┼──────────────────────────────┘
     │             │                   │
     ▼             ▼                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Orchestrator Service :8002                                          │
│ Plugin system: enable/disable/create feeds via REST API             │
│ SHA-256 dedup: only new/changed events enter pipeline               │
│ SQLite state store: persists dedup hashes + activity log            │
└──────────────────────────┬──────────────────────────────────────────┘
                           │ POST /pipeline/process
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Agents Service :8003 — LangGraph StateGraph                         │
│                                                                     │
│ intake → [misp | sentinel | certis] (parallel) → triage            │
│       → [matching | remediation] (parallel) → END                  │
│                                                                     │
│ • 3 source nodes run CONCURRENTLY via Send()                       │
│ • Triage: weighted confidence aggregation                          │
│ • Matching: Azure OpenAI structured output + analyst assignment    │
│ • Remediation: Azure OpenAI action generation + mock execution     │
│ • All nodes read/write Neo4j                                       │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│ Neo4j :7687                                                         │
│ Incidents, Entities, Events, SentinelIncidents, CertISReports,     │
│ AttackStages (13 MITRE ATT&CK), Users, Teams                      │
└──────────────────────────┬──────────────────────────────────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
┌──────────────────┐ ┌──────────┐ ┌──────────────┐
│ Core API :8000   │ │ Frontend │ │ Socket :3001 │
│ Chat AI, DB      │ │ :5173    │ │ Real-time    │
│ routes, graph    │ │ React+MUI│ │ Socket.IO    │
│ proxy, MISP CRUD │ │          │ │              │
└──────────────────┘ └──────────┘ └──────────────┘
```

---

## Service Architecture

### Agents Service (Port 8003) — The Heart

**Technology**: Python FastAPI + LangGraph + Neo4j async driver + Azure OpenAI

This service owns the AI pipeline. It compiles a LangGraph `StateGraph` at startup and exposes it via `POST /pipeline/process`.

**Key files**:

- `graph.py` — StateGraph definition, `Send()` fan-out wiring, conditional edges
- `intake_node.py` — Source classification + indicator extraction
- `misp_node.py`, `sentinel_node.py`, `certis_node.py` — Source enrichment (dual-mode: primary vs contextual)
- `triage_node.py` — Weighted confidence aggregation (pure algorithmic, no LLM)
- `matching_node.py` — LLM analyst assignment with algorithmic fallback
- `remediation_node.py` — LLM remediation action generation with mock execution layer
- `neo4j_client.py` — Async Neo4j singleton driver
- `models.py` — Pydantic models for state + outputs

> **Note**: Analyst profiles are fetched from MySQL via the `DB_SERVICE_URL` (`/users` endpoint on core-api) at runtime — there is no static `analysts.json` file.

### Core API (Port 8000) — Unified API Gateway

**Technology**: Python FastAPI + Azure OpenAI SDK + httpx + aiomysql

This service consolidated the formerly separate `db-service` and `langgraph-service` stubs.

- **AI Chat**: `POST /chat` — `@Sentry` command triggers Azure OpenAI (gpt-4.1) with full Neo4j incident context. Supports commands: summarize, find similar, recommend remediation, change severity, close incident. Streams responses via SSE.
- **Graph proxy**: `GET /incidents/{id}/graph` — Proxies to agents-service
- **DB routes**: Incident + user CRUD via MySQL (upsert incidents, list/assign users)
- **Invoke stub**: `POST /invoke` — Legacy placeholder (returns `{"status": "pending"}`)

### Orchestrator Service (Port 8002) — Feed Management

**Technology**: Python FastAPI + SQLite

Plugin-based architecture with three built-in plugin types: `misp`, `sentinel`, `certis`. Each plugin:

1. Polls its feed source at configurable intervals
2. Deduplicates events using SHA-256 hash of attributes
3. Routes new/changed events to agents-service `POST /pipeline/process`
4. Logs activity for the frontend activity feed

**State persistence**: SQLite database (Docker volume mounted) stores processed event hashes, activity log entries, and plugin configurations.

### Mock Services (Port 8004) — Combined Feed Mocks

**Technology**: Python FastAPI

A single container that serves all three mock feed APIs:

- **Sentinel mock**: Generates fake security incidents every 3–8s with randomized titles, severities, MITRE tactics, and entities
- **CERT-IS mock**: Generates fake phishing/malware/advisory reports every 5–15s
- **MISP mock**: Serves mock MISP events with attributes and galaxies

All endpoints are prefixed: `/sentinel/...`, `/certis/...`, `/misp/...`

> **Note**: The legacy standalone `services/sentinel-mock/` and `services/cert-is-mock/` directories have been removed. The combined `services/mock-services/` container replaced them.

### Socket Service (Port 3001) — Real-time

**Technology**: Node.js + Socket.IO

Per-incident chat rooms with message history, typing indicators, participant tracking. Events: `join`, `message`, `typing`, `leave`.

### Frontend (Port 5173)

**Technology**: React 18 + TypeScript + Vite + MUI + Zustand + Socket.IO client

- **Orchestrator page**: Plugin management UI — create/enable/disable feeds, activity feed, incident list
- **Chat page**: Per-incident chat rooms with `@Sentry` AI assistant, markdown rendering
- **Auth**: Client-side only (Zustand + localStorage), mock users, no backend auth service

---

## LangGraph Pipeline

### Graph Topology

```mermaid
flowchart TD
    START([Start]) --> INTAKE[Intake Node]

    subgraph SOURCES[Parallel Source Nodes]
        direction LR
        MISP_NODE[MISP Node]
        SENTINEL_NODE[Sentinel Node]
        CERTIS_NODE[CERT-IS Node]
        MORE_SOURCE["Other Sources
         (SIEM, EDR, etc.)"]
    end

    INTAKE --> MISP_NODE
    INTAKE --> SENTINEL_NODE
    INTAKE --> CERTIS_NODE
    INTAKE --> MORE_SOURCE

    MISP_NODE --> TRIAGE[Triage Node]
    SENTINEL_NODE --> TRIAGE
    CERTIS_NODE --> TRIAGE
    MORE_SOURCE --> TRIAGE

    subgraph POST_TRIAGE[Parallel Post-Triage]
        direction LR
        MATCHING[Matching Node]
        REMEDIATION[Remediation Node]
    end

    TRIAGE --> MATCHING
    TRIAGE --> REMEDIATION

    MATCHING --> END([End])
    REMEDIATION --> END

    %% Style the "Additional Source" as a dashed, lighter placeholder
    classDef future stroke-dasharray: 5 5,fill:#ffffff,color:#555;
    class MORE_SOURCE future;
```

7 nodes registered: `intake`, `misp_node`, `sentinel_node`, `certis_node`, `triage_node`, `matching_node`, `remediation_node`. Fan-out uses LangGraph's `Send()` API for parallel execution at two stages: after intake (3 source nodes) and after triage (matching + remediation).

### Why Parallel Fan-Out?

Each source node is independent — MISP enrichment doesn't need Sentinel results, and vice versa. Running them in parallel:

1. **Reduces latency** — 3 Neo4j query batches run concurrently
2. **Enables cross-source correlation** — each node checks Neo4j for entities from OTHER sources
3. **Graceful degradation** — if one source node fails, the others still provide data for triage

### Dual-Mode Source Nodes

Each source node (MISP, Sentinel, CERT-IS) operates in two modes:

- **Primary** (this event IS from this source): Creates nodes in Neo4j, extracts full context
- **Contextual** (this event is from ANOTHER source): Read-only Neo4j lookup for cross-source matches

### Triage: Weighted Confidence

```
combined_confidence = (primary_weight × primary_confidence) +
                      Σ(secondary_weight × secondary_confidence)

Where:
  primary_weight = 0.6
  secondary_weight = 0.2 (each, redistributed if zero)
  threshold = 0.45 → is_incident
```

Triage is **pure algorithmic** — no LLM calls.

### Matching: LLM + Fallback

1. Map incident attributes to required skills (28+ category mappings, 14 MITRE tactic mappings)
2. Fetch analyst profiles from MySQL via `DB_SERVICE_URL`
3. Call Azure OpenAI (model from `OPENAI_MODEL` env, default `gpt-4.1`) with structured output (`AnalystSelection` Pydantic model)
4. If LLM fails → algorithmic fallback scoring analysts by skill overlap + interest + severity preference

### Remediation: LLM Action Generation + Mock Execution

Runs **in parallel with matching** after triage (second `Send()` fan-out).

1. Collects full incident context: indicators, affected entities, MITRE tactics, MISP/Sentinel/CERT-IS reasoning, Neo4j knowledge graph, linked MISP events
2. Calls Azure OpenAI (`gpt-4.1`) with structured output (`RemediationPlanLLM` Pydantic model) to produce 2–8 concrete actions
3. Each action targets a specific IOC (IP, domain, hash, hostname, etc.) with effectiveness and safety scores
4. Mock-executes each action via a dispatch table of 15 async executor functions (one per action type)
5. Persists remediation actions to MySQL for the frontend

**Action types** (15): `block_ip`, `block_domain`, `block_url`, `block_email_sender`, `add_firewall_rule`, `isolate_host`, `disable_account`, `revoke_sessions`, `quarantine_file`, `force_password_reset`, `enable_mfa`, `block_process`, `rate_limit_ip`, `null_route_ip`, `sinkhole_domain`

**Confidence scoring**: `confidence = 0.5 × effectiveness + 0.5 × safety` per action.

The execution layer is **mocked** — each executor logs what it would do and returns a synthetic result. Replace the mock body with real API calls (firewall, AD, EDR, etc.) to go live.

See [agent.md](agent.md) for detailed node contracts.

---

## Neo4j Graph Schema

### Node Types

| Label               | Key Properties                                                    | Created By                          |
| ------------------- | ----------------------------------------------------------------- | ----------------------------------- |
| `:Incident`         | id, title, severity, confidence, source_type, assigned_to, status | matching_node / remediation_node    |
| `:Event`            | source_event_id, title, threat_level, attributes                  | misp_node (primary)                 |
| `:Entity`           | value, type (IP/Domain/Hash/URL/Email)                            | all source nodes                    |
| `:SentinelIncident` | incident_id, title, severity, tactics                             | sentinel_node (primary)             |
| `:CertISReport`     | report_id, title, category, severity                              | certis_node (primary)               |
| `:AttackStage`      | name, order                                                       | neo4j-init.cypher (13 MITRE stages) |
| `:User`             | id, username, role                                                | neo4j-init.cypher                   |
| `:Team`             | id, name                                                          | neo4j-init.cypher                   |
| `:IncidentSnapshot` | workflow_step                                                     | pipeline audit trail                |

### Relationships

```cypher
// Source event → Entity links
(:Event)-[:INVOLVES_ENTITY]->(:Entity)
(:Event)-[:PART_OF_STAGE]->(:AttackStage)
(:SentinelIncident)-[:HAS_ENTITY]->(:Entity)
(:SentinelIncident)-[:AT_STAGE]->(:AttackStage)
(:CertISReport)-[:HAS_ENTITY]->(:Entity)
(:CertISReport)-[:AT_STAGE]->(:AttackStage)

// Incident links (copied from source events by matching_node)
(:Incident)-[:HAS_ENTITY]->(:Entity)
(:Incident)-[:AT_STAGE]->(:AttackStage)

// MITRE ATT&CK chain
(:AttackStage)-[:PRECEDES]->(:AttackStage)
// Reconnaissance → Resource Development → ... → Impact
```

> **Note**: The matching_node copies `:INVOLVES_ENTITY` edges from source events as `:HAS_ENTITY` on the Incident, and `:PART_OF_STAGE` edges as `:AT_STAGE` on the Incident. This means similarity queries on incidents use `:HAS_ENTITY` and `:AT_STAGE`.

### Indexes & Constraints

Unique constraints on `.id` for: `Incident`, `Entity`, `Event`, `User`, `Team`, `AttackStage`, `SentinelIncident`, `CertISReport`. Additional indexes on `Entity.type`, `Entity.value`, `Event.timestamp`, `AttackStage.order`, `IncidentSnapshot.workflow_step`, `SentinelIncident.severity`, `CertISReport.category`.

Schema initialized by: `helm/neo4j/files/neo4j-init.cypher`

### Useful Queries

```cypher
-- Cross-source correlation: entities in multiple source types
MATCH (e:Entity)<-[:INVOLVES_ENTITY|HAS_ENTITY]-(source)
WITH e, collect(DISTINCT labels(source)[0]) AS sources, count(source) AS hits
WHERE size(sources) > 1
RETURN e.value, e.type, sources, hits ORDER BY hits DESC

-- Incident with full context
MATCH (i:Incident {id: $id})
OPTIONAL MATCH (i)-[:HAS_ENTITY]->(e:Entity)
OPTIONAL MATCH (i)-[:AT_STAGE]->(s:AttackStage)
RETURN i, collect(DISTINCT e) AS entities, collect(DISTINCT s) AS stages

-- MITRE ATT&CK coverage
MATCH (s:AttackStage)
OPTIONAL MATCH (i:Incident)-[:AT_STAGE]->(s)
RETURN s.name, s.order, count(i) AS incidents ORDER BY s.order

-- Blast radius from indicator
MATCH (e:Entity {value: $indicator})<-[*1..2]-(connected)
RETURN e, connected
```

---

## Design Decisions

| Decision                              | Why                                                     | Trade-off                                      |
| ------------------------------------- | ------------------------------------------------------- | ---------------------------------------------- |
| **Parallel fan-out** (not sequential) | Cross-source correlation + lower latency                | More complex state aggregation in triage       |
| **Dual-mode source nodes**            | Every event gets checked against ALL sources            | Each node does both read and write to Neo4j    |
| **Azure OpenAI for matching**         | Considers growth opportunities, not just skills         | Cost per incident, requires API key            |
| **Algorithmic fallback**              | Pipeline works without Azure OpenAI                     | Less nuanced assignment                        |
| **Azure OpenAI for remediation**      | Context-aware per-incident action list                  | Cost per incident, requires API key            |
| **Mock execution layer**              | Demonstrates AI-driven response without live connectors | No real containment until connectors replaced  |
| **Parallel matching + remediation**   | Both complete in same wall-clock time as either alone   | Slightly higher concurrent OpenAI usage        |
| **SQLite for orchestrator state**     | Zero-config, survives restarts                          | Not distributed (single orchestrator instance) |
| **No backend auth**                   | Faster MVP development                                  | Not production-ready                           |
| **Socket.IO in Node.js**              | Best Socket.IO ecosystem                                | One non-Python service                         |
| **Combined mock-services**            | Single container for all mock feeds                     | Coupled mock lifecycle                         |
| **Core API absorbs db + langgraph**   | Fewer containers, simpler networking                    | Larger single service                          |
| **MySQL for incidents + users**       | Analyst profiles need relational queries                | Two databases (MySQL + Neo4j)                  |

---

## Extending the System

### Adding a New Feed Source

1. **Add mock endpoint** (optional): Add routes to `services/mock-services/main.py`
2. **Create orchestrator plugin**: `services/orchestrator-service/plugins/new_source_plugin.py` — extend `PluginBase`
3. **Create pipeline source node**: `services/agents-service/new_source_node.py` — dual-mode (primary + contextual)
4. **Wire into graph**: Add node to `graph.py`, add `Send()` in intake fan-out, add edge to triage
5. **Update intake_node**: Add source classification + indicator extraction logic
6. **Update Neo4j schema**: Add new node label + relationships in `neo4j-init.cypher`

### Adding a Chat Command

In `services/core-api/main.py`, add to the `@Sentry` command handler:

```python
if "your_command" in message.lower():
    # Query Neo4j or call agents-service
    # Stream response via SSE
```

---

## Data Flow Example

**Event**: Sentinel Mock generates a "Suspicious PowerShell Execution" alert with IP 10.0.0.5 and tactic "Execution"

1. **Orchestrator** polls `mock-services:8004/sentinel` → dedup check (new event) → `POST /pipeline/process`
2. **Intake** classifies as `sentinel` source, extracts indicators: `["10.0.0.5"]`
3. **Parallel fan-out**:
   - **Sentinel node** (PRIMARY): Creates `:SentinelIncident` in Neo4j, merges `(:Entity {value: "10.0.0.5"})`, maps "Execution" tactic to `:AttackStage`, queries for cross-source matches → confidence 0.7
   - **MISP node** (CONTEXTUAL): Searches Neo4j for MISP events involving 10.0.0.5 → finds WannaCry event → confidence 0.4
   - **CERT-IS node** (CONTEXTUAL): Searches Neo4j for CERT-IS reports involving 10.0.0.5 → no matches → confidence 0.0
4. **Triage**: Primary (sentinel) 0.7 × 0.6 = 0.42 + Secondary (misp) 0.4 × 0.4 = 0.16 (cert-is zero, redistributed) = **0.58 > 0.45** → is_incident = True, severity = "high"
5. **Matching** (parallel): Required skills: `["powershell_analysis", "execution_tactics"]`. Fetches analyst profiles from MySQL. Azure OpenAI selects analyst Sarah Chen (skills match + expressed interest in lateral movement). Creates `:Incident` in Neo4j linked to entities + stages.
6. **Remediation** (parallel with matching): Azure OpenAI analyses the incident context and recommends: block IP 10.0.0.5 (effectiveness 0.85, safety 0.9), isolate affected host (effectiveness 0.9, safety 0.6). Mock-executes each action and persists results to MySQL.

---

## Mermaid Diagrams

### Diagram 1: Full Incident Processing Flow

```mermaid
flowchart TD
    %% ── Feed Sources ──────────────────────────────────────────────
    subgraph Feeds["🌐 Feed Sources"]
        direction LR
        MISP(["🔒 MISP\n:7001"])
        SENT(["🛡️ Sentinel Mock\n:8004/sentinel"])
        CERT(["📋 CERT-IS Mock\n:8004/certis"])
    end

    %% ── Orchestrator ──────────────────────────────────────────────
    subgraph Orch["⚙️ Orchestrator Service · :8002"]
        direction TB
        PLUG["🔌 Plugin System\nMISP │ Sentinel │ CERT-IS"]
        DEDUP{"🔑 SHA-256\nDedup"}
        SKIP(["⏭️ Skip\nalready processed"]):::muted
        QUEUE["📤 Route to Pipeline"]
    end

    %% ── LangGraph Pipeline ───────────────────────────────────────
    subgraph Pipeline["🤖 Agents Service · :8003 — LangGraph StateGraph"]
        direction TB
        INTAKE["📥 **INTAKE**\nClassify source\nExtract indicators\n_IPs · domains · hashes · URLs_"]

        subgraph FanOut["⚡ Parallel Fan-Out · Send()"]
            direction LR
            MISP_N["🔒 **MISP NODE**\n_Primary:_ Create :Event + :Entity\nGalaxy → :AttackStage\n_Contextual:_ Read-only lookup"]
            SENT_N["🛡️ **SENTINEL NODE**\n_Primary:_ Create :SentinelIncident\nMITRE tactic → :AttackStage\n_Contextual:_ Read-only lookup"]
            CERT_N["📋 **CERT-IS NODE**\n_Primary:_ Create :CertISReport\nCategory inference\n_Contextual:_ Read-only lookup"]
        end

        TRIAGE["⚖️ **TRIAGE**\nWeighted confidence aggregation\n_Primary 0.6 · Secondary 0.2 each_\nThreshold ≥ 0.45 → incident"]

        TRIAGE_END(["🚫 Discard\nnot an incident"]):::muted

        subgraph PostTriage["⚡ Parallel Post-Triage · Send()"]
            direction LR
            MATCH["🎯 **MATCHING**\nAzure OpenAI structured output\nSkill + interest scoring\n_Algorithmic fallback_"]
            REMED["🛠️ **REMEDIATION**\nAzure OpenAI action generation\n15 action types · mock execution\n_Effectiveness + safety scoring_"]
        end
    end

    %% ── Neo4j ─────────────────────────────────────────────────────
    subgraph Neo4j["🗄️ Neo4j · :7687"]
        direction LR
        INC[("🔴 :Incident\nseverity · confidence\nassigned_to")]
        ENT[("🟢 :Entity\nIP · Domain · Hash")]
        STAGE[("🟡 :AttackStage\n13 MITRE ATT&CK")]
        SRC_NODES[("🔵 Source Nodes\n:Event · :SentinelIncident\n:CertISReport")]
    end

    %% ── Frontend ──────────────────────────────────────────────────
    subgraph UI["🖥️ Frontend · :5173  +  Core API · :8000"]
        direction LR
        DASH["📊 Orchestrator Dashboard\nPlugin mgmt · Incident list"]
        CHAT["💬 Chat Rooms\nSocket.IO · @Sentry AI"]
    end

    %% ── Edges: Feed → Orchestrator ────────────────────────────────
    MISP --> PLUG
    SENT --> PLUG
    CERT --> PLUG
    PLUG --> DEDUP
    DEDUP -- "already seen" --> SKIP
    DEDUP -- "new / changed" --> QUEUE
    QUEUE -- "POST /pipeline/process" --> INTAKE

    %% ── Edges: Pipeline ───────────────────────────────────────────
    INTAKE --> MISP_N & SENT_N & CERT_N
    MISP_N & SENT_N & CERT_N --> TRIAGE

    TRIAGE -- "is_incident = true" --> MATCH & REMED
    TRIAGE -. "is_incident = false" .-> TRIAGE_END

    %% ── Edges: Neo4j writes ──────────────────────────────────────
    MISP_N & SENT_N & CERT_N -. "write" .-> SRC_NODES
    MISP_N & SENT_N & CERT_N -. "write" .-> ENT
    MATCH -- "create + link" --> INC
    MATCH -. "link" .-> ENT & STAGE
    REMED -- "persist actions" --> INC

    %% ── Edges: Output ─────────────────────────────────────────────
    INC --> DASH & CHAT

```

### Diagram 2: Service Interaction Flow

```mermaid
graph LR
    subgraph Sources["🔌 Feed Sources"]
        MockSvc["🎭 Mock Services<br/>:8004"]
        MISP["📋 MISP<br/>:7001"]
        MockSvc -->|Feed| MISP
    end

    subgraph Processing["⚙️ Processing Layer"]
        Orch["🔧 Orchestrator<br/>:8002<br/>Dedup + Plugins"]
        Agents["🧠 Agents<br/>:8003<br/>LangGraph Pipeline"]
        Orch -->|"POST /pipeline/process"| Agents
    end

    subgraph Data["💾 Data Stores"]
        Neo["📊 Neo4j<br/>:7687"]
        MySQL["🗄️ MySQL<br/>:3306"]
        Redis["📬 Redis<br/>:6379"]
    end

    subgraph AI["🤖 AI Services"]
        AzureOAI["🧠 Azure OpenAI<br/>GPT-4.1"]
    end

    subgraph Client["🖥️ Client Layer"]
        CoreAPI["🌐 Core API<br/>:8000"]
        Socket["⚡ Socket.IO<br/>:3001"]
        Frontend["💻 Frontend<br/>:5173"]
        Frontend -->|"REST API"| CoreAPI
        Frontend -->|"WebSocket"| Socket
    end

    %% Cross-group edges
    MISP -->|Feed| Orch
    MockSvc -->|Feed| Orch
    MISP -->|Cache| Redis
    Agents -->|Read/Write| Neo
    Agents -->|Read/Write| MySQL
    Agents -->|"LLM Calls"| AzureOAI
    CoreAPI -->|"LLM Calls"| AzureOAI
    Agents -->|HTTP| CoreAPI
    CoreAPI -->|Query| Neo
    CoreAPI -->|Query| MySQL
    Orch -->|Events| Socket
    Frontend -->|"WebSocket"| Orch

```

### Diagram 2: Incident Processing Pipeline

```mermaid
graph LR
    Event["🔔 New Event<br/>From Feed"]
    Dedup{"Already<br/>Seen?"}
    Skip["⏭️ Skip"]
    Intake["📥 Intake<br/>Classify source"]
    Parallel["⚡ Extract Entities<br/>Each Plugin Type in parallel"]
    Triage["⚖️ Triage<br/>Score confidence"]
    Decision{"Incident?"}
    Discard["🗑️ Discard"]
    Match["👤 Assign Analyst"]
    Remed["🛡️ Generate Actions"]
    Store["💾 Save Incident"]

    Event --> Dedup
    Dedup -->|"Yes"| Skip
    Dedup -->|"No"| Intake
    Intake --> Parallel
    Parallel --> Triage
    Triage --> Decision
    Decision -->|"No"| Discard
    Decision -->|"Yes"| Match
    Decision -->|"Yes"| Remed
    Match --> Store
    Remed --> Store
```

These are **Mermaid.js** diagrams rendered in GitHub markdown, VS Code, GitLab, Notion, and Confluence.
