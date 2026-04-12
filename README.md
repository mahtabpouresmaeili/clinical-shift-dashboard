# Clinical Shift Dashboard

A role-aware clinical dashboard built with **React**, **TypeScript**, and **React Query** to support hospital shift workflows. The application helps nurses and clinical staff monitor patient status, track shift tasks, review critical cases, and prepare handoff summaries.

## Overview

This project was inspired by real nursing workflow needs. It focuses on presenting high-value shift information in a clean, maintainable frontend architecture.

Core goals:

* Track patient acuity across a unit
* Monitor outstanding and completed clinical tasks
* Surface critical and monitoring patients quickly
* Support shift handoff reporting
* Demonstrate scalable frontend architecture for a portfolio / interview setting

## Features

### Dashboard

* Shift command center overview
* Critical patients widget
* Pending tasks widget
* Shift summary widget
* Role-aware visibility for selected dashboard sections

### Patients

* Search patients by name, room, or diagnosis
* Status summary cards
* Group patients by status:

  * Critical
  * Monitoring
  * Stable
* Patient detail modal

### Tasks

* Search tasks by title, type, or due time
* Pending vs completed task sections
* Task summary cards
* Complete tasks with mutation flow
* Per-item loading state during completion
* Task-to-patient context in UI

### Shift Report

* Handoff-oriented report layout
* Critical watchlist
* Monitoring rounds section
* Outstanding tasks section
* Assignment snapshot
* Timestamped report header

### UX / UI

* Responsive dashboard layout
* Reusable UI components
* Loading, error, and empty states
* Dark mode support
* Accessibility settings scaffold

## Tech Stack

* **React**
* **TypeScript**
* **Vite**
* **React Router**
* **@tanstack/react-query**
* **Tailwind CSS**
* **Lucide React**

## Architecture

The project follows a modular frontend structure designed for readability and interview discussion.

```txt
src/
  app/
    providers/
    router/
  domain/
    auth/
    patient/
    task/
    shift/
  features/
    dashboard/
    patients/
    tasks/
    shift-report/
  shared/
    components/
      ui/
      layout/
      feedback/
    constants/
    lib/
    types/
```

### Structure Philosophy

* **features/**: page-level application features
* **domain/**: business-focused logic, types, services, hooks, and utils
* **shared/**: reusable UI and shared helpers
* **app/**: providers and routing setup

### Data Flow

```txt
Page -> Hook -> Service -> Data
         ↓
       Utils
         ↓
     Components (UI)
```

This separation keeps the UI focused on rendering while moving data transformation and fetch logic into reusable layers.

## Example Engineering Decisions

### Why React Query?

React Query is used to manage asynchronous server-style state such as patients and tasks. It simplifies:

* loading and error state handling
* caching
* query invalidation after mutations
* cleaner data fetching patterns

### Why separate logic into utils?

Derived data such as:

* patient summaries
* task summaries
* grouped patient lists
* filtered search results

is stored outside UI components to improve:

* readability
* testability
* reuse
* interview clarity

### Why modular domain folders?

The domain-based structure makes it easier to explain the codebase in interviews and scale features independently.

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd clinical-shift-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Open in browser

```txt
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Current Status

This project currently uses mock / local frontend data patterns to simulate real hospital workflow interactions. It is designed as a portfolio-ready frontend application with production-style architecture.

## Planned Improvements

Potential next upgrades:

* real API integration
* create/edit patient workflows
* create/edit task workflows
* printable/exportable shift report
* route-based patient and task detail pages
* stronger role-based workflow rules
* tests for utils and hooks

## What This Project Demonstrates

This project demonstrates:

* frontend architecture design
* modular React development
* TypeScript usage in a real UI workflow
* React Query data management
* role-aware UI rendering
* UX thinking for operational dashboards

## Interview Talking Points

If you discuss this project in an interview, strong topics include:

* why the architecture is split into feature, domain, and shared layers
* how React Query improves async data handling
* how derived data is kept outside components
* why the dashboard reflects real clinical workflow priorities
* how per-item loading and task mutation improve user experience

## About the Project Inspiration

I built this project based on real clinical workflow understanding from a nursing background. That helped me focus the interface on practical shift needs rather than only generic dashboard UI patterns.

## License

This project is for portfolio and educational use unless otherwise specified.

