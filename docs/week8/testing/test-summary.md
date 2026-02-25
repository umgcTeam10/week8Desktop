# CareConnect Week 8 — Test Summary

## What Was Tested

### 1. Auth flow and role selection

- **Role selection (Step 1 of 2)**: Default screen shows "Choose Your Role" with Caregiver and Care Recipient cards; Continue advances to sign-in.
- **Sign-in (Step 2)**: Valid email + password and "Sign in" button leads to authenticated app (Dashboard). Sign-in validation: invalid email format and password &lt; 8 chars produce error summary ("Let's fix N things to sign in") and inline errors (design 2.4).
- **StatusBar by phase**: "Choose your role" on role screen; "Sign in" on sign-in screen; "Home Dashboard" / "Health Logs" etc. when authenticated.

### 2. Keyboard navigation

- **Tab order**: Skip link is first focusable; tab moves through toolbar, main, and status.
- **Focus movement**: Buttons and links receive focus as expected.
- **Skip link**: Present and visible when focused; `href="#main-content"`; target `#main-content` on main.
- **Modal focus**: Keyboard Shortcuts and SOS modals trap focus; Tab/Shift+Tab handled within dialog.

### 3. Keyboard shortcuts

- **Simulated keydown** (when authenticated): `Ctrl+H` (Health Logs), `Ctrl+M` (Messages), `Ctrl+K` (Calendar), `Ctrl+N` (New Log modal), `Ctrl+F` (Search), `Ctrl+,` (Profile & Settings), `Ctrl+Shift+E` (Emergency SOS).
- **Screen navigation**: Each shortcut switches to the correct screen; Ctrl+N opens the New Log modal.
- **Modal open/close**: Toolbar “Keyboard shortcuts” opens the shortcuts modal; Close button and Escape close it. `Ctrl+Shift+E` opens SOS confirmation; Cancel and Confirm close it.
### 4. UI states

- **Error state**: Sign-in shows validation errors (email format, password length). New Log modal: empty required Systolic (SP-01), Systolic out of range (SP-02).
- **High contrast**: Toolbar high-contrast toggle updates state and label (on/off).
- **Zoom**: Toolbar zoom in/out and zoom indicator.
- **Form validation**: New Log modal — valid BP data (HP-01) saves and closes; Cancel closes without saving.

### 5. Screens and components

- **App**: Auth phases (role → sign-in → authenticated). Title, skip link, main content. Sidebar navigation: Dashboard, Health Logs, Messages, Calendar, Tasks, Profile.
- **Toolbar**: High contrast toggle, Keyboard shortcuts button, zoom indicator, zoom in/out.
- **StatusBar**: Current screen label by phase and after navigation.
- **Modals**: Keyboard Shortcuts (Form Navigation: Tab, Shift+Tab, Alt+E, Alt+P; Actions: Esc + full shortcut list); SOS Confirm (Cancel, Confirm); New Log (BP fields, validation, Save/Cancel).
- **Screens**: Role Selection, Sign In, Dashboard, Tasks, Health Logs, Messages, Calendar, Profile & Settings, Search. New Log is a modal (Ctrl+N or + New Log on Health Logs), not a separate screen.
- **Context**: authPhase, selectedRole, screen, high contrast, zoom, modal open/close.
- **Mock data**: Health logs, messages, calendar events, dashboard and tasks data.

## Coverage

- **Tool**: Jest with `collectCoverageFrom` over `src/**/*.{ts,tsx}` (excluding `src/main`, `index.tsx`, and type declarations).
- **Thresholds** (in `jest.config.js`):
  - Statements: ≥ 60%
  - Branches: ≥ 60%
  - Lines: ≥ 60%
  - Functions: ≥ 57%

- **Typical run** (after `npm run test:coverage`, with unused `NewLogScreen` and `SettingsScreen` removed):
  - **Statements**: ~83%
  - **Branches**: ~62–63%
  - **Lines**: ~85%
  - **Functions**: ~75–76%

Coverage is generated in:

- `coverage/` (text summary, HTML report, LCOV).

## Screenshot placeholders for coverage report

- **Coverage summary (terminal)**  
  _Screenshot: Terminal output of `npm run test:coverage` showing the coverage table and “Coverage summary” with percentages._

- **Coverage HTML report**  
  _Screenshot: Browser open to `coverage/lcov-report/index.html` showing file list and coverage bars._

- **Per-file coverage (e.g. App.tsx)**  
  _Screenshot: One file’s coverage view in the HTML report (e.g. `src/App.tsx`) with line-by-line coverage._

Replace these placeholders with actual screenshots when generating the deliverable.
