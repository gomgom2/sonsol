# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

손솔 국회의원의 **월간 웹진(월간손솔)** 정적 HTML 사이트. 매달 새 호를 발행하며, 기존 `index.html`을 복사해 내용을 교체하는 방식으로 제작.

- 빌드 시스템/패키지 매니저 없음 — 순수 HTML/CSS/JS 정적 파일
- 외부 의존성: Swiper.js (CDN), Google Fonts (CDN)

## 파일 구조와 역할

```
index.html          # 현재 공개 호 (최신 월호)
index_YYMM.html     # 해당 월 초안/백업 (예: index_2603.html = 2026년 3월호)
list.html           # 전체 호 목록 페이지
support.html        # 후원 안내 페이지
css/style.css       # 전체 스타일 (font.css import 포함)
css/font.css        # 웹폰트 정의 (Pretendard, Paperozi, Presentation)
js/script.js        # 플립카드 컴포넌트 (initFlipCard)
contents/           # 현재 호 미디어 파일 (이미지 .jpg, 영상 .mov)
images/             # 로고 등 공통 이미지
```

## 새 호 제작 방법

1. `index.html`을 복사해 `index_YYMM.html`로 저장 (초안 작업용)
2. 내용 교체 후 완성되면 `index.html`로 최종 반영
3. `contents/` 폴더에 해당 호 미디어 파일 배치

미디어 파일 명명 규칙:
- 슬라이드 이미지: `{섹션번호}-{슬라이드번호}.jpg` (예: `1-3.jpg`, `6-2.jpg`)
- 슬라이드 영상: `{섹션번호}-{슬라이드번호}.mov` (예: `1-1.mov`, `2-3.mov`)
- 일정 몰아보기 슬라이더: `{YYMM}_slide_{번호}.jpg` (예: `2603_slide_1.jpg`)
- 커버/썸네일: `main_visual.jpg`, `thumb.jpg`

## HTML 섹션 구조 패턴

각 호는 `<main class="main-page">` 안에 아래 섹션들로 구성:

| 섹션 | 클래스 | 용도 |
|------|--------|------|
| 커버 | `main-visual` | 표지 이미지 + 제목 + SVG 로고 마스크 |
| 커버스토리 | `content first-content` | 첫 번째 주요 콘텐츠 |
| 일반 섹션 | `content pride-{color}` | 나머지 콘텐츠 섹션 |
| 일정 | `content month` | 월별 일정 슬라이더 + 목록 |
| 후원 | `content support green` id="support" | 후원 안내 (고정) |

섹션 배경색 클래스 (`pride-` 계열):
- `pride-red` (#e50000), `pride-orange` (#ff8d00), `pride-yellow` (#ffee00, 검정 글자)
- `pride-green` (#028121), `pride-blue` (#004cff), `pride-purple`

## 슬라이드 컴포넌트 패턴

Swiper.js로 구동되며, 모든 `.slide-container`에 자동 초기화됨.

**이미지 슬라이드:**
```html
<div class="slide-item swiper-slide">
  <figure><img src="contents/N-N.jpg" /></figure>
  <div class="slide-item-text">
    <h4>제목</h4>
    <p>본문</p>
  </div>
</div>
```

**영상 슬라이드 (전체 화면형):**
```html
<div class="slide-item full-item swiper-slide">
  <video autoplay="" loop="" preload="" muted="" playsinline="" width="100%" class="movie">
    <source src="contents/N-N.mov" type="video/mp4">
  </video>
</div>
```

**대화 형식 텍스트** (솔직담백 섹션 등):
```html
<span class="label">발화자</span> 대화내용
```

## 콘텐츠 타입 구분 기준

사용자가 제공하는 콘텐츠 노트에서:
- `(N-N)` 표기 → 이미지 파일 (`.jpg`)
- `(N-N 영상)` 또는 `(N-N 릴스영상)` 표기 → 영상 파일 (`.mov`)

## 일정 섹션 구조

```html
<section class="content month">
  <!-- 사진 슬라이더: 2603_slide_1.jpg ~ 2603_slide_N.jpg -->
  <div class="slider">
    <div class="slide-container slider-4"> ... </div>
  </div>
  <!-- 날짜별 텍스트 목록 -->
  <div class="month-list">
    <ul>
      <li>
        <span class="date">3.1</span>
        <div>일정 내용<br>일정 내용</div>
      </li>
    </ul>
  </div>
</section>
```

## 메타 정보 업데이트 체크리스트 (새 호 작성 시)

- `og:title`: `월간손솔 N월호`
- `og:url`: `https://sonsol.kr/YYMM/`
- `<h1>` (표지 메인 카피)
- `<p>` 의정보고서 날짜: `2026년 N월호`
- 각 섹션 `<h6>`: `월간손솔 N월호`
- 일정 섹션 제목: `손솔의 N월 일정` / `손솔의 N월 몰아보기`
