---
layout: default
title: "2장: 설치하기"
nav_order: 4
description: "Claude Code, Cursor, Hermes Agent, OpenClaw에 멤베이스 설치 방법"
---

# 2장: 멤베이스 설치하기

---

## 목차

1. [설치 전 준비사항](#설치-전-준비사항)
2. [Claude Code에 설치하기](#claude-code에-설치하기)
3. [Cursor에 설치하기](#cursor에-설치하기)
4. [Hermes Agent에 설치하기](#hermes-agent에-설치하기)
5. [OpenClaw에 설치하기](#openclaw에-설치하기)
6. [탈중앙화 버전 (membase-mcp)](#탈중앙화-버전-membase-mcp)
7. [설치 확인 방법](#설치-확인-방법)
8. [자주 발생하는 설치 오류](#자주-발생하는-설치-오류)

---

## 설치 전 준비사항

멤베이스를 설치하기 전에 다음이 필요해요:

1. **멤베이스 계정**: [membase.so](https://membase.so) 에서 무료로 가입
   - 신용카드 없이 가입 가능
   - 14일 무료 체험 포함

2. **웹 브라우저**: OAuth 로그인 과정에서 브라우저가 자동으로 열려요

3. **사용할 AI 도구 중 하나**:
   - Claude Code CLI
   - Cursor IDE
   - Hermes Agent
   - OpenClaw
   - 또는 MCP를 지원하는 다른 도구

> **참고**: 멤베이스는 API 키 방식이 아닌 **OAuth 2.0 인증**을 사용해요. 별도의 API 키를 발급받거나 관리할 필요가 없어요! 로그인만 하면 됩니다.

---

## Claude Code에 설치하기

Claude Code(터미널에서 사용하는 Claude CLI)에 멤베이스를 추가하는 방법이에요.

### 단계 1: 플러그인 마켓플레이스에서 추가

터미널을 열고 다음 명령어를 입력하세요:

```bash
claude plugin marketplace add aristoapp/claude-membase
```

### 단계 2: 멤베이스 플러그인 설치

```bash
claude plugin install membase@membase-plugins
```

### 단계 3: 로그인

```bash
/membase:login
```

이 명령어를 입력하면 브라우저가 자동으로 열리고 멤베이스 계정으로 로그인하는 화면이 나타나요. 로그인을 완료하면 자동으로 연결됩니다.

### 설치 완료 확인

```bash
/membase:status
```

"Connected to Membase" 메시지가 나오면 성공!

### Claude Code 설정 (선택사항)

`~/.claude/settings.json`에서 자동 기능을 켜고 끌 수 있어요:

```json
{
  "membase": {
    "autoRecall": true,
    "autoCapture": true,
    "maxRecallChars": 4000
  }
}
```

| 설정 | 기본값 | 설명 |
|------|--------|------|
| `autoRecall` | false | 매 AI 응답 전에 관련 메모리 자동 주입 |
| `autoCapture` | true | 대화 후 자동으로 기억 저장 |
| `maxRecallChars` | 4000 | 한 번에 주입되는 최대 메모리 크기 (글자 수) |

---

## Cursor에 설치하기

Cursor IDE에서 멤베이스를 사용하는 방법이에요.

### 단계 1: Cursor 마켓플레이스에서 설치

1. Cursor를 열어요
2. 왼쪽 사이드바에서 Extensions (확장 프로그램) 아이콘 클릭
3. 검색창에 "Membase" 입력
4. "Membase — Persistent Memory" 플러그인 찾아서 Install 클릭

### 단계 2: OAuth 연결

1. Cursor 설정으로 이동 (Ctrl/Cmd + ,)
2. "MCP" 섹션 찾기
3. Membase 항목 옆의 **"Connect"** 버튼 클릭
4. 브라우저가 열리면 멤베이스 계정으로 로그인
5. "Allow" (허용) 클릭

> **중요**: API 키 입력창이 없어요! OAuth로 자동 인증되니 걱정하지 마세요.

### Cursor 설정 파일 (선택사항)

`.cursor/settings.json` 또는 `~/.cursor/cursor.json`에서 설정 가능:

```json
{
  "membase": {
    "autoRecall": true,
    "autoCapture": true,
    "maxRecallChars": 4000,
    "debug": false
  }
}
```

### Cursor의 Always-On 규칙 활성화

cursor-membase 플러그인에는 **Always-On 규칙**이 내장되어 있어요. 이 규칙은 에이전트가 자동으로 멤베이스 도구를 사용하도록 지시해요.

프로젝트 루트에 `.cursor/rules` 파일(또는 `.cursorrules`)을 만들어 추가 지시를 넣을 수 있어요:

```markdown
# Membase Rules
- ALWAYS call search_memory at the start of every coding task
- ALWAYS call add_memory when I share a preference or make an architectural decision
- Use search_wiki for project documentation lookup
- Store bug fixes in memory with the pattern: "Bug: [description] → Fix: [solution]"
```

---

## Hermes Agent에 설치하기

Hermes Agent를 사용한다면 hermes-membase 플러그인을 설치하세요.

### uv를 사용하는 경우 (권장)

```bash
uv tool install hermes-membase && hermes-membase install
```

### pip를 사용하는 경우

```bash
pip install hermes-membase && hermes-membase install
```

### 설치 후 자동으로 일어나는 일:
1. Hermes 설정이 자동으로 업데이트됨
2. OAuth 인증 화면이 브라우저에서 열림
3. 로그인하면 연결 완료

### Hermes 설정 파일

설치 후 `~/.hermes/membase.json` 파일이 생성돼요:

```json
{
  "autoRecall": false,
  "autoCapture": true,
  "maxRecallChars": 4000,
  "debug": false
}
```

### Hermes의 특별 기능: Mirror

Hermes Agent의 `hermes-membase`에는 **Mirror** 기능이 있어요. 이 기능을 켜면 Hermes의 기본 내장 메모리 도구에 저장한 내용이 **자동으로 멤베이스에도 동기화**돼요. 덕분에 Hermes와 멤베이스 양쪽에 수동으로 저장할 필요가 없어요.

---

## OpenClaw에 설치하기

OpenClaw를 사용한다면 다음 명령어로 설치하세요:

```bash
openclaw plugins install @membase/openclaw-membase
```

설치 후 OpenClaw를 재시작하세요.

### OAuth 로그인

```bash
openclaw membase login
```

브라우저가 열리면 멤베이스 계정으로 로그인. 토큰이 자동으로 저장됩니다.

### OpenClaw 설정

`~/.openclaw/openclaw.json`에서 설정:

```json
{
  "plugins": {
    "membase": {
      "autoRecall": false,
      "autoCapture": true,
      "maxRecallChars": 4000,
      "debug": false
    }
  }
}
```

---

## 탈중앙화 버전 (membase-mcp)

일반 멤베이스.so 서비스 대신 **탈중앙화 버전**을 원한다면 `unibaseio/membase-mcp`를 사용할 수 있어요.

이 버전은 Unibase DA 네트워크(블록체인 기반)에 데이터를 저장하고, [testnet.hub.membase.io](https://testnet.hub.membase.io) 에서 데이터를 확인할 수 있어요.

### 설치

```bash
git clone https://github.com/unibaseio/membase-mcp.git
cd membase-mcp
uv run src/membase_mcp/server.py
```

### 환경변수 설정

`.env` 파일을 만들거나 환경변수로 설정:

```bash
export MEMBASE_ACCOUNT="0x여러분의지갑주소"
export MEMBASE_CONVERSATION_ID="unique-conversation-id-123"
export MEMBASE_ID="my-agent-instance"
```

| 변수 | 설명 |
|------|------|
| `MEMBASE_ACCOUNT` | 0x 형식의 계정 주소 |
| `MEMBASE_CONVERSATION_ID` | 대화 고유 식별자 (이전 대화 기록 불러오기에 사용) |
| `MEMBASE_ID` | 에이전트 인스턴스 식별자 |

### MCP 설정에 추가 (Claude Desktop 예시)

`~/.claude/config.json`:

```json
{
  "mcpServers": {
    "membase": {
      "command": "uv",
      "args": ["run", "/path/to/membase-mcp/src/membase_mcp/server.py"],
      "env": {
        "MEMBASE_ACCOUNT": "0x여러분의지갑주소",
        "MEMBASE_CONVERSATION_ID": "my-project-123",
        "MEMBASE_ID": "claude-agent"
      }
    }
  }
}
```

---

## 설치 확인 방법

설치가 잘 됐는지 확인하는 방법들:

### Claude Code
```bash
/membase:status    # 연결 상태 확인
/membase:profile   # 내 프로필 확인
```

### OpenClaw
```bash
openclaw membase status    # API 연결 확인
openclaw membase search "test"    # 검색 테스트
```

### 모든 플러그인 공통
AI 에이전트에게 이렇게 물어보세요:
```
"멤베이스에서 내 최근 기억들을 보여줘"
"membase://recent 리소스를 불러와줘"
```

---

## 자주 발생하는 설치 오류

### ❌ "OAuth 연결 실패"
- **원인**: 브라우저 팝업 차단
- **해결**: 브라우저 팝업 허용 설정 후 재시도

### ❌ "Plugin not found"
- **원인**: 인터넷 연결 문제 또는 구버전 CLI
- **해결**: CLI 업데이트 후 재시도

### ❌ "Permission denied" (Python 설치)
- **원인**: 시스템 Python에 설치 시도
- **해결**: `uv` 사용 권장 또는 `pip install --user` 사용

### ❌ "MCP server connection failed" (탈중앙화 버전)
- **원인**: 환경변수 미설정
- **해결**: `MEMBASE_ACCOUNT` 등 환경변수 확인

---

## 다음 단계

설치가 완료됐다면 이제 멤베이스를 사용해볼 차례예요!

**다음 장**: [3장: 기본 사용법](./03-basic-usage.md)
