# i18n 체크 스킬

변경된 코드에서 하드코딩된 한글 문자열을 찾아 i18n 적용을 권장합니다.

## 프로젝트 i18n 구조

```
src/locales/ko/
  common.json      # 공통
  auth.json        # 인증
  health.json      # 건강
  mission.json     # 미션
  challenge.json   # 챌린지
  my.json          # 마이페이지
  ...
```

### 사용 패턴

```tsx
import { t } from "i18n"

// 사용
t("mission.common.confirm")
t("health.checkup.title", { name: "홍길동" })
```

## 실행 지침

### 1단계: 변경된 파일 확인

```bash
MERGE_BASE=$(git merge-base dev HEAD)

# 변경된 tsx 파일
git diff $MERGE_BASE..HEAD --name-only --diff-filter=ACMR | grep "\.tsx$"
```

### 2단계: 하드코딩 문자열 탐지

변경된 코드에서 다음 패턴을 찾으세요:

**하드코딩으로 간주:**
- JSX 내 한글 텍스트: `<div>안녕하세요</div>`
- 속성 내 한글: `placeholder="이름을 입력하세요"`
- 문자열 변수: `const title = "제목"`

**하드코딩이 아닌 경우 (무시):**
- `t()` 함수로 감싸진 경우
- 주석 내 한글
- console.log 내 한글
- 개발용 더미 데이터

### 3단계: 리뷰 내용 작성

하드코딩된 문자열이 있으면 코드 리뷰에 추가:

```markdown
### 🌐 i18n 미적용

#### [파일명]

- **파일**: `src/features/xxx/pages/xxx-page.tsx:25`
- **현재 코드**: `<Button>확인</Button>`
- **권장**: `<Button>{t("common.confirm")}</Button>`

| 라인 | 현재 | 권장 키 |
|------|------|---------|
| 25 | "확인" | common.confirm |
| 42 | "취소" | common.cancel |
| 58 | "미션 완료" | mission.common.complete |
```

### 권장 키 네이밍

```
{도메인}.{카테고리}.{항목}

예시:
- mission.common.confirm      # 미션 공통 - 확인
- health.checkup.title        # 건강 검진 - 제목
- common.button.submit        # 공통 버튼 - 제출
```

## 출력 규칙

1. 하드코딩이 없으면 이 섹션 생략
2. 기존 locales 파일의 키가 있으면 해당 키 제안
3. 새 키가 필요하면 네이밍 규칙에 맞게 제안
4. 코드 리뷰 보고서의 "개선 권장" 섹션에 추가
