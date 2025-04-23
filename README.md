# project-flow-sync-issue-meta-to-pr

## 개요

이 액션은 PR이 생성될 때, 연관된 이슈의 메타데이터(labels, milestone, project)를 PR로 복사하고, PR과 이슈 모두 GitHub Project의 지정된 상태(Status)로 업데이트합니다.

---

## ✨ 주요 기능

- 브랜치 이름에서 이슈 번호를 추출합니다.
- 이슈에 설정된 label과 milestone을 PR에 복사합니다.
- PR을 GitHub Project에 등록하고 상태(Status)를 지정된 컬럼으로 설정합니다.
- 연관된 이슈 역시 상태(Status)를 변경합니다.
- 사용자 소유(User-owned)와 조직 소유(Organization-owned) 프로젝트 모두 지원합니다.

---

## 🧾 입력값

| 이름             | 필수 여부 | 기본값 | 설명                                                             |
| ---------------- | --------- | ------ | ---------------------------------------------------------------- |
| `github_token`   | 예        | –      | `project` 권한이 포함된 GitHub Token (예: PAT 또는 GITHUB_TOKEN) |
| `project_owner`  | 예        | –      | 프로젝트를 소유한 사용자 또는 조직의 이름                        |
| `project_number` | 예        | –      | 프로젝트 번호 (ID가 아님)                                        |
| `target_column`  | 예        | –      | 상태(Status)를 설정할 컬럼 이름                                  |

---

## ⚠️ 사용 주의사항

### 브랜치 명에 이슈 번호가 포함되어야 합니다.

브랜치 이름에 이슈 번호가 포함되어 있어야 액션이 정상적으로 작동합니다.  
예: `feature/#12`, `bugfix/issue-34` 등.  
브랜치 명에 이슈 번호가 없으면 이 액션은 오류를 발생시킵니다.

---

## 🔁 사용 예시

```yaml
on:
  pull_request:
    types: [opened]

jobs:
  sync-issue-meta:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Sync Issue Metadata to PR
        uses: jinhokim98/project-flow-sync-issue-meta-to-pr@v1
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          project_owner: your-org
          project_number: 42
          target_column: 'In Review'
```

## Overview

This action copies the metadata (labels, milestone, project) from the related issue to the PR when it is created. It also updates both the PR and the issue to the specified status in the GitHub Project.

---

## ✨ Features

- Extracts the issue number from the branch name.
- Copies the labels and milestone set on the issue to the PR.
- Registers the PR in the GitHub Project and updates its status to a specified column.
- Updates the status of the related issue in the GitHub Project as well.
- Supports both user-owned and organization-owned projects.

---

## 🧾 Inputs

| Name             | Required | Default | Description                                                            |
| ---------------- | -------- | ------- | ---------------------------------------------------------------------- |
| `github_token`   | Yes      | –       | GitHub Token with `project` permissions (e.g., PAT or GITHUB_TOKEN)    |
| `project_owner`  | Yes      | –       | The name of the user or organization that owns the project             |
| `project_number` | Yes      | –       | The project number (not the ID)                                        |
| `target_column`  | Yes      | –       | The column name in the project to set the status (e.g., 'In Progress') |

---

## ⚠️ Usage Notes

### Branch Name Must Contain Issue Number

The branch name must contain the issue number for the action to work properly.  
For example: `feature/#12`, `bugfix/issue-34`, etc.  
If the branch name doesn't contain the issue number, this action will throw an error.

---

## 🔁 Example Usage

```yaml
on:
  pull_request:
    types: [opened]

jobs:
  sync-issue-meta:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Sync Issue Metadata to PR
        uses: jinhokim98/project-flow-sync-issue-meta-to-pr@v1
        with:
          github_token: ${{ secrets.PERSONAL_TOKEN }}
          project_owner: your-org
          project_number: 42
          target_column: 'In Review'
```
