# 코드 스플릿 정비 스킬

변경된 파일에서 복잡도가 높거나 구조 정리가 필요한 코드를 분석하고 리뷰 내용을 제공합니다.

## 분리 대상 기준

### ⚠️ 분리가 필요한 경우

1. **한 파일에 여러 컴포넌트**
   - 메인 컴포넌트 외에 서브 컴포넌트가 2개 이상 있는 경우
   - 단, 작은 내부 컴포넌트(10줄 이하)는 예외

2. **파일이 너무 긴 경우**
   - 컴포넌트 파일이 300줄 이상
   - 유틸/훅 파일이 200줄 이상

3. **복잡도가 높은 경우**
   - 하나의 컴포넌트에 로직, 스타일, 타입이 과도하게 섞임
   - 커스텀 훅이 컴포넌트 파일 안에 정의됨
   - 상수/타입 정의가 50줄 이상

### ✅ 분리가 불필요한 경우

- 파일 길이가 적당하고 응집도가 높은 경우
- 내부에서만 사용되는 작은 헬퍼 함수
- 한 곳에서만 쓰이는 간단한 타입

## 분리 방식

### 기본 (각 분류가 1개 파일일 때)

```
tabs/
  index.tsx           # 메인 컴포넌트
  tabs.types.ts       # 타입 1개
  tabs.utils.ts       # 유틸 1개
  use-tabs.ts         # 훅 1개
```

### 같은 분류가 여러 파일일 때 → 폴더로 분리

```
tabs/
  index.tsx
  types/              # 타입 파일이 여러 개
    tab-item.types.ts
    tab-panel.types.ts
  utils/              # 유틸 파일이 여러 개
    format.ts
    calculate.ts
  hooks/              # 훅이 여러 개
    use-tab-state.ts
    use-tab-navigation.ts
  components/         # 서브 컴포넌트가 여러 개
    tab-item.tsx
    tab-panel.tsx
```

> 파일명은 **케밥 케이스** 사용 (예: `tab-item.tsx`, `use-tabs.ts`)

## 실행 지침

### 1단계: 변경된 파일 확인

```bash
MERGE_BASE=$(git merge-base dev HEAD)

# 변경된 tsx/ts 파일
git diff $MERGE_BASE..HEAD --name-only --diff-filter=ACMR | grep -E "\.(tsx?|ts)$"
```

### 2단계: 복잡도 분석

변경된 파일을 읽고 다음을 확인:

1. **파일 길이**: 전체 라인 수
2. **컴포넌트 수**: `function Xxx` 또는 `const Xxx =` 패턴 개수
3. **훅 정의**: `function use` 또는 `const use` 패턴
4. **타입 정의**: `type` 또는 `interface` 개수와 길이

### 3단계: 리뷰 내용 작성

복잡도가 높은 파일이 있으면 코드 리뷰에 추가:

```markdown
### 💡 코드 구조 개선 권장

#### [파일명]

- **파일**: `src/features/xxx/components/complex-component.tsx`
- **현재 상태**: 450줄, 컴포넌트 3개, 커스텀 훅 1개
- **문제**: 한 파일에 너무 많은 책임이 혼재

**분리 제안**:
\`\`\`
complex-component/
  index.tsx                     # 메인 컴포넌트 (150줄)
  complex-component.types.ts    # 타입 정의
  use-complex-state.ts          # useComplexState 훅
  sub-component-a.tsx           # SubComponentA
  sub-component-b.tsx           # SubComponentB
\`\`\`
```

## 출력 규칙

1. 모든 변경 파일에 대해 분리를 권장하지 않음 (과도한 분리 지양)
2. 명확히 복잡한 경우에만 제안
3. 구체적인 폴더/파일 구조 제시
4. 분리 후 예상 라인 수 명시
5. 코드 리뷰 보고서의 "선택적 개선" 섹션에 추가
