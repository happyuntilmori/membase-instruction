---
layout: default
title: "🤖 AI 에이전트 참조 가이드"
nav_order: 2
description: "AI 에이전트에게 직접 피딩할 수 있는 Membase MCP 도구 레퍼런스"
---

# Membase Agent Reference Guide

> **PURPOSE**: This document is optimized for AI agent ingestion. Feed this to any LLM agent to enable Membase integration immediately.

---

## SYSTEM_CONTEXT

```
You have access to Membase — a persistent memory layer that survives across sessions, tools, and platforms.
Membase stores two types of data:
  1. MEMORY  → Personal context: preferences, decisions, habits, project state, past errors
  2. WIKI    → Reference knowledge: docs, specs, notes, linked markdown documents

Always call search_memory at the start of relevant tasks. Always call add_memory when you learn something important about the user or project.
```

---

## IDENTITY

- **Product**: Membase (membase.so)
- **Company**: Aristo Technologies, Inc.
- **Type**: Cloud-based universal memory layer for AI agents
- **Protocol**: MCP (Model Context Protocol) + OAuth 2.0 (no API keys)
- **Storage**: Membase Cloud (server-side) + Knowledge Graph + Vector Embeddings
- **Auth**: OAuth 2.0 with PKCE — browser login, tokens auto-cached

---

## AVAILABLE MCP TOOLS

### Memory Tools (Personal Context)

| Tool | Description | When to Use |
|------|-------------|-------------|
| `search_memory` | Semantic search with date/source filters | Start of every task. Find relevant past context |
| `add_memory` | Store preferences, goals, decisions, facts | After learning anything important about user |
| `membase_forget` | Delete memory with confirmation | When user asks to forget something |
| `membase_profile` | Retrieve user profile and related memories | When you need user background |

### Wiki Tools (Reference Knowledge)

| Tool | Description | When to Use |
|------|-------------|-------------|
| `search_wiki` | Hybrid keyword + semantic document search | Find docs, specs, project notes |
| `add_wiki` | Create markdown doc with wikilinks | When user wants to document something |
| `update_wiki` | Modify existing wiki document | When info becomes outdated |
| `delete_wiki` | Remove wiki document | When doc is no longer needed |

### Resources

| Resource | Returns |
|----------|---------|
| `membase://profile` | User settings and preferences |
| `membase://recent` | Top 10 most recent memories timeline |

### Utility

| Tool | Description |
|------|-------------|
| `get_current_date` | Timezone-aware current date |

---

## TOOL CALL PATTERNS

### Pattern 1: Task Start (Always Do This)
```
1. Call search_memory("task topic keywords")
2. Call search_wiki("relevant docs or specs")
3. Inject results into your context
4. Proceed with task using retrieved context
```

### Pattern 2: Save Important Information
```
TRIGGER: User states a preference, makes a decision, shares background, corrects you
ACTION: Call add_memory with structured content

Example content to save:
- "User prefers TypeScript over JavaScript for all new projects"
- "Project uses PostgreSQL 15 on AWS RDS"
- "User's coding style: no comments, functional programming preferred"
- "Past error: Auth token expires after 1 hour, not 24 hours"
```

### Pattern 3: Wiki Document Creation
```
TRIGGER: User shares reference material, documentation, specs, or asks to document something
ACTION: Call add_wiki with markdown content including wikilinks

Format: Standard markdown with [[wikilink]] syntax for cross-references
Collections: Group related docs (e.g., "project-alpha", "personal-notes")
```

### Pattern 4: Context Combination
```
results = search_memory("user query") + search_wiki("user query")
Use combined results to ground your response in personal context AND factual knowledge
```

---

## CONFIGURATION VARIABLES (per plugin)

```json
{
  "autoRecall": false,     // Inject memories before EVERY AI turn (default: false, set true for always-on)
  "autoCapture": true,     // Auto-store conversations after 5min inactivity or 20 messages (default: true)
  "maxRecallChars": 4000,  // Max characters injected per turn (default: 4000)
  "debug": false           // Verbose logging
}
```

**Auto-capture triggers**: 5 minutes of inactivity OR 20 messages accumulated  
**Minimum capture threshold**: 50 characters (trivial exchanges excluded)  
**Auto-update**: Fully automatic, no cron/scheduler needed

---

## MEMORY vs WIKI: DECISION MATRIX

| Data Type | Store As | Example |
|-----------|----------|---------|
| User preference | MEMORY | "Uses dark mode, prefers short responses" |
| Coding style | MEMORY | "No inline comments, functional style" |
| Past decision | MEMORY | "Chose Redis over Memcached for caching layer" |
| Past error/fix | MEMORY | "Bug: forgot to await async call in useEffect" |
| Meeting outcome | MEMORY | "Q3 goal: reach 1000 users" |
| API documentation | WIKI | Full API reference doc |
| Project specification | WIKI | Product requirements document |
| Architecture decision | WIKI | ADR-001: Microservices rationale |
| Team notes | WIKI | Meeting notes with [[cross-references]] |

