# Continuous Integration & Continuous Delivery (CI/CD)

## GitHub Actions Workflows

### 1. PR & Main Validation Workflow (`.github/workflows/ci.yml`)
Triggers on pull requests and pushes to `main` and `develop`.
- Checks out code with Node 20
- Runs `npm ci`
- Builds `@rishu/shared-types`
- Validates NestJS backend build and Jest test suites
- Validates React Vite frontend production bundling

### Branching Policy
- `main`: Production-ready release branch.
- `develop`: Ongoing development and feature integration branch.
- `feature/*`: Dedicated branches for individual modules and features.
- `bugfix/*` & `hotfix/*`: Targeted patches.
