# CareConnect Week 8 — Run Instructions

## Prerequisites

- Node.js (v18 or later recommended)
- npm

## How to Run the App

1. Install dependencies (first time only):
   ```bash
   npm install --legacy-peer-deps
   ```

2. Build the application:
   ```bash
   npm run build
   ```
   This compiles the Electron main process (TypeScript → `dist/main/`) and the React renderer (→ `build/`).

3. Start the desktop application:
   ```bash
   npm start
   ```
   This runs Electron and loads the built React app.

**Application flow:**
- **Step 1 — Choose your role:** CareConnect opens on the role selection screen (two-panel layout). Choose "I'm a Caregiver" or "I'm a Care Recipient", then click **Continue**. Use Up/Down arrow keys to switch roles and Enter to continue (keyboard tip shown).
- **Step 2 — Sign in:** Enter email and password (use the email associated with your CareConnect account). Optional: Remember me, Email me a sign-in link, Sign in with Windows Hello / Passkey. **Sign in** submits the form. Validation: email format and password minimum 8 characters; errors show an error summary and inline messages (design 2.4).
- **After sign-in:** The app shows the main layout with a dark **sidebar** (Dashboard, Health Logs, Messages, Calendar, Tasks, Profile), **toolbar** (High Contrast toggle, Keyboard Shortcuts button, Zoom indicator), and main content. Default screen is **Home Dashboard**. **New Log** is opened as a **modal** via **Ctrl+N** (or + New Log on Health Logs), not a separate screen. **Ctrl+,** opens **Profile & Settings** (replaces the previous Settings screen).

## How to Run Tests

- Run all tests:
  ```bash
  npm test
  ```
  Or with explicit single run:
  ```bash
  npm test -- --watchAll=false
  ```

## How to Generate Coverage Report

- Run tests with coverage:
  ```bash
  npm run test:coverage
  ```

- Coverage output:
  - **Terminal**: Summary and per-file percentages (statements, branches, functions, lines).
  - **HTML report**: `coverage/lcov-report/index.html` (open in a browser).
  - **LCOV**: `coverage/lcov.info` for CI or other tools.

- Configured thresholds (in `jest.config.js`): statements, lines, and branches ≥ 60%; functions ≥ 57%.

## How to Package

- Package for Windows (from a Windows machine):
  ```bash
  npm run package
  ```

- This runs `npm run build` then `electron-builder --win`. The installer/executable is produced under:
  - **Output directory**: `release/`
  - **Windows**: NSIS installer (e.g. `CareConnect Setup x.x.x.exe`) and/or portable executable.

- Ensure you have run `npm run build` successfully at least once before packaging so that `dist/main/` and `build/` exist.
- Output: `release/CareConnect Setup 1.0.0.exe` (NSIS installer) and `release/win-unpacked/` (unpacked app).

## Design Document

Place the official Desktop Design Document (PDF or DOCX) in:

- `docs/week8/specs/`

It is the source of truth for screen structure (2.1–2.11), design system, menus, keyboard shortcuts, accessibility, and test plan.
