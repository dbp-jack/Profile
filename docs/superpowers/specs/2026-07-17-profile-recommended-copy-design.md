# Profile 추천 문구 세트 설계

## 목표

마스터 포트폴리오의 기본 Profile 문구는 유지하면서, 로컬 관리 페이지에서 멘토 피드백을 반영한 성능·동시성 검증 중심 문구를 독립된 추천 세트로 선택할 수 있게 한다.

## 적용 기준

- 출처: `S1-01`, `S1-11`, `S1-12`, `S2-P05`, `S2-P07`
- 통합 규칙: `PF-01`, `PF-07`, `PF-11`, `PF-12`
- 박재만 강사 PDF의 이력서 피드백인 `S2-R`과 사용자 이력서 가이드인 `U-R`은 현재 범위에 적용하지 않는다.
- 기업별 문구와 뱅카우 내용은 Profile에 넣지 않고 기존 `Direction`에서만 다룬다.

## 검토한 접근

1. 기존 `backend-impact` 문구를 교체: 구현은 가장 작지만 이 문구를 사용하는 기존 프로젝트·기업 프리셋까지 함께 바뀐다.
2. 독립 추천 문구 세트 추가: 기본값과 기존 프리셋을 유지하면서 필요할 때만 명시적으로 선택할 수 있다. 이 방식을 채택한다.
3. Profile 제목만 바꾸는 별도 토글: 빠르게 교체할 수 있지만 Strengths와 Projects의 보조 문구가 기본형으로 남아 서사가 섞일 수 있다.

## 확정 문구

문구 세트 이름:

`성능·동시성 검증 중심`

설명:

`FeedShop의 응답 지연과 투표 동시성 검증 경험을 앞에 배치합니다.`

Profile:

`성능 병목과 동시성 문제를 수치와 테스트로 검증하는 백엔드 개발자`

Strengths 소개:

`응답 지연과 동시성 문제를 지표와 테스트로 재현하고, 데이터 정합성과 서비스 안정성을 검증합니다.`

Projects 소개:

`성능 병목과 동시성 문제를 어떤 지표와 테스트로 확인하고 해결했는지 보여드립니다.`

## 데이터 설계

- `src/portfolio-builder/copy-profiles.ts`의 `COPY_PROFILES`에 새 항목을 추가한다.
- 새 ID는 `performance-validation`으로 고정한다.
- `PortfolioCopyProfile`에 선택적 `recommended` 메타데이터를 추가하고 새 항목에만 `true`를 지정한다.
- `DEFAULT_COPY_PROFILE`은 기존 `default`를 유지한다.
- 기존 `backend-impact`, `event-driven`의 ID와 문구는 변경하지 않는다.
- `PUBLIC_PRESETS`, `COMPANY_PUBLIC_PRESETS`에는 새 ID를 연결하지 않는다. 새 문구는 관리 페이지에서 직접 선택할 때만 적용한다.

## 관리 페이지 설계

- 수정 위치: `src/pages/manage/page.tsx`의 `문구 세트` 영역.
- 새 문구 카드에만 `추천` 상태를 표시한다.
- 각 문구 카드에서 실제 `heroRoleTitle`을 확인할 수 있게 짧은 미리보기 문장을 표시한다.
- 선택 시 기존 `updateCopyProfile` 흐름과 로컬 저장소 키를 그대로 사용한다.
- 생성 주소는 기존 쿼리 규칙에 따라 `?copy=performance-validation`을 포함한다.
- 잘못되거나 삭제된 문구 ID는 기존 `getCopyProfile` 동작에 따라 기본 문구로 복구한다.

## 적용 범위와 호환성

- 마스터 포트폴리오의 기본 Profile 문구는 `수치로 검증하고, 팀 흐름을 움직이는 백엔드 개발자`로 통일한다.
- 새 세트를 선택하면 Profile, Strengths 소개, Projects 소개가 함께 바뀐다.
- 기존 저장값과 공유 링크는 그대로 동작한다.
- 기본 `/pdf`는 마스터 문구를 사용하는 현재 구조를 유지한다. 이번 범위에서 관리 페이지용 문구 세트를 PDF 쿼리와 연결하지 않는다.

## 변경하지 않는 범위

- Profile 사진, 이름, 연락처, GitHub·LinkedIn 링크
- Profile 기술 스택과 레이아웃
- 기존 공개·기업 프리셋 구성
- Direction과 뱅카우 문구
- 이력서 규칙과 이력서 파일
- 회사별 PDF 생성 기능

## 검증 기준

- 기본 포트폴리오를 열면 기존 Profile 문구가 그대로 보인다.
- 로컬 관리 페이지에 새 문구 세트와 `추천` 표시, 실제 Profile 문구 미리보기가 보인다.
- 새 세트를 선택하면 미리보기의 Profile, Strengths 소개, Projects 소개가 확정 문구로 바뀐다.
- 새 세트를 선택한 공개 주소에 `copy=performance-validation`이 포함된다.
- 새 주소를 직접 열어도 같은 세 문구가 적용된다.
- 페이지를 새로고침해도 선택값이 로컬 저장소에서 복원된다.
- 기존 `backend-impact`, `event-driven`과 모든 기존 프리셋의 문구·선택 결과가 바뀌지 않는다.
- 데스크톱과 모바일 관리 화면에서 카드 문구가 넘치거나 버튼을 밀어내지 않는다.
- `npm run lint`, `npm run build`가 통과한다.
