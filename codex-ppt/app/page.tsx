"use client";

import { useState, useEffect, useCallback } from "react";

function CoverSlide() {
  return (
    <div
      className="flex flex-col items-center justify-center h-full text-center px-8"
      style={{
        background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 40%, #4338ca 100%)",
      }}
    >
      <div className="mb-6">
        <span
          className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-indigo-200 border border-indigo-400"
          style={{ background: "rgba(99,102,241,0.2)" }}
        >
          Codex 완전 가이드
        </span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
        화면 제어 기능
        <br />
        <span style={{ color: "#a5b4fc" }}>3가지 완전 정리</span>
      </h1>
      <p className="text-lg md:text-xl text-indigo-200 mb-10 max-w-xl">
        @Browser · @Chrome · @Computer
        <br />
        언제 무엇을 써야 하는지 한눈에 파악합니다
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {["@Browser", "@Chrome", "@Computer"].map((tag) => (
          <span
            key={tag}
            className="px-5 py-2 rounded-full text-sm font-bold text-white"
            style={{
              background: "rgba(99,102,241,0.35)",
              border: "1px solid rgba(165,180,252,0.4)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-16 text-indigo-300 text-sm animate-pulse">
        → 또는 키보드 화살표 키로 이동
      </p>
    </div>
  );
}

function OverviewSlide() {
  const rows = [
    {
      feature: "@Browser",
      color: "#6366f1",
      target: "Codex 내부 브라우저",
      login: "지원 안 함",
      usecase: "로컬 웹사이트 개발·테스트",
    },
    {
      feature: "@Chrome",
      color: "#0ea5e9",
      target: "사용자의 Chrome",
      login: "사용 가능",
      usecase: "Gmail, LinkedIn 등 로그인 사이트",
    },
    {
      feature: "@Computer",
      color: "#10b981",
      target: "Mac·Windows 전체",
      login: "사용 가능",
      usecase: "Finder, Notes, 데스크톱 앱 전체",
    },
  ];

  return (
    <div
      className="flex flex-col h-full px-6 md:px-14 py-10"
      style={{ background: "linear-gradient(160deg, #f8fafc 0%, #e0e7ff 100%)" }}
    >
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
          Overview
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1">
          3가지 기능 한눈에 비교
        </h2>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-4">
        {rows.map((row, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-2xl p-5 shadow-sm"
            style={{ background: "white", border: `2px solid ${row.color}22` }}
          >
            <div className="flex-shrink-0 w-28 md:w-36">
              <span
                className="inline-block px-3 py-1 rounded-lg text-sm font-bold text-white"
                style={{ background: row.color }}
              >
                {row.feature}
              </span>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
              <div>
                <span className="text-slate-400 text-xs block mb-0.5">조작 대상</span>
                <span className="font-semibold text-slate-700">{row.target}</span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block mb-0.5">로그인</span>
                <span
                  className={`font-semibold ${
                    row.login === "사용 가능" ? "text-emerald-600" : "text-red-400"
                  }`}
                >
                  {row.login}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-xs block mb-0.5">적합한 용도</span>
                <span className="font-semibold text-slate-700">{row.usecase}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-6 p-4 rounded-xl text-sm text-indigo-700 font-medium"
        style={{
          background: "rgba(99,102,241,0.08)",
          border: "1px solid rgba(99,102,241,0.2)",
        }}
      >
        💡 <strong>한 줄 요약:</strong> 웹 테스트 → @Browser, 로그인 사이트 → @Chrome, 컴퓨터 전체 → @Computer
      </div>
    </div>
  );
}

function BrowserSlide() {
  return (
    <div
      className="flex flex-col h-full px-6 md:px-14 py-10"
      style={{ background: "linear-gradient(160deg, #eef2ff 0%, #e0e7ff 100%)" }}
    >
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">
          Slide 02
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 flex items-center gap-3 flex-wrap">
          <span
            className="inline-block px-4 py-1 rounded-xl text-white text-2xl font-bold"
            style={{ background: "#6366f1" }}
          >
            @Browser
          </span>
          Codex 내부 브라우저
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: "white" }}>
            <h3 className="font-bold text-slate-700 mb-3">설정 방법</h3>
            <ol className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-indigo-500 font-bold">1.</span>Settings → Browser로 이동
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 font-bold">2.</span>Browser plugin 설치·활성화
              </li>
              <li className="flex gap-2">
                <span className="text-indigo-500 font-bold">3.</span>새 대화에서 @Browser 입력
              </li>
            </ol>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
              단축키:{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                ⌘⇧B
              </kbd>{" "}
              (Mac) /{" "}
              <kbd className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-mono">
                Ctrl+Shift+B
              </kbd>{" "}
              (Win)
            </div>
          </div>

          <div className="rounded-2xl p-5 shadow-sm" style={{ background: "white" }}>
            <h3 className="font-bold text-slate-700 mb-3">가능 / 불가능</h3>
            <div className="space-y-1.5 text-sm">
              {["클릭, 입력, 스크린샷", "화면 상태 확인, 파일 다운로드"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  <span className="text-slate-600">{t}</span>
                </div>
              ))}
              {["로그인 불가", "Chrome 쿠키·확장 프로그램 없음"].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <span className="text-red-400">✗</span>
                  <span className="text-slate-500">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-2xl p-5 shadow-sm flex flex-col" style={{ background: "white" }}>
          <h3 className="font-bold text-slate-700 mb-3">활용 예시</h3>
          <div className="space-y-3 flex-1">
            <div
              className="rounded-xl p-3 text-sm font-mono leading-relaxed"
              style={{ background: "#eef2ff", color: "#4338ca" }}
            >
              @Browser http://localhost:3000 을 열고
              <br />
              모바일 화면에서 버튼이 잘리는 문제를
              <br />
              찾아 수정해줘. 수정 후 다시 확인해줘.
            </div>
            <div
              className="rounded-xl p-3 text-sm font-mono leading-relaxed"
              style={{ background: "#eef2ff", color: "#4338ca" }}
            >
              @Browser 이 웹페이지를 데스크톱과
              <br />
              모바일 크기로 확인하고 레이아웃이
              <br />
              깨지는 부분의 스크린샷을 보여줘.
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold text-indigo-600"
              style={{ background: "#e0e7ff" }}
            >
              사용자 Chrome과 완전히 분리된 별도 브라우저
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChromeSlide() {
  return (
    <div
      className="flex flex-col h-full px-6 md:px-14 py-10"
      style={{ background: "linear-gradient(160deg, #f0f9ff 0%, #bae6fd 100%)" }}
    >
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-sky-500">
          Slide 03
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 flex items-center gap-3 flex-wrap">
          <span
            className="inline-block px-4 py-1 rounded-xl text-white text-2xl font-bold"
            style={{ background: "#0ea5e9" }}
          >
            @Chrome
          </span>
          로그인된 Chrome 브라우저
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: "white" }}>
            <h3 className="font-bold text-slate-700 mb-3">설정 방법</h3>
            <ol className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold">1.</span>Plugins → Chrome 플러그인 추가
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold">2.</span>Codex Chrome Extension 설치
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold">3.</span>확장 프로그램에서{" "}
                <strong>Connected</strong> 확인
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500 font-bold">4.</span>새 Codex 대화 시작
              </li>
            </ol>
          </div>

          <div className="rounded-2xl p-5 shadow-sm" style={{ background: "white" }}>
            <h3 className="font-bold text-slate-700 mb-3">새 사이트 접근 시 권한 선택</h3>
            <div className="space-y-2 text-sm">
              {[
                {
                  label: "이번 대화에서만 허용",
                  bg: "#fefce8",
                  border: "#fde047",
                  color: "#92400e",
                },
                {
                  label: "해당 사이트 항상 허용",
                  bg: "#f0f9ff",
                  border: "#7dd3fc",
                  color: "#0369a1",
                },
                { label: "거부", bg: "#fef2f2", border: "#fca5a5", color: "#b91c1c" },
              ].map((opt) => (
                <div
                  key={opt.label}
                  className="px-3 py-2 rounded-lg text-sm font-medium"
                  style={{
                    background: opt.bg,
                    border: `1px solid ${opt.border}`,
                    color: opt.color,
                  }}
                >
                  {opt.label}
                </div>
              ))}
            </div>
            <p className="mt-3 text-xs text-slate-400">
              보안을 위해 Codex 전용 Chrome 프로필 생성을 권장합니다
            </p>
          </div>
        </div>

        <div className="rounded-2xl p-5 shadow-sm flex flex-col" style={{ background: "white" }}>
          <h3 className="font-bold text-slate-700 mb-3">활용 예시</h3>
          <div className="space-y-3 flex-1 text-sm">
            <div
              className="rounded-xl p-3 font-mono leading-relaxed"
              style={{ background: "#f0f9ff", color: "#0369a1" }}
            >
              @Chrome Gmail을 열고 오늘 받은
              <br />
              이메일 중 답장이 필요한 것만 찾아
              <br />
              답장 초안을 작성해줘.
              <br />
              보내지는 말고 초안만 만들어줘.
            </div>
            <div
              className="rounded-xl p-3 font-mono leading-relaxed"
              style={{ background: "#f0f9ff", color: "#0369a1" }}
            >
              @Chrome LinkedIn에서 지난 일주일
              <br />
              받은 메시지를 확인하고 간호사
              <br />
              채용 관련 메시지만 표로 정리해줘.
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-100">
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: "#e0f2fe", color: "#0284c7" }}
            >
              내 Chrome 로그인 상태 그대로 사용 가능
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ComputerSlide() {
  return (
    <div
      className="flex flex-col h-full px-6 md:px-14 py-10"
      style={{ background: "linear-gradient(160deg, #f0fdf4 0%, #bbf7d0 100%)" }}
    >
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
          Slide 04 · 05
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mt-1 flex items-center gap-3 flex-wrap">
          <span
            className="inline-block px-4 py-1 rounded-xl text-white text-2xl font-bold"
            style={{ background: "#10b981" }}
          >
            @Computer
          </span>
          컴퓨터 전체 제어 + 요약
        </h2>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: "white" }}>
            <h3 className="font-bold text-slate-700 mb-3">설정 방법 (Mac)</h3>
            <ol className="space-y-2 text-sm text-slate-600">
              <li className="flex gap-2">
                <span className="text-emerald-600 font-bold">1.</span>Settings → Computer Use
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 font-bold">2.</span>Install 클릭
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 font-bold">3.</span>권한 허용:{" "}
                <strong>화면 기록 + 손쉬운 사용</strong>
              </li>
              <li className="flex gap-2">
                <span className="text-emerald-600 font-bold">4.</span>@Computer로 사용 시작
              </li>
            </ol>
          </div>

          <div className="rounded-2xl p-5 shadow-sm" style={{ background: "white" }}>
            <h3 className="font-bold text-slate-700 mb-2">안전하게 요청하는 공식</h3>
            <div
              className="rounded-xl p-3 text-xs font-mono leading-relaxed"
              style={{ background: "#f0fdf4", color: "#065f46" }}
            >
              @Computer
              <br />
              사용할 앱: Finder와 Obsidian
              <br />
              수행할 작업: MD 파일을 MyWiki로 옮기기
              <br />
              최종 결과: 주제별 폴더에 정리된 상태
              <br />
              확인 필요: 삭제·덮어쓰기·이름 변경 전 질문
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl p-5 shadow-sm" style={{ background: "white" }}>
            <h3 className="font-bold text-slate-700 mb-3">활용 예시</h3>
            <div
              className="rounded-xl p-3 text-xs font-mono leading-relaxed mb-2"
              style={{ background: "#f0fdf4", color: "#065f46" }}
            >
              @Computer Finder를 열고 Downloads의
              <br />
              PDF를 연도별 폴더로 분류해줘.
              <br />
              삭제 전 먼저 확인해줘.
            </div>
            <div
              className="p-3 rounded-xl text-xs"
              style={{ background: "#fef3c7", color: "#92400e" }}
            >
              ⚠️ Windows: 마우스·키보드가 직접 움직임
              <br />
              Mac: 같은 앱 동시 조작 시 충돌 가능
            </div>
          </div>

          <div
            className="rounded-2xl p-5 shadow-sm"
            style={{ background: "linear-gradient(135deg, #1e1b4b, #4338ca)" }}
          >
            <h3 className="font-bold text-white mb-3">최종 한 줄 요약</h3>
            <div className="space-y-2 text-sm">
              {[
                { tag: "@Browser", desc: "웹 개발 테스트", color: "#a5b4fc" },
                { tag: "@Chrome", desc: "로그인된 사이트", color: "#7dd3fc" },
                { tag: "@Computer", desc: "Finder·Obsidian 등 전체 앱", color: "#6ee7b7" },
              ].map((item) => (
                <div key={item.tag} className="flex items-center gap-3">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{ background: item.color + "33", color: item.color }}
                  >
                    {item.tag}
                  </span>
                  <span className="text-indigo-100">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SLIDE_COMPONENTS = [
  CoverSlide,
  OverviewSlide,
  BrowserSlide,
  ChromeSlide,
  ComputerSlide,
];
const TOTAL = SLIDE_COMPONENTS.length;

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"forward" | "back">("forward");
  const [animKey, setAnimKey] = useState(0);

  const goTo = useCallback((idx: number, dir: "forward" | "back") => {
    if (idx < 0 || idx >= TOTAL) return;
    setDirection(dir);
    setAnimKey((k) => k + 1);
    setCurrent(idx);
  }, []);

  const next = useCallback(() => goTo(current + 1, "forward"), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1, "back"), [current, goTo]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const SlideComponent = SLIDE_COMPONENTS[current];
  const animClass =
    direction === "forward" ? "animate-slide-right" : "animate-slide-left";

  return (
    <div className="flex flex-col h-screen" style={{ background: "#1e1b4b" }}>
      <div className="flex-1 relative overflow-hidden m-3 md:m-5 rounded-3xl shadow-2xl">
        <div key={animKey} className={`absolute inset-0 ${animClass}`}>
          <SlideComponent />
        </div>
      </div>

      {/* Navigation bar */}
      <div className="flex items-center justify-between px-6 pb-4 pt-2">
        <button
          onClick={prev}
          disabled={current === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{
            background:
              current === 0 ? "transparent" : "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          ← 이전
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: TOTAL }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "forward" : "back")}
              className="transition-all rounded-full cursor-pointer"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                background:
                  i === current ? "#a5b4fc" : "rgba(255,255,255,0.3)",
              }}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          disabled={current === TOTAL - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
          style={{
            background:
              current === TOTAL - 1
                ? "transparent"
                : "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          다음 →
        </button>
      </div>

      <div className="text-center pb-3">
        <span className="text-xs" style={{ color: "rgba(165,180,252,0.5)" }}>
          ← → 화살표 키 또는 스페이스바로 이동 &nbsp;|&nbsp; {current + 1} / {TOTAL}
        </span>
      </div>
    </div>
  );
}
