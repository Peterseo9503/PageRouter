# 한입 북스 (One Bite Books)

Next.js와 TypeScript로 구현된 도서 관리 및 추천 웹 애플리케이션입니다.

## 🚀 주요 기능

- 📚 전체 도서 목록 조회
- 🎯 추천 도서 표시
- 🔍 도서 검색 기능
- 📱 반응형 디자인

## 🎯 기술적 특징

### ⚡ 성능 최적화
- **SSG (Static Site Generation)**: 빌드 시점에 페이지를 생성하여 빠른 페이지 로딩 제공
- **병렬 데이터 페칭**: `Promise.all`을 활용한 효율적인 데이터 로딩
  ```typescript
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks()
  ]);
  ```

### 🔍 SEO 최적화
- **Next.js Head**: 동적 메타 태그 관리
  ```typescript
  <Head>
    <title>한입북스</title>
    <meta property="og:image" content="/thumbnail.png"/>
    <meta property="og:title" content="한입북스" />
    <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
  </Head>
  ```

### 🛠 기술 스택

#### Frontend
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** CSS Modules

#### Development Tools
- ESLint
- Prettier
- React Hooks ESLint Plugin

## 🏃‍♂️ 시작하기

### 필수 요구사항
- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 방법

1. 저장소 클론
```bash
git clone [repository-url]
cd section02
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm run dev
```

4. 브라우저에서 확인
```
http://localhost:3000
```

## 📁 프로젝트 구조

```
src/
├── components/     # 재사용 가능한 컴포넌트
├── lib/           # 유틸리티 함수 및 API 호출
├── mock/          # 목업 데이터
├── pages/         # 페이지 컴포넌트
├── styles/        # 스타일 파일
└── types.ts       # TypeScript 타입 정의
```

## 💡 주요 구현 사항

### 데이터 페칭 전략
- **SSG (Static Site Generation)**
  - 빌드 시점에 정적 페이지 생성
  - 빠른 초기 페이지 로딩
  ```typescript
  export const getStaticProps = async () => {
    const [allBooks, recoBooks] = await Promise.all([
      fetchBooks(),
      fetchRandomBooks()
    ]);
    return { props: { allBooks, recoBooks } };
  };
  ```

### 컴포넌트 최적화
- **레이아웃 컴포넌트**: 재사용 가능한 검색 레이아웃 구현
- **타입 안정성**: TypeScript를 활용한 엄격한 타입 체크
  ```typescript
  export interface BookData {
    id: number;
    title: string;
    subTitle: string;
    author: string;
    description: string;
    publisher: string;
    coverImgUrl: string;
  }
  ```

## 🔧 환경 설정

프로젝트는 코드 품질 유지를 위해 다음과 같은 도구들을 사용합니다:

- **ESLint**: 코드 품질 및 스타일 검사
- **Prettier**: 일관된 코드 포맷팅
- **TypeScript**: 정적 타입 검사

## 📝 라이선스

This project is private and proprietary.

## 👥 기여자
- 서동현

------------------------------------------------------------------------------------------------------------
✅ Page Router의 장점
폴더 구조만으로도 라우팅이 가능하다

파일 기반 라우팅으로 직관적이며 설정이 간편함

예: /pages/about.js → /about 경로 자동 매핑

다양한 방식의 사전 렌더링 제공

FCP(First Contentful Paint)를 해결하기 위해 적절한 렌더링 방식 선택 가능

✅ SSR, SSG, ISR 세 가지 방식 제공:

🔹 1. SSR (Server-Side Rendering)
요청 시마다 서버에서 HTML을 동적으로 생성해 클라이언트에 전달

장점: 항상 최신 데이터를 반영할 수 있음

단점: 요청마다 서버 렌더링 → 느릴 수 있음

🔹 2. SSG (Static Site Generation)
빌드 타임에 HTML 파일을 미리 생성

장점: 빠른 응답 속도 (CDN 활용 용이)

단점: 빌드 이후에는 변경사항이 반영되지 않음

🔹 3. ISR (Incremental Static Regeneration)
SSG 방식이지만, 설정한 유효시간이 지나면 새로운 페이지를 백그라운드에서 재생성

예: revalidate: 10 → 10초 후 최초 요청 시 다시 생성

게시글처럼 자주 바뀌지 않지만 때때로 갱신되어야 하는 페이지에 적합

on-demand revalidation도 지원하여 API 호출로 수동 갱신 가능

Next.js에 최적화된 미들웨어, API 라우팅 등 확장 기능 지원

/pages/api 폴더를 통해 간단한 백엔드 기능도 가능

❗ Page Router의 단점
페이지별 레이아웃 설정이 번거롭다

공통 레이아웃을 적용하려면 _app.js에 직접 작성하거나 getLayout 패턴을 사용해야 함

데이터 페칭이 페이지 컴포넌트에 집중된다

getServerSideProps, getStaticProps, getInitialProps 등은 페이지에서만 사용 가능

재사용이 어렵고, 비즈니스 로직과 UI 코드가 섞이기 쉬움

불필요한 컴포넌트까지 JS 번들에 포함된다

코드 스플리팅이 어려운 구조 → 초기 로딩 시 JS 크기 증가

하이드레이션 이후 TTI(Time to Interactive)가 늦어질 수 있다

하이드레이션 비용이 큰 페이지는 사용자가 인터랙션 가능한 상태까지 시간이 더 소요될 수 있음

복잡한 동적 라우팅 처리 시 한계가 있다

중첩된 레이아웃 또는 병렬 라우팅(예: @modal, @feed 등)은 App Router 구조에서 더 자연스럽게 지원됨

