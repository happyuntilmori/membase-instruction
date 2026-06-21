---
layout: default
title: "5장: 에이전트 지시하기"
nav_order: 7
description: "CLAUDE.md, .cursorrules, AGENT.md 작성 템플릿 모음"
---

# 5장: AI 에이전트에게 멤베이스 사용 지시하기

---

## 목차

1. [왜 에이전트에게 지시가 필요할까?](#왜-에이전트에게-지시가-필요할까)
2. [CLAUDE.md 파일 작성법](#claudemd-파일-작성법)
3. [.cursorrules 파일 작성법](#cursorrules-파일-작성법)
4. [AGENT.md 파일 작성법](#agentmd-파일-작성법)
5. [시스템 프롬프트 작성법](#시스템-프롬프트-작성법)
6. [Always-On 규칙 설정](#always-on-규칙-설정)
7. [각 상황별 지시 템플릿](#각-상황별-지시-템플릿)
8. [에이전트 지시 실전 예시](#에이전트-지시-실전-예시)

---

## 왜 에이전트에게 지시가 필요할까?

멤베이스 플러그인을 설치했다고 해서 에이전트가 자동으로 최선의 방식으로 기억을 관리하지는 않아요.

예를 들어:
- AI가 언제 기억을 저장할지 스스로 판단하기 어려울 수 있음
- 어떤 정보가 중요한지 AI가 항상 알지 못함
- 매 대화 시작 시 기억을 불러오지 않을 수 있음

이런 문제를 해결하기 위해 **설정 파일에 지시문**을 넣어두면 에이전트가 일관되게 멤베이스를 활용해요.

---

## CLAUDE.md 파일 작성법

Claude Code를 사용한다면 프로젝트 루트에 `CLAUDE.md` 파일을 만들어요.

### 기본 템플릿

```markdown
# 프로젝트명: [프로젝트 이름]

## 멤베이스 메모리 사용 규칙

### 필수 행동
1. 모든 세션 시작 시: `search_memory`를 호출해서 관련 과거 컨텍스트를 불러오세요
2. 사용자가 선호도나 결정을 말할 때: 즉시 `add_memory`로 저장하세요
3. 참조 문서나 스펙을 받을 때: `add_wiki`로 저장하세요
4. 세션 종료 전: 중요한 결정이나 변경사항을 `add_memory`로 저장하세요

### 저장할 정보
- 기술 스택 선호도 (언어, 프레임워크, 도구)
- 코딩 스타일 규칙
- 아키텍처 결정과 이유
- 해결한 버그와 해결책
- 프로젝트 목표와 마감일
- 팀 구성원과 역할

### 저장하지 말 것
- 비밀번호, API 키, 시크릿 (항상 <private> 태그로 감싸세요)
- 50글자 미만의 짧은 대화
- 임시 디버깅 출력

### 메모리 형식
좋은 예: "사용자는 Python 3.11을 사용하며 pytest를 테스트 도구로 선호함"
나쁜 예: "pytest 씀"
```

### 프로젝트별 맞춤 템플릿

**웹 개발 프로젝트:**
```markdown
## 멤베이스 메모리 규칙 — 웹 개발 프로젝트

### 세션 시작 시
항상 다음을 검색하세요:
- `search_memory("기술 스택 선호도")`
- `search_memory("이 프로젝트 최근 결정")`
- `search_wiki("아키텍처 문서")`

### 저장할 것
- 컴포넌트 설계 결정
- 상태 관리 방식
- API 엔드포인트 설계 원칙
- 성능 최적화 패턴
- 배포 설정 특이사항

### 위키에 저장할 것
- API 스펙 문서
- 컴포넌트 라이브러리 설명
- 배포 체크리스트
- 환경변수 목록 (값 제외, 이름만)
```

**데이터 분석 프로젝트:**
```markdown
## 멤베이스 메모리 규칙 — 데이터 분석

### 세션 시작 시
- `search_memory("데이터셋 설명")` 호출
- `search_memory("분석 방법론 선호도")` 호출
- `search_wiki("데이터 딕셔너리")` 호출

### 저장할 것
- 데이터 전처리 결정 (왜 이렇게 했는지)
- 사용한 모델과 하이퍼파라미터 이유
- 발견한 데이터 이상치 패턴
- 비즈니스 요구사항 해석 방식
```

---

## .cursorrules 파일 작성법

Cursor IDE를 사용한다면 프로젝트 루트에 `.cursorrules` 파일을 만들어요.

### 기본 .cursorrules 템플릿

```
# Membase Memory Rules for Cursor

## Session Start Protocol
At the beginning of EVERY coding session:
1. Call search_memory("프로젝트명 recent decisions")
2. Call search_memory("user coding preferences")
3. Call search_wiki("architecture documentation")

## When to Save Memory (add_memory)
Save immediately when user:
- States a technology preference
- Makes an architectural decision
- Reports a bug that was fixed
- Shares a project constraint
- Mentions a deadline or milestone
- Corrects your assumption

## Memory Format Requirements
Always save as complete, self-contained statements:
GOOD: "User prefers composition over inheritance in React components"
BAD: "composition"

## When to Save Wiki (add_wiki)
Create wiki entries for:
- API endpoint documentation
- Database schema descriptions
- Component library specs
- Deployment procedures
- Environment setup guides

## Privacy Rules
NEVER save to Membase:
- Passwords or credentials
- API keys (even partially)
- Personal sensitive data
Always wrap sensitive info: <private>sensitive data</private>

## Bug Fix Memory Pattern
When a bug is fixed, save:
"BUG: [description] | ROOT CAUSE: [cause] | FIX: [solution] | DATE: [date]"
```

---

## AGENT.md 파일 작성법

범용 AI 에이전트를 위한 `AGENT.md` 파일이에요.

### 범용 AGENT.md 템플릿

```markdown
# Agent Configuration

## Memory System: Membase

You have access to Membase for persistent memory. This is NOT optional — you MUST use it.

### MANDATORY: Session Start
Before responding to ANY task, call:
1. `search_memory` with 2-3 keywords from the user's request
2. `search_wiki` if the task involves documentation or technical details

### MANDATORY: During Session
Call `add_memory` when you observe:
- User corrects your behavior → save the correction
- User states a preference → save immediately  
- You make a significant decision → save with rationale
- User mentions a constraint or requirement → save it

### MANDATORY: Session End
Before ending any significant task, call `add_memory` to save:
- What was accomplished
- Key decisions made
- Any open questions or next steps

### Memory Quality Standards
Memories must be:
- Self-contained (understandable without context)
- Specific (not vague)
- Actionable (useful for future sessions)

### Context Priority
1. Current conversation context (highest priority)
2. Memory retrieved via search_memory
3. Wiki content retrieved via search_wiki
4. Your general training knowledge (lowest priority)

When in conflict, prioritize user's stored preferences over your defaults.

## Privacy
Never store in Membase:
- Authentication credentials
- API keys or tokens
- Personal financial data
- Explicit requests NOT to remember
```

---

## 시스템 프롬프트 작성법

API를 직접 사용하거나 커스텀 AI 에이전트를 만드는 경우 시스템 프롬프트에 포함해요.

### 간결한 시스템 프롬프트 (단순 사용)

```
You have access to Membase persistent memory tools.

Rules:
1. Start every conversation: call search_memory with task keywords
2. When user shares preferences or makes decisions: call add_memory immediately
3. For reference material: use add_wiki instead
4. Never store secrets or API keys

Memory format: Clear, complete sentences. Include context.
Example: "User prefers async/await over .then() chaining in JavaScript"
```

### 상세한 시스템 프롬프트 (고급 사용)

```
## Persistent Memory System

You are equipped with Membase — a knowledge graph-based memory system.

### Available Tools
- search_memory(query, date_filter?) → Returns relevant personal context
- add_memory(content) → Stores personal preferences, decisions, facts
- search_wiki(query) → Returns relevant documentation
- add_wiki(title, content, collection?) → Stores reference documents
- membase_forget(memory_id) → Deletes a specific memory

### Memory Architecture
Membase stores two types of data:
1. MEMORY: Personal context (preferences, decisions, project state)
2. WIKI: Reference knowledge (docs, specs, technical notes)

The backend uses a knowledge graph + vector embeddings for retrieval,
meaning semantic search works even when exact keywords don't match.

### Behavioral Rules

**Always retrieve before responding:**
For any non-trivial task:
  1. search_memory(relevant keywords)
  2. search_wiki(relevant keywords) if technical
  3. Synthesize retrieved context with current request

**Always store valuable information:**
Trigger conditions for add_memory:
  - User corrects an assumption → "User correction: [correction]"
  - User states preference → "User prefers [X] over [Y] because [reason]"
  - Decision made → "Decision: [choice] | Rationale: [why] | Date: [date]"
  - Bug fixed → "Fixed: [bug] | Solution: [fix] | Context: [project]"
  - New constraint → "Constraint: [limitation] | Source: [who/what]"

**Wiki vs Memory decision:**
Use add_wiki for: API docs, specs, procedures, reference material
Use add_memory for: preferences, past decisions, personal facts, errors fixed

### Context Injection
When autoRecall is enabled, memories are automatically injected before your response.
When disabled, you must manually call search_memory at session start.
```

---

## Always-On 규칙 설정

### Cursor의 Always-On 규칙

cursor-membase 플러그인은 기본 Always-On 규칙을 제공해요. 이 규칙을 확장할 수 있어요:

**`.cursor/rules` 파일:**
```
# Membase Always-On Rules

BEFORE every response:
- If this is the first message in session, call search_memory + search_wiki
- If user mentions a project name, call search_memory("projectName")

AFTER every response:
- If you learned something new about the user, call add_memory
- If you created/modified important content, add relevant summary to wiki

IMMEDIATELY when:
- User says "remember this", "save this", "don't forget" → add_memory
- User says "document this", "write this down" → add_wiki
- User says "forget", "remove that", "delete memory" → membase_forget
```

### OpenClaw의 Always-On 설정

```json
// ~/.openclaw/openclaw.json
{
  "plugins": {
    "membase": {
      "autoRecall": true,
      "autoCapture": true,
      "maxRecallChars": 4000,
      "alwaysOn": {
        "sessionStart": ["search_memory", "search_wiki"],
        "afterUserMessage": ["auto_capture"],
        "beforeAiResponse": ["auto_recall"]
      }
    }
  }
}
```

---

## 각 상황별 지시 템플릿

### 개발자용

```markdown
## 개발 세션 멤베이스 규칙

세션 시작 시 반드시:
1. search_memory("[현재 프로젝트 이름]")로 프로젝트 컨텍스트 로드
2. search_memory("내 코딩 선호도")로 스타일 가이드 확인

저장 우선순위:
1. [높음] 버그 수정 → "BUG: {설명} | FIX: {해결책} | PROJECT: {프로젝트}"
2. [높음] 아키텍처 결정 → "DECISION: {결정} | WHY: {이유} | DATE: {날짜}"
3. [중간] 기술 스택 선호도
4. [낮음] 임시 코드 스니펫
```

### 작가/블로거용

```markdown
## 글쓰기 세션 멤베이스 규칙

세션 시작 시:
- search_memory("내 글쓰기 스타일")
- search_memory("현재 작업 중인 글")
- search_wiki("참조 자료")

저장할 것:
- 내 독자 페르소나 정보
- 자주 쓰는 표현 스타일
- 피해야 할 표현들
- 완성한 글 목록과 반응
- 인터뷰나 리서치 결과
```

### 창업자/비즈니스용

```markdown
## 비즈니스 세션 멤베이스 규칙

세션 시작 시:
- search_memory("회사 현황 KPI")
- search_memory("현재 우선순위")
- search_wiki("제품 스펙")

저장할 것:
- 중요 비즈니스 결정과 근거
- 파트너/투자자 미팅 결과
- KPI 달성 현황 업데이트
- 경쟁사 분석 인사이트
- 고객 피드백 패턴
```

---

## 에이전트 지시 실전 예시

### 예시 1: 매일 아침 브리핑 에이전트

```markdown
## 데일리 브리핑 에이전트 규칙

시작 시:
1. get_current_date 호출
2. search_memory("오늘 할 일 마감일") 호출
3. search_memory("어제 작업한 것") 호출
4. 모든 정보를 취합해서 아침 브리핑 생성

브리핑 형식:
- 오늘 날짜와 요일
- 오늘 마감 또는 중요한 일정
- 어제 미완성으로 남긴 작업
- 멤베이스에서 찾은 관련 컨텍스트
```

### 예시 2: 코드 리뷰 에이전트

```markdown
## 코드 리뷰 에이전트 규칙

리뷰 시작 전:
1. search_memory("이 프로젝트 코딩 스타일")
2. search_memory("이 코드베이스 특이사항")
3. search_wiki("코드 컨벤션 문서")

리뷰 중:
- 팀 스타일 가이드에 맞게 피드백
- 과거 비슷한 버그 패턴 있으면 언급

리뷰 후:
- 발견한 새로운 패턴을 add_memory로 저장
- "코드 리뷰: [파일명] | 주요 발견: [내용] | 날짜: [날짜]"
```

### 예시 3: 학습 보조 에이전트

```markdown
## 학습 보조 에이전트 규칙

세션 시작:
1. search_memory("학습 중인 주제")
2. search_memory("이해한 개념 목록")
3. search_memory("아직 모르는 것")

학습 중:
- 설명 후 이해도 확인
- 이해한 개념 즉시 add_memory
- 모르는 것도 add_memory에 추적

"LEARNED: [개념] | UNDERSTANDING: [이해도 1-5] | DATE: [날짜]"
"UNKNOWN: [개념] | CONTEXT: [어디서 막혔는지]"
```

---

## 멤베이스 지시 체크리스트

올바른 에이전트 지시를 작성했는지 확인해보세요:

- [ ] 세션 시작 시 `search_memory` 호출 지시 포함
- [ ] 어떤 정보를 저장할지 구체적으로 명시
- [ ] 민감한 정보 처리 규칙 포함
- [ ] 위키 저장과 메모리 저장의 구분 명시
- [ ] 메모리 형식(완전한 문장, 구체적) 지시
- [ ] 삭제 요청 처리 방법 포함

---

**다음 장**: [6장: 자주 묻는 질문 (FAQ)](./06-faq.md)
