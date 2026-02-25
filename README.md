# CareConnect STML Desktop Application

SWEN 661 – Week 8
Electron Desktop Implementation & Testing

## Overview

CareConnect STML Desktop is an Electron-based desktop application built using React and TypeScript. This version is designed specifically for desktop environments and follows structured, predictable interaction patterns suitable for STML users. The application implements native menus, keyboard shortcuts, accessibility features, and proper Electron main and renderer process separation.

This repository contains source code only. Build output, coverage reports, packaged installers, and release artifacts are intentionally excluded from version control.

---

## Architecture Overview

The application follows Electron’s recommended process model:

### Main Process

Located in `src/main/`
Responsible for:

* Creating and managing the application window
* Native menu configuration
* IPC communication setup
* Security configuration (context isolation enabled)
* Window state management

### Renderer Process

Located in `src/`
Responsible for:

* React UI
* Screen rendering
* Keyboard shortcut handling
* Accessibility behavior
* UI state management through DesktopContext

### Preload Script

Located in `src/main/preload.ts`

* Safely exposes IPC APIs to the renderer
* Prevents direct Node access from the UI
* Ensures contextIsolation is enforced

Security best practices implemented:

* nodeIntegration disabled
* contextIsolation enabled
* Preload script used for controlled IPC access

---

## Features Implemented

### Desktop Features

* Native menu bar (File, View, Help)
* Keyboard shortcuts for navigation and actions
* Window state management
* High contrast mode toggle
* Zoom controls
* Structured sidebar navigation
* Modal focus trapping
* Status bar updates

### Authentication Flow

Step 1: Role Selection
Step 2: Sign In
Authenticated Layout: Sidebar + Toolbar + Main Content + Status Bar

### Core Screens

* Dashboard
* Health Logs
* Messages
* Calendar
* Tasks
* Profile
* Search (keyboard triggered)
* New Log modal
* Emergency SOS confirmation modal

---

## Accessibility Implementation

* Full keyboard-only navigation
* Visible focus indicators
* Skip link support
* Screen reader compatible structure
* High contrast mode support
* Zoom support
* Modal focus trapping
* Accessible form validation and error summaries

Tested using NVDA on Windows.

---

## Installation & Setup

### Prerequisites

* Node.js (v18 or newer recommended)
* npm

### Clone Repository

```bash
git clone https://github.com/umgcTeam10/week8Desktop.git
cd week8Desktop
```

### Install Dependencies

```bash
npm install
```

---

## Running the Application (Development Mode)

```bash
npm start
```

This launches Electron with the React renderer.

---

## Running Tests

```bash
npm test
```

To run tests with coverage:

```bash
npm test -- --coverage
```

Coverage report will be generated in:

```
coverage/lcov-report/index.html
```

Open this file in a browser to view detailed coverage results.

Minimum coverage threshold required: 60 percent.

---

## Building the Application

### Build React + Electron Output

```bash
npm run build
```

This generates production build artifacts locally.

---

## Packaging the Application (Windows)

This project uses electron-builder for packaging.

```bash
npm run package
```

Installer output will be generated in the `release/` folder locally.

Note: The installer and unpacked binaries are not committed to the repository due to GitHub file size limits.

---

## Project Structure

```
src/
  main/
    main.ts
    preload.ts
  components/
  screens/
  context/
  data/
docs/
  week8/
    specs/
    testing/
    notes/
public/
jest.config.js
package.json
```

---

## Testing Summary

* 56 total tests
* 15 test suites
* Unit tests for business logic
* Component tests using React Testing Library
* Keyboard navigation tests
* Modal behavior tests
* Authentication flow tests
* Coverage thresholds enforced

Typical coverage results:

* Statements: ~80%+
* Branches: ~60%+
* Lines: ~80%+
* Functions: ~70%+

All thresholds meet assignment requirements.

---

## Platform Target

This build targets Windows.

Installer generated using electron-builder for Windows environments.

---

## Assignment Alignment

This implementation satisfies:

* Proper Electron architecture
* IPC separation between main and renderer
* Native menus and keyboard shortcuts
* Desktop window behavior
* Accessibility implementation
* Minimum 60 percent coverage
* Windows packaging

---

## Notes

This repository contains source code only. Generated folders such as:

* node_modules/
* build/
* dist/
* coverage/
* release/

are excluded from version control and generated locally as needed.

---

## Authors

Team 10
SWEN 661
University of Maryland Global Campus

Lead: Joriel Rivas
