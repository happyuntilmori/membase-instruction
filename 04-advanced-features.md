---
layout: default
title: "4장: 고급 기능"
nav_order: 6
description: "백업, GitHub 동기화, Obsidian 연동, Gmail/Slack 통합"
---

# 4장: 고급 기능 — 백업, 동기화, 외부 앱 연동, 옵시디언

---

## 목차

1. [데이터는 어디에 저장되나요?](#데이터는-어디에-저장되나요)
2. [로컬 저장도 가능한가요?](#로컬-저장도-가능한가요)
3. [서비스가 중단되면 내 기억은?](#서비스가-중단되면-내-기억은)
4. [GitHub/클라우드에 백업하기](#github클라우드에-백업하기)
5. [옵시디언(Obsidian) 연동하기](#옵시디언obsidian-연동하기)
6. [Gmail, 슬랙, 구글 캘린더 연동](#gmail-슬랙-구글-캘린더-연동)
7. [탈중앙화 버전으로 완전한 데이터 소유](#탈중앙화-버전으로-완전한-데이터-소유)
8. [자동 갱신 vs 수동 업데이트](#자동-갱신-vs-수동-업데이트)

---

## 데이터는 어디에 저장되나요?

멤베이스는 기본적으로 **클라우드 서버(Membase Cloud)**에 데이터를 저장해요.

```
내 AI 에이전트 (Claude, Cursor 등)
          │
          │ MCP (Model Context Protocol)
          ▼
    멤베이스 플러그인
          │
          │ HTTPS / OAuth 2.0
          ▼
    Membase Cloud 서버
          │
     ┌────┴────┐
     │         │
  벡터 DB   지식 그래프
 (의미 검색) (관계 저장)
```

**클라우드 저장의 장점:**
- 어디서든, 어떤 기기에서든 접근 가능
- 자동 백업 (멤베이스가 관리)
- 여러 AI 도구가 동시에 접근 가능
- 내가 관리할 서버가 필요 없음

**클라우드 저장의 단점:**
- 인터넷 연결 필요
- 멤베이스 서비스에 의존

---

## 로컬 저장도 가능한가요?

### 방법 1: Hermes-Membase의 Mirror 기능

Hermes Agent + hermes-membase 조합을 사용하면, Hermes의 **로컬 메모리**와 Membase 클라우드가 자동으로 동기화돼요.

```
로컬 (내 컴퓨터)          클라우드
                          
Hermes Agent             Membase Cloud
   │                          │
   │ ←── Mirror 동기화 ───►   │
   │                          │
로컬 메모리              클라우드 메모리
(Hermes 파일)           (지식 그래프)
```

이 방식에서는:
- 인터넷 없어도 로컬 메모리 사용 가능
- 인터넷 연결 시 자동으로 클라우드와 동기화
- 클라우드에 문제가 생겨도 로컬 백업 유지

### 방법 2: 탈중앙화 버전 (membase-mcp)

`unibaseio/membase-mcp`는 중앙화된 클라우드 대신 **Unibase DA 블록체인 네트워크**에 저장해요. 특정 회사의 서버에 의존하지 않아요.

```bash
# 데이터 저장 위치
testnet.hub.membase.io  ← 블록체인 네트워크
```

### 방법 3: membase-cli로 로컬 내보내기

멤베이스 CLI 도구를 사용해서 데이터를 로컬에 내보낼 수 있어요:

```bash
# membase-cli 설치
npm install -g membase-cli

# 데이터 내보내기 (JSON 형식)
membase export --output ./my-memories-backup.json

# 특정 날짜 이후 데이터만 내보내기
membase export --since 2026-01-01 --output ./backup-2026.json
```

---

## 서비스가 중단되면 내 기억은?

이것은 중요한 질문이에요. 멤베이스 서비스가 중단되거나 계정을 삭제할 경우를 대비해야 해요.

### 멤베이스의 데이터 소유권 정책

> "당신의 데이터는 항상 당신 것입니다. 언제든지 이의 없이 삭제하거나 내보낼 수 있습니다."

### 데이터 내보내기 방법

**방법 1: 대시보드에서 내보내기**
1. [membase.so](https://membase.so) 로그인
2. 설정 → 데이터 내보내기
3. JSON 또는 마크다운 형식으로 다운로드

**방법 2: membase-cli 사용**
```bash
# 모든 메모리 내보내기
membase export --format json --output memories.json

# 위키 문서 내보내기 (마크다운 형식)
membase export --type wiki --format markdown --output wiki/

# 전체 데이터 백업
membase backup --output backup-$(date +%Y%m%d).zip
```

**방법 3: API를 통한 자동 백업**
```python
import requests
import json
from datetime import datetime

# 멤베이스 API로 데이터 내보내기
headers = {"Authorization": "Bearer YOUR_TOKEN"}
response = requests.get("https://api.membase.so/v1/memories/export", headers=headers)

# 파일로 저장
filename = f"membase-backup-{datetime.now().strftime('%Y%m%d')}.json"
with open(filename, 'w') as f:
    json.dump(response.json(), f, ensure_ascii=False, indent=2)
    
print(f"백업 완료: {filename}")
```

### 정기 백업 스크립트 (cron 활용)

멤베이스 자체는 크론이 필요 없지만, **데이터 백업**을 위해 크론을 설정할 수 있어요:

```bash
# crontab -e 에서 설정
# 매주 일요일 오전 3시에 백업
0 3 * * 0 membase export --output ~/backups/membase-$(date +\%Y\%m\%d).json

# 매일 자정에 백업
0 0 * * * membase export --output ~/backups/membase-$(date +\%Y\%m\%d).json
```

---

## GitHub/클라우드에 백업하기

멤베이스 데이터를 GitHub이나 다른 클라우드에 동시 백업하는 방법이에요.

### GitHub에 자동 백업하기

#### 방법 1: GitHub Actions 활용

`.github/workflows/membase-backup.yml` 파일 생성:

```yaml
name: Membase Daily Backup

on:
  schedule:
    - cron: '0 0 * * *'    # 매일 자정
  workflow_dispatch:         # 수동 실행도 가능

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Install membase-cli
        run: npm install -g membase-cli
        
      - name: Login to Membase
        run: membase login --token ${{ secrets.MEMBASE_TOKEN }}
        
      - name: Export memories
        run: |
          mkdir -p backups
          membase export --format json --output backups/memories-$(date +%Y%m%d).json
          membase export --type wiki --format markdown --output backups/wiki/
          
      - name: Commit and push backup
        run: |
          git config user.name "Membase Backup Bot"
          git config user.email "backup@example.com"
          git add backups/
          git commit -m "Daily Membase backup $(date +%Y-%m-%d)" || echo "No changes"
          git push
```

#### 방법 2: 로컬 스크립트 + GitHub Push

```bash
#!/bin/bash
# membase-backup-to-github.sh

BACKUP_DIR="$HOME/membase-backups"
GITHUB_REPO="$HOME/my-backup-repo"
DATE=$(date +%Y%m%d_%H%M%S)

# 멤베이스 데이터 내보내기
mkdir -p "$BACKUP_DIR"
membase export --format json --output "$BACKUP_DIR/memories-$DATE.json"
membase export --type wiki --format markdown --output "$BACKUP_DIR/wiki-$DATE/"

# GitHub에 푸시
cp -r "$BACKUP_DIR"/* "$GITHUB_REPO/membase-backups/"
cd "$GITHUB_REPO"
git add membase-backups/
git commit -m "Membase backup $DATE"
git push origin main

echo "✅ 백업 완료: $DATE"
```

### 다른 클라우드 백업 옵션

**구글 드라이브 백업:**
```bash
# rclone 설치 후
rclone copy ~/membase-backups gdrive:membase-backups
```

**Amazon S3 백업:**
```bash
aws s3 sync ~/membase-backups s3://my-bucket/membase-backups
```

**Dropbox 백업:**
```bash
rclone copy ~/membase-backups dropbox:membase-backups
```

---

## 옵시디언(Obsidian) 연동하기

옵시디언(Obsidian)을 사용한다면 멤베이스와 연동할 수 있어요.

### 옵시디언 볼트 → 멤베이스 위키로 가져오기

기존 옵시디언 노트들을 멤베이스 위키로 불러올 수 있어요.

**방법 1: 대시보드에서 가져오기**
1. [membase.so](https://membase.so) 로그인
2. Wiki 탭 → "Import" 클릭
3. "Import from Obsidian" 선택
4. 옵시디언 볼트 폴더 선택
5. Import 완료!

**방법 2: 명령줄에서 가져오기**
```bash
membase import --source obsidian --vault-path ~/Documents/ObsidianVault
```

### 옵시디언과의 호환성

멤베이스 위키는 옵시디언과 **같은 형식**을 사용해요:
- 마크다운 (`.md`) 파일
- `[[문서이름]]` 위키링크 형식
- YAML 프론트매터 지원
- 태그 시스템 (`#태그`)

때문에 가져온 옵시디언 노트들이 위키링크 연결을 그대로 유지해요!

### 멤베이스 위키 → 옵시디언으로 내보내기

멤베이스 위키를 다시 옵시디언으로 내보낼 수도 있어요:

```bash
# 위키를 마크다운으로 내보내기
membase export --type wiki --format markdown --output ~/Documents/MembaseExport/

# 옵시디언 볼트에 복사
cp -r ~/Documents/MembaseExport/* ~/Documents/ObsidianVault/Membase/
```

### Obsidian Git 플러그인과 조합

옵시디언 Git 플러그인과 함께 사용하면 다음 흐름이 가능해요:

```
멤베이스 위키
    │
    │ (주기적 내보내기)
    ▼
옵시디언 볼트
    │
    │ (Obsidian Git 플러그인)
    ▼
GitHub 저장소
```

이렇게 하면 **3중 백업** 체계가 만들어져요!

---

## Gmail, 슬랙, 구글 캘린더 연동

멤베이스는 외부 앱과 연동해서 자동으로 메모리에 정보를 추가해요.

### 연동 가능한 앱

| 앱 | 가져오는 정보 |
|----|--------------|
| Gmail | 중요 이메일, 결정 사항, 약속 |
| Google Calendar | 미팅, 일정, 마감일 |
| Slack | 중요 메시지, 결정, 프로젝트 업데이트 |
| Notion | 페이지, 데이터베이스 항목 |

### Gmail 연동하기

1. [membase.so](https://membase.so) 대시보드 로그인
2. "Integrations" (연동) 탭 클릭
3. Gmail 옆 "Connect" 클릭
4. Google 계정 로그인 및 권한 허용
5. 중요 이메일 필터 설정 (선택사항)

연동 후 Gmail의 중요 이메일 내용이 자동으로 멤베이스 메모리에 추가돼요.

예시: "투자자 황성준으로부터 이메일: Series A 미팅 다음 주 화요일 3시"
→ 멤베이스 메모리에 자동 저장!

### Slack 연동하기

1. 대시보드 → Integrations → Slack
2. "Add to Slack" 클릭
3. 워크스페이스 선택 및 권한 허용
4. 모니터링할 채널 선택

중요 결정이나 액션 아이템이 Slack에서 언급되면 자동으로 메모리에 저장돼요.

### Google Calendar 연동하기

1. 대시보드 → Integrations → Google Calendar
2. Google 계정 연동
3. 캘린더 선택

미팅이나 일정이 자동으로 메모리에 추가되어, AI가 "다음 주에 무슨 일이 있어?"라는 질문에 답할 수 있게 돼요.

---

## 탈중앙화 버전으로 완전한 데이터 소유

중앙화된 서버가 불안하다면 **탈중앙화 버전(membase-mcp)**을 사용해요.

### 탈중앙화 버전의 특징

- **서버 없음**: 특정 회사의 서버에 의존하지 않음
- **블록체인 저장**: Unibase DA 네트워크에 저장
- **검증 가능**: 저장된 데이터가 변조되지 않았음을 수학적으로 증명
- **영구성**: 블록체인 특성상 데이터가 영구적으로 유지됨

### 탈중앙화 버전 설치

```bash
git clone https://github.com/unibaseio/membase-mcp.git
cd membase-mcp
pip install -r requirements.txt
```

### 사용법

```bash
# 저장된 메모리 확인
브라우저에서 열기: https://testnet.hub.membase.io/

# 계정 주소로 내 메모리 조회
https://testnet.hub.membase.io/account/0x여러분의지갑주소
```

### 일반 버전 vs 탈중앙화 버전 비교

| 항목 | 일반 버전 (membase.so) | 탈중앙화 버전 (membase-mcp) |
|------|----------------------|--------------------------|
| 저장 위치 | Membase Cloud 서버 | 블록체인 네트워크 |
| 설치 난이도 | 매우 쉬움 | 보통 |
| 기능 | 전체 기능 | 기본 기능 (저장/검색) |
| 외부 앱 연동 | ✅ Gmail, Slack 등 | ❌ |
| 지식 그래프 | ✅ | ❌ |
| 비용 | 무료 시작 가능 | 가스비 (소액) |
| 데이터 소유 | 정책으로 보장 | 수학적으로 보장 |

---

## 자동 갱신 vs 수동 업데이트

### 멤베이스가 자동으로 하는 것들

```
✅ 대화 내용 자동 저장 (Auto-Capture)
   - 5분 비활성 후 자동 저장
   - 20개 메시지 쌓이면 자동 저장

✅ 메모리 자동 불러오기 (Auto-Recall, 설정 시)
   - 모든 AI 응답 전 자동 검색
   
✅ 외부 앱 동기화 (Gmail, Slack 등 연동 시)
   - 멤베이스가 주기적으로 자동 동기화
   
✅ 지식 그래프 자동 업데이트
   - 새 정보 저장 시 관계 자동 추출
```

### 수동으로 해야 하는 것들

```
⚠️ 데이터 외부 백업 (원하는 경우)
   - membase export 명령 또는 스크립트 직접 실행
   - GitHub Actions로 자동화 가능 (한 번 설정하면 이후 자동)

⚠️ 잘못된 기억 수정
   - AI에게 "수정해줘" 또는 대시보드에서 직접 편집

⚠️ 연동 앱 최초 설정
   - Gmail, Slack 등 처음 한 번만 수동 연결
```

### 요약: 크론/스케줄러 필요한가요?

| 용도 | 크론 필요? |
|------|-----------|
| 멤베이스 기억 저장 | ❌ 자동 |
| 기억 불러오기 | ❌ 자동 |
| 외부 앱 동기화 | ❌ 자동 |
| 데이터 외부 백업 | ⚠️ 원하면 설정 가능 |

**결론**: 멤베이스를 사용하는 데는 크론이나 스케줄러가 전혀 필요 없어요. 모두 자동으로 작동해요. 단, 클라우드 외부에 데이터를 별도 백업하고 싶다면 크론 작업을 설정할 수 있어요.

---

**다음 장**: [5장: AI 에이전트에게 멤베이스 사용 지시하기](./05-agent-instructions.md)
