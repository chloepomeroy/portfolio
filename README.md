# AI Cybersecurity Incident Coordination Platform

> **NATO TIDE Hackathon 2026** — Canadian Army Team
> **Stack**: Python / FastAPI / LangGraph / Neo4j / React / Azure OpenAI / Socket.IO

---

## The Problem

Thousands of security events are seen every day from disconnected sources — threat intelligence feeds, cloud security alerts, and national advisory reports. Analysts are overwhelmed: poring through logs trying to find information about the threat, manually making connections between different systems. Assignment is manual, coordination is ad-hoc, and critical threats risk slipping through the cracks.

## Our Solution

This platform acts as an **AI-assisted multi-source incident coordination platform** that brings all cybersecurity event sources together in one place, enables team collaboration, and uses AI to do the heavy lifting:

- **Automatic collection** — Security events flow in continuously from multiple sources (MISP threat intelligence, Microsoft Sentinel alerts, and CERT-IS national advisories) through a plug-and-play feed system. The system is modular and new data source plugins can easily be added
- **Cross-source correlation** — The AI pipeline connects related events across sources, so a MISP indicator, a Sentinel alert, and a CERT-IS advisory about the same threat are linked into a single incident view.
- **Smart triage** — Each incident is automatically scored for severity using evidence from all sources, so the most dangerous threats surface first.
- **AI-powered analyst assignment** — The system recommends the best analyst for each incident based on their skills, availability, experience, and development goals.
- **Remediation recommendations** — For every incident, the AI suggests concrete response actions (e.g. block an IP, isolate a host, quarantine a file) ranked by effectiveness and safety and implements them through plugins with security services.
- **Real-time team chat** — Analysts collaborate in incident-specific chat rooms with an AI assistant (`@Sentry`) that can summarize incidents, suggest next steps, and answer questions using full incident context.

**Humans stay in control** — the system recommends, but only auto-executes when confidence is above a specific, customizable, threshold. Every AI decision is explainable with confidence scores and clear reasoning.

## How It Works — At a Glance

```
  Security Feeds (MISP, Sentinel, CERT-IS)
                  │
                  ▼
       ┌─────────────────────┐
       │  Feed Orchestrator  │  Collects & deduplicates events
       └──────────┬──────────┘
                  ▼
       ┌─────────────────────┐
       │    AI Pipeline      │  Correlates, triages, assigns,
       │                     │  and recommends actions
       └──────────┬──────────┘
                  ▼
       ┌─────────────────────┐
       │   Dashboard & Chat  │  Analysts review, collaborate,
       │                     │  and take action
       └─────────────────────┘
```

---

## Technical Overview

This is a modular system that:

1. **Ingests** security events from MISP, Microsoft Sentinel, and CERT-IS via a plugin-based orchestrator
2. **Correlates** across sources using a LangGraph parallel pipeline with Neo4j graph analysis
3. **Triages** incidents using weighted confidence aggregation from all sources
4. **Assigns** analysts using Azure OpenAI structured output (skill + interest matching)
5. **Recommends remediation** actions using Azure OpenAI with mock execution (block IP, isolate host, quarantine file, etc.)
6. **Enables** real-time team collaboration via Socket.IO chat with an AI assistant (`@Sentry`)

Human remains in control — system recommends, never auto-executes. All decisions are explainable with confidence scores and reasoning trails.

---

## Quick Start

### Prerequisites

- **Docker** (for building images)
- **kubectl** (configured and authenticated to your Kubernetes cluster)
- **Helm 3**
- **Azure Container Registry** (for image storage)
- **Azure OpenAI credentials** (for AI features)

For local development with Docker Compose, only Docker & Docker Compose are needed.

### Start Everything

**Local (Docker Compose):**

```bash
cp .env.example .env       # Edit with Azure OpenAI keys + Neo4j password
docker compose up -d       # Start all services locally
```

**Kubernetes:**

```bash
cp .env.example .env       # Edit with Azure OpenAI keys
make deploy ACR=<acr-name> # Build, push, and deploy to K8s
```

### Verify Services

| Service       | URL                           | Description                                   |
| ------------- | ----------------------------- | --------------------------------------------- |
| Frontend      | http://localhost:5173         | React dashboard with hot-reload               |
| Core API      | http://localhost:8000/health  | API gateway (chat AI, MISP CRUD, graph proxy) |
| Orchestrator  | http://localhost:8002/plugins | Plugin management + feed ingestion            |
| Agents        | http://localhost:8003/health  | LangGraph AI pipeline                         |
| Mock Services | http://localhost:8004/health  | Combined Sentinel + CERT-IS + MISP mock feeds |
| Socket        | http://localhost:3001         | Real-time chat (Socket.IO)                    |
| Neo4j Browser | http://localhost:7474         | Graph DB UI (`neo4j` / password from `.env`)  |
| MISP          | https://localhost:7001        | Threat intel (admin / password from `.env`)   |

### Common Commands

