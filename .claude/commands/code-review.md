# 코드 리뷰 오케스트레이터

현재 브랜치의 변경 사항에 대해 종합적인 코드 리뷰를 수행합니다.

## 개요

이 스킬은 다음 서브 스킬들을 순차적으로 실행하여 종합 리뷰 보고서를 생성합니다:

1. **변경 사항 보고서** (`review/change-report`)
2. **코드 리뷰** (`review/code-review`)
3. **코드 구조 정비** (`review/code-split`)
4. **i18n 체크** (`review/i18n-check`)

## 실행 지침

### 1단계: 브랜치 상태 확인

```bash
# 현재 브랜치 확인
CURRENT_BRANCH=$(git branch --show-current)

# base 브랜치는 항상 origin/dev
BASE_BRANCH="origin/dev"

echo "Base branch: $BASE_BRANCH"

# 현재 브랜치에만 있는 커밋 확인 (merge 커밋 제외)
git log --oneline --no-merges $BASE_BRANCH..HEAD

# 커밋되지 않은 변경사항 확인
git status --short
```

**중요**:

- base 브랜치는 항상 `origin/dev`입니다
- `BASE_BRANCH..HEAD`로 현재 브랜치에만 있는 커밋을 찾습니다
- `--no-merges`로 merge 커밋은 제외합니다 (실제 작업 커밋만 포함)
- 커밋된 변경사항과 아직 커밋되지 않은 변경사항(git status) 모두 리뷰 대상입니다
- 만약 커밋이 너무 많다면 (10개 이상), 사용자에게 확인하세요

변경 사항이 없으면 "리뷰할 변경 사항이 없습니다" 메시지를 출력하고 종료하세요.

### 2단계: 변경 사항 분석

```bash
# base 브랜치는 항상 origin/dev
BASE_BRANCH="origin/dev"

# 현재 브랜치에만 있는 커밋 내역 (merge 커밋 제외)
git log --oneline --no-merges $BASE_BRANCH..HEAD

# 변경 통계
git diff $BASE_BRANCH...HEAD --stat

# 변경 파일 목록
git diff $BASE_BRANCH...HEAD --name-status

# 전체 변경 내용 확인 (필요시)
git diff $BASE_BRANCH...HEAD

# 커밋되지 않은 변경사항도 함께 확인
git diff HEAD --stat
git diff HEAD
```

**리뷰 범위**:

1. **커밋된 변경사항**: `origin/dev...HEAD` (현재 브랜치에서 직접 작성한 커밋만)
2. **커밋되지 않은 변경사항**: `git diff HEAD` (staged + unstaged)

**중요**: `git diff A...B` (세 개의 점)을 사용하면 merge-base를 자동으로 찾아서 비교합니다.

변경 사항을 카테고리별로 분류하고 요약하세요.

### 3단계: 코드 리뷰 수행

변경된 코드를 다음 관점에서 분석하세요:

- 🔒 보안
- ⚡ 성능
- 🏗️ 코드 품질
- 📐 아키텍처
- 🎯 React 베스트 프랙티스
- 📁 코드 구조 (파일이 너무 길거나 복잡한 경우 분리 제안)
- 🌐 i18n (하드코딩된 한글 문자열 발견 시 지적)

### 4단계: 종합 보고서 생성

모든 분석 결과를 다음 형식으로 통합하세요:

```markdown
# 📋 코드 리뷰 종합 보고서

**브랜치**: `feature/xxx`
**리뷰 일시**: YYYY-MM-DD HH:MM
**커밋 수**: N개 (+ N개 커밋 안 됨) | **변경 파일**: N개

---

## 📌 작업 요약

> 이 브랜치에서 수행한 작업을 자연어로 1-2문장으로 요약합니다.
> 예: "사용자 로그인 페이지에 소셜 로그인 기능을 추가하고, 기존 비밀번호 찾기 플로우를 개선했습니다."

**리뷰 범위**:

- ✅ 커밋된 변경사항: `origin/dev...HEAD` (현재 브랜치에서 직접 작성한 커밋만)

---

## 🔍 빠른 요약

| 항목      | 상태                                  | 비고 |
| --------- | ------------------------------------- | ---- |
| 코드 품질 | 🟢 양호 / 🟡 개선 필요 / 🔴 문제 있음 |      |

---

## 📝 변경 사항 요약

> 이 브랜치에서 수행된 작업 요약

### 주요 변경

- [변경 1]
- [변경 2]

### 기타 변경

- [변경 1]

---

## 🔍 코드 리뷰 결과

### 🚨 중요 이슈 (반드시 수정)

(있는 경우에만 표시)

#### 1. [이슈 제목]

- **파일**: `src/xxx.tsx:15`
- **카테고리**: 보안/성능/코드품질
- **문제**: 문제 설명
- **제안**: 수정 방법

### ⚠️ 개선 권장

(있는 경우에만 표시)

### 💡 선택적 개선

(있는 경우에만 표시)

### ✅ 잘된 점

- [칭찬 1]
- [칭찬 2]

---

## 📊 최종 평가

### 점수

| 항목      | 점수     |
| --------- | -------- |
| 보안      | N/10     |
| 성능      | N/10     |
| 코드 품질 | N/10     |
| 아키텍처  | N/10     |
| **종합**  | **N/10** |

### 결론

> 전체적인 리뷰 결론 및 권장 사항

### 체크리스트

- [ ] 중요 이슈 해결
- [ ] 개선 권장 사항 검토

---

_이 보고서는 `/code-review` 스킬로 자동 생성되었습니다._
```

### 5단계: 리포트 저장

종합 보고서를 생성한 후 반드시 `.claude/reports` 폴더에 저장하세요.

```bash
# .claude/reports 폴더 생성 (없는 경우)
mkdir -p .claude/reports

# 파일명: code-review_브랜치명_날짜.md
BRANCH_NAME=$(git branch --show-current)
DATE=$(date +%Y%m%d_%H%M%S)
REPORT_FILE=".claude/reports/code-review_${BRANCH_NAME}_${DATE}.md"

# Write 도구를 사용하여 리포트 저장
# (리포트 내용을 $REPORT_FILE에 저장)
```

**중요**:
- 파일명 형식: `code-review_브랜치명_YYYYMMDD_HHMMSS.md`
- 예시: `.claude/reports/code-review_feature-HMW-677_20260125_143022.md`
- Write 도구를 사용하여 리포트를 파일로 저장
- 저장 후 사용자에게 파일 경로 안내
- `.claude/reports/` 폴더는 이미 .gitignore에 등록되어 있음

## 출력 규칙

1. **한글로 작성**
2. 이슈가 없는 섹션은 생략
3. 심각도 순으로 이슈 정렬 (높음 → 낮음)
4. 각 이슈에 구체적인 파일 경로와 라인 번호 포함
5. 개선 제안은 코드 예시와 함께 제공
6. 긍정적인 피드백도 포함

## 사용 예시

```
/code-review
```

브랜치의 모든 변경 사항에 대해 종합 리뷰를 수행합니다.
