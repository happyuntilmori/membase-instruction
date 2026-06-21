---
layout: default
title: 홈
nav_order: 1
description: "AI 에이전트를 위한 중앙 기억 관리 완전 가이드 — membase.so"
permalink: /
---

# Membase 완전 가이드 — AI 에이전트를 위한 중앙 기억 관리

> **membase.so** | Aristo Technologies | AI 에이전트용 퍼시스턴트 메모리 레이어

---

## 빠른 시작

| 목적 | 파일 |
|------|------|
| 🤖 AI 에이전트 즉시 연결 (피딩용) | [agent-guide.html](agent-guide.html) |
| 📖 멤베이스가 뭔지 알고 싶다 | [1장: 소개](01-intro.html) |
| 🔧 지금 당장 설치하고 싶다 | [2장: 설치](02-installation.html) |
| 📝 기억 저장/검색 방법 | [3장: 기본 사용법](03-basic-usage.html) |
| 💾 백업과 외부 도구 연동 | [4장: 고급 기능](04-advanced-features.html) |
| 📋 CLAUDE.md 작성 방법 | [5장: 에이전트 지시](05-agent-instructions.html) |
| ❓ 자주 묻는 질문 | [6장: FAQ](06-faq.html) |

---

## 이 가이드의 구성

### [AI 에이전트용 참조 문서](agent-guide.html)

AI 에이전트에게 **직접 피딩**할 수 있는 기계 친화적 레퍼런스 문서예요.
CLAUDE.md, .cursorrules, 시스템 프롬프트에 포함하거나 에이전트 컨텍스트에 직접 제공하세요.

포함 내용:
- 멤베이스 시스템 컨텍스트 (복사/붙여넣기용)
- 전체 MCP 도구 레퍼런스
- 도구 호출 패턴
- 메모리 vs 위키 결정 매트릭스
- AGENT.md / CLAUDE.md 템플릿
- 통합 플랫폼 매트릭스

---

### 인간을 위한 가이드 (1장 ~ 6장)

중학생도 이해할 수 있도록 친절하게 작성된 한국어 설명서예요.

#### [1장: 멤베이스란 무엇인가?](01-intro.html)
- AI 에이전트의 건망증 문제
- 멤베이스가 해결하는 것
- 메모리 vs 위키 개념
- 지식 그래프 설명
- 누가 쓰면 좋은가
- 가격 정책

#### [2장: 설치하기](02-installation.html)
- Claude Code 설치
- Cursor 설치
- Hermes Agent 설치
- OpenClaw 설치
- 탈중앙화 버전 (membase-mcp) 설치
- 설치 확인 및 오류 해결

#### [3장: 기본 사용법](03-basic-usage.html)
- 기억 저장하기 (add_memory)
- 기억 검색하기 (search_memory)
- 위키 만들기 (add_wiki)
- 위키 검색 (search_wiki)
- 기억 삭제 (membase_forget)
- 자동 저장/자동 불러오기 설정
- 대시보드 사용법
- 실전 시나리오

#### [4장: 고급 기능](04-advanced-features.html)
- 데이터 저장 위치 (서버 vs 로컬)
- 로컬 동시 저장 방법
- 서비스 중단 시 백업 방법
- GitHub 자동 백업 설정
- 옵시디언(Obsidian) 연동
- Gmail/Slack/Google Calendar 연동
- 탈중앙화 버전 상세 설명
- 크론/스케줄러 필요 여부

#### [5장: 에이전트 지시하기](05-agent-instructions.html)
- CLAUDE.md 작성 템플릿
- .cursorrules 작성 템플릿
- AGENT.md 작성 템플릿
- 시스템 프롬프트 작성법
- Always-On 규칙 설정
- 상황별 지시 템플릿
- 실전 에이전트 설정 예시

#### [6장: FAQ](06-faq.html)
- 자주 묻는 질문 총정리
- 문제 해결 가이드
- 보안 및 프라이버시 Q&A

---

## 핵심 요약 (30초 버전)

**멤베이스(Membase)**는 Claude, Cursor, ChatGPT 등 모든 AI 도구가 **공유하는 중앙 기억 창고**예요.

```
설치: claude plugin marketplace add aristoapp/claude-membase
로그인: /membase:login
끝! 이제 AI가 대화 내용을 자동으로 기억해요.
```

**두 가지 저장 공간:**
- **Memory**: 내 선호도, 결정, 과거 경험 (지식 그래프)
- **Wiki**: API 문서, 스펙, 참조 자료 (마크다운 문서)

**완전 자동:**
- 크론 없이 자동 저장 (5분 비활성 또는 20개 메시지)
- 자동 외부 앱 동기화 (Gmail, Slack, Calendar)
- 에이전트가 자동으로 관련 기억 검색 가능

**데이터 소유권:** 내 데이터는 내 것. 언제든지 내보내기 가능.

---

## 관련 링크

- 공식 웹사이트: https://membase.so
- 지원 이메일: support@aristo.so
- GitHub (Aristo): https://github.com/aristoapp
- 탈중앙화 버전: https://github.com/unibaseio/membase-mcp
- 두뇌 만들기 모음: https://github.com/aristoapp/awesome-second-brain

---

*이 가이드는 공개 자료와 GitHub 리포지토리를 기반으로 작성되었습니다. 최신 정보는 항상 공식 사이트에서 확인하세요.*