---

## PRIVACY & FILTERING

Membase automatically EXCLUDES:
- Secrets and environment variables
- API keys and credentials
- Content wrapped in `<private>...</private>` tags
- Content wrapped in `<membase-private>...</membase-private>` tags

To protect sensitive data, wrap it:
```
<private>
API_KEY=sk-xxxx
DATABASE_PASSWORD=secret123
</private>
```

---

## KNOWLEDGE GRAPH STRUCTURE

Membase extracts and stores:
- **Entities**: People, projects, technologies, concepts
- **Relationships**: How entities relate to each other
- **Facts**: Specific statements about entities
- **Episodes**: Timestamped events and interactions

This enables retrieval beyond simple keyword matching — semantic search across the knowledge graph.

---

## AGENT.md / CLAUDE.md TEMPLATE

Copy this into your `AGENT.md`, `CLAUDE.md`, `.cursorrules`, or system prompt:

```markdown
## Memory Instructions

You have access to Membase MCP tools for persistent memory.

### REQUIRED BEHAVIORS:
1. At the START of every session, call `search_memory` with keywords from the current task
2. At the END of every session, call `add_memory` to save important learnings
3. When the user corrects you or shares preferences, IMMEDIATELY call `add_memory`
4. For reference material or documentation, use `add_wiki` instead of `add_memory`

### MEMORY RETRIEVAL:
- Personal context (preferences, past decisions): use `search_memory`
- Reference docs and specs: use `search_wiki`
- Always combine both results before responding on complex tasks

### WHAT TO SAVE:
- User's technology preferences and constraints
- Project-specific decisions and their rationale
- Past errors and how they were fixed
- Important deadlines and milestones
- Team members and their roles

### WHAT NOT TO SAVE:
- Passwords, API keys, secrets (wrap in <private> tags instead)
- Trivial chitchat
- Temporary debugging output
- Anything the user explicitly asks NOT to remember

### MEMORY FORMAT:
Store memories as clear, self-contained statements:
GOOD: "User prefers pytest over unittest for Python testing"
BAD:  "user likes pytest"
```

---

## INTEGRATION MATRIX

| Platform | Integration | Install Command |
|----------|-------------|-----------------|
| Claude Code | claude-membase plugin | `claude plugin marketplace add aristoapp/claude-membase` |
| Cursor | cursor-membase (MCP) | Cursor Marketplace → Connect OAuth |
| OpenClaw | openclaw-membase | `openclaw plugins install @membase/openclaw-membase` |
| Hermes Agent | hermes-membase | `uv tool install hermes-membase && hermes-membase install` |
| Any MCP client | membase-mcp (decentralized) | `git clone https://github.com/unibaseio/membase-mcp` |

---

## DATA ARCHITECTURE

```
User Interactions
       │
       ▼
Auto-Capture (5min / 20msg)
       │
       ▼
Entity + Relationship Extraction
       │
       ▼
Knowledge Graph ←→ Vector Embeddings
       │
       ▼
search_memory / search_wiki
       │
       ▼
Relevant Context → Agent Context Window
```

---

## EXTERNAL DATA SOURCES (Connectable)

- Gmail
- Google Calendar
- Slack
- Obsidian vault (import to Wiki)
- Past conversation imports

---

## BACKUP & EXPORT

- **Data ownership**: User owns all data. Delete anytime, no questions asked.
- **Obsidian import**: Import existing Obsidian vault into Membase Wiki
- **Decentralized option**: `unibaseio/membase-mcp` stores on Unibase DA network — blockchain-verifiable, retrievable at `https://testnet.hub.membase.io/`
- **Local mirror**: Hermes-Membase "Mirror Built-in" syncs native agent memories to Membase
- **Export**: Use `membase-cli` for data export operations

---

## QUICK REFERENCE: COMMON AGENT INSTRUCTIONS

### For Claude (CLAUDE.md)
```
Always use Membase MCP tools:
- search_memory before starting any task
- add_memory after learning user preferences or making decisions  
- search_wiki for project documentation
- add_wiki to document important reference material
```

### For Cursor (.cursorrules)
```
# Membase Memory Rules
- Before every coding session: search_memory for project context
- After fixing a bug: add_memory with the error and solution
- When user specifies a preference: immediately add_memory
- For architecture docs: use add_wiki with wikilinks
```

### For System Prompts (General)
```
You have persistent memory via Membase. Use search_memory at conversation start. 
Save important information with add_memory. Never repeat questions you've asked before.
```

---

*Last updated: 2026-06-21 | Source: membase.so | Integration: MCP*