```bash
# Full pipeline
make deploy ACR=<acr> [TAG=latest] [NS=canadianarmy]   # Build + push + Helm deploy
make build-push ACR=<acr>                               # Build & push images only
make deploy-all ACR=<acr>                               # Helm deploy only (images already in ACR)
make deploy-service S=<name>                            # Build+push+restart a single service

# Operations
make status           # Show pods in the namespace
make logs S=<name>    # Tail logs for a service
make clean-and-seed   # Clean all data + reseed MISP
make clean-data       # Clean data without reseeding
make reseed           # Reseed MISP only
make trigger-seed     # Trigger MISP seed K8s job
make install          # pip install requirements for all services
make clean            # Remove Python caches
```

### Deploy to Azure AKS (One Command)

Build all images, push to Azure Container Registry, and deploy every Helm chart in a single command. Requires your `kubeconfig` to be set up and authenticated to the target Kubernetes cluster.

```bash
./scripts/build-push-deploy.sh <ACR_NAME> [TAG] [NAMESPACE]
```

Examples:

```bash
./scripts/build-push-deploy.sh myacr                       # tag=latest, ns=canadianarmy
./scripts/build-push-deploy.sh myacr v1.2.3                # custom tag
./scripts/build-push-deploy.sh myacr latest mynamespace    # custom namespace
```

Environment overrides:

| Variable      | Default        | Description                                |
| ------------- | -------------- | ------------------------------------------ |
| `REPO_PREFIX` | `canadianarmy` | Repository prefix in ACR                   |
| `SKIP_BUILD`  | —              | Set to `1` to skip build+push, only deploy |
| `SKIP_DEPLOY` | —              | Set to `1` to only build+push, skip deploy |

### Data Cleanup & Reseed

To reset all data and test the incident flow from scratch:

```bash
make clean-and-seed
```

This clears Neo4j incident data (preserves schema/attack stages), MISP events/attributes, and orchestrator cached incidents, then reseeds MISP with realistic threat intelligence events. Requires `neo4j`, `mysql-connector-python`, and `httpx` Python packages.

---

## Services

```
services/
├── core-api/              :8000  # API gateway (chat AI, MISP CRUD, graph proxy, DB routes)
├── agents-service/        :8003  # Core AI pipeline (LangGraph + Neo4j)
├── orchestrator-service/  :8002  # Plugin orchestrator (feed ingestion + dedup)
├── socket-service/        :3001  # Real-time collaboration (Node.js + Socket.IO)
└── mock-services/         :8004  # Combined Sentinel + CERT-IS + MISP mock feeds

frontend/                  :5173  # React + Vite + MUI + Zustand

Infrastructure:
├── neo4j                  :7474/7687  # Graph database
├── redis                  :6379       # Used by MISP
├── misp                   :7001       # Threat intel platform
└── misp-mysql                         # MISP backend DB
```

### Agents Service (Port 8003) — AI Pipeline

The heart of the system. Implements a **LangGraph StateGraph** with parallel fan-out:

```
intake → [misp_node | sentinel_node | certis_node] (parallel) → triage → [matching | remediation] (parallel) → END
```

| Endpoint                  | Method | Description                      |
| ------------------------- | ------ | -------------------------------- |
| `/pipeline/process`       | POST   | Run full AI pipeline on an event |
| `/incidents/{id}/graph`   | GET    | Neo4j subgraph (nodes + edges)   |
| `/incidents/{id}/similar` | GET    | Find similar incidents           |
| `/health`                 | GET    | Health check                     |

See [agent.md](agent.md) for full pipeline node contracts.

### Core API (Port 8000) — API Gateway

Unified service that absorbed the former `db-service` and `langgraph-service` stubs.

| Endpoint                      | Method | Description                                          |
| ----------------------------- | ------ | ---------------------------------------------------- |
| `/chat`                       | POST   | AI chat with `@Sentry` (Azure OpenAI, SSE streaming) |
| `/incidents/{id}/graph`       | GET    | Proxies to agents-service                            |
| `/incidents`                  | GET    | List incidents (MySQL)                               |
| `/incidents/{id}`             | GET    | Get incident (MySQL)                                 |
| `/incidents`                  | POST   | Upsert incident (MySQL)                              |
| `/users`                      | GET    | List users / analysts                                |
| `/users/{id}`                 | GET    | Get user                                             |
| `/users`                      | POST   | Upsert user                                          |
| `/users/{id}/assign-incident` | PATCH  | Assign incident to analyst                           |
| `/health`                     | GET    | Unified health check                                 |

### Orchestrator Service (Port 8002) — Feed Orchestrator

| Endpoint                  | Method | Description                   |
| ------------------------- | ------ | ----------------------------- |
| `/plugins`                | GET    | List all registered plugins   |
| `/plugins/types`          | GET    | Available plugin types        |
| `/plugins`                | POST   | Create new plugin instance    |
| `/plugins/{id}`           | GET    | Plugin details & stats        |
| `/plugins/{id}/toggle`    | POST   | Enable / disable plugin       |
| `/plugins/{id}/config`    | PATCH  | Update poll interval / config |
| `/plugins/{id}`           | DELETE | Remove plugin                 |
| `/incidents`              | GET    | List processed incidents      |
| `/incidents/{id}`         | GET    | Single incident details       |
| `/incidents/process/{id}` | POST   | Manual reprocessing           |
| `/activity`               | GET    | Activity log feed             |

Built-in plugin types: `misp`, `sentinel`, `certis`

### Mock Services (Port 8004) — Combined Feed Mocks

Single container serving all three mock feed APIs. Sentinel generates incidents every 3–8s, CERT-IS generates reports every 5–15s. The MISP mock generates events and pushes them directly to the real MISP instance.

| Endpoint                            | Method    | Description                     |
| ----------------------------------- | --------- | ------------------------------- |
| `/sentinel/incidents`               | GET       | List Sentinel incidents         |
| `/sentinel/incidents/{incident_id}` | GET       | Single Sentinel incident        |
| `/sentinel/reset`                   | POST      | Reset Sentinel data             |
| `/sentinel/health`                  | GET       | Sentinel health check           |
| `/sentinel/ws`                      | WebSocket | Real-time Sentinel feed         |
| `/certis/reports`                   | GET       | List CERT-IS reports            |
| `/certis/reports/{report_id}`       | GET       | Single CERT-IS report           |
| `/certis/reset`                     | POST      | Reset CERT-IS data              |
| `/certis/health`                    | GET       | CERT-IS health check            |
| `/certis/ws`                        | WebSocket | Real-time CERT-IS feed          |
| `/misp/events`                      | GET       | List events pushed to real MISP |
| `/misp/reset`                       | POST      | Clear local tracking list       |
| `/misp/health`                      | GET       | MISP mock health check          |
| `/misp/ws`                          | WebSocket | Real-time MISP event feed       |
| `/health`                           | GET       | Combined health check           |

### Socket Service (Port 3001) — Real-time Chat

| Event/Endpoint      | Description             |
| ------------------- | ----------------------- |
| `join`              | Join incident chat room |
| `message`           | Send message to room    |
| `typing`            | Typing indicator        |
| `leave`             | Leave room              |
| `GET /rooms/counts` | Message counts per room |
| `GET /health`       | Health check            |

---

## Frontend Pages

| Route                | Description                                                          |
| -------------------- | -------------------------------------------------------------------- |
| `/auth/login`        | Login (mock: admin@example.com/admin or analyst@example.com/analyst) |
| `/home`              | Dashboard                                                            |
| `/orchestrator`      | Plugin management — enable/disable feeds, view activity + incidents  |
| `/chat`, `/chat/:id` | Incident chat rooms with `@Sentry` AI assistant                      |
| `/profile`           | User profile                                                         |
| `/notifications`     | Notifications                                                        |

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your Azure OpenAI credentials. All other values have sensible defaults.

```bash
# MySQL
MYSQL_ROOT_PASSWORD=rootpassword
MYSQL_USER=misp
MYSQL_PASSWORD=misppassword

# Neo4j
NEO4J_PASSWORD=neo4jpassword

# Redis
REDIS_PASSWORD=redispassword

# Azure OpenAI (required for AI features)
AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com/
AZURE_OPENAI_KEY=your_key
AZURE_OPENAI_DEPLOYMENT=gpt-4.1
OPENAI_MODEL=gpt-4.1

# MISP Admin
MISP_ADMIN_EMAIL=admin@admin.test
MISP_ADMIN_PASSPHRASE=your_passphrase
```

> **Note**: Only `AZURE_OPENAI_KEY` and `AZURE_OPENAI_ENDPOINT` are required for AI features. Everything else has defaults in `docker-compose.yml` and Helm values.

---

## Tech Stack

| Layer          | Technology                                                        |
| -------------- | ----------------------------------------------------------------- |
| Frontend       | React 18, TypeScript, Vite, MUI, Zustand, Socket.IO client        |
| API Gateway    | Python FastAPI, Azure OpenAI SDK, httpx, MySQL (aiomysql)         |
| AI Pipeline    | LangGraph (StateGraph + Send()), Azure OpenAI (gpt-4.1), Pydantic |
| Orchestrator   | Python FastAPI, MySQL (state), plugin architecture                |
| Graph DB       | Neo4j 5.13 (async driver)                                         |
| Real-time      | Socket.IO (Node.js)                                               |
| Threat Intel   | MISP (Docker)                                                     |
| Mock Services  | Combined FastAPI service (Sentinel + CERT-IS + MISP mocks)        |
| Infrastructure | Docker Compose, Redis 7, MySQL 8, Helm charts                     |

---

## Documentation

| Document                           | Purpose                                      |
| ---------------------------------- | -------------------------------------------- |
| [README.md](README.md)             | This file — overview, setup, API reference   |
| [agent.md](agent.md)               | Pipeline contracts, node specs, state schema |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Architecture, diagrams, Neo4j schema, design |
| [USER_GUIDE.md](USER_GUIDE.md)     | End-user guide and walkthrough               |

---

## License

Internal / Prototype — NATO TIDE Hackathon 2026
