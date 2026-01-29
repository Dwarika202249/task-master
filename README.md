# ⚡ SyncQuark — Task Master

SyncQuark is a high-performance, dark-themed Task Management application engineered for productivity. Built with a cutting-edge stack featuring **React 19**, **TypeScript**, and **Redux Toolkit**, it offers a seamless, offline-first experience with sophisticated data persistence and visualization.

---

Live Link: https://syncquark.netlify.app/


## 🚀 Key Features

### 🛠️ Core Management
- **Task Capture**: Effortlessly create and edit tasks with comprehensive metadata, including detailed descriptions, categorized tagging, and multi-level priority (High, Medium, Low).
- **State Persistence**: Built-in `localStorage` integration ensures your workflow remains uninterrupted, providing an "offline-first" experience where your data is always ready when you return.
- **Interactive Lifecycle**: Seamlessly mark tasks as complete, archive them, or perform bulk updates with an intuitive, responsive interface.

### 📊 Advanced Productivity Tools
- **Dynamic Dashboard**: Gain instant insights with a real-time analytics suite.
  - **Total Task Tracking**: Monitor overall volume and active workload.
  - **Visual Metrics**: View task completion as an animated percentage.
  - **Category Breakdown**: Automatically generated breakdown of tasks across Work, Personal, Shopping, Health, and other segments.
- **Intelligent Discovery**: High-speed text-based search paired with status-based filtering (All, Active, Completed) to manage complex backlogs.
- **Fluid Reordering**: Integrated Drag-and-Drop functionality using `@hello-pangea/dnd` for natural, intuitive task prioritization.

### 💾 Data Portability
- **JSON Interoperability**: Protect your data with native Export/Import functionality.
- **Zero-Loss Transfers**: Back up your entire workspace or transfer it between devices using standardized JSON files.

---

## 🛠️ Tech Stack & Architecture

- **Frontend Core**: [React 19](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/) for robust, type-safe development.
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) for predictable, centralized application logic.
- **Build System**: [Vite 7](https://vitejs.dev/) for lightning-fast HMR and optimized production bundles.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with a custom dark-mode theme and SVG-based aesthetic backgrounds.
- **Iconography**: [Lucide React](https://lucide.dev/) for crisp, scalable vector icons.

---

## 🔧 Getting Started

### Prerequisites
- **Node.js**: Version 20.x or higher
- **Package Manager**: `npm` (v10+) or `yarn`

### Setup Instructions

1. **Clone the Repository**
  ```bash
  git clone [https://github.com/dwarika202249/task-master.git](https://github.com/dwarika202249/task-master.git)

  cd task-master
   ```

2. **Install dependencies**

  ```bash
  npm install
# or
# yarn
```

Start development server:

```bash
npm run dev
# or
# yarn dev
```

- The application will be accessible at http://localhost:5173.

Build for production:

```bash
npm run build
```

- The output will be located in the dist/ directory, ready for static hosting services like Vercel, Netlify, or GitHub Pages.

## Available Scripts

- `dev` — Run Vite dev server.
- `build` — Create production build in `dist/`.
- `lint` — Run ESLint (if configured).

## Project Structure

- `src/` — Application source
  - `components/` — React UI components organized by domain
    - `common/` — Atomic UI elements (Buttons, Badges, Backgrounds)
    - `dashboard/` — Analytics and visual statistics
    - `filters/` — Search and status filtering logic
    - `task/` — Task list, items, and form management
    - `Navbar.tsx` — Main header with Export / Import controls
  - `features/` — Redux slices (core application logic)
  - `store/` — Redux store configuration and persistence middleware
  - `styles/` — Global CSS and Tailwind theme fallbacks
  - `types/` — TypeScript interfaces and shared types
  - `utils/` — Helper functions and localStorage adapters

- `public/` — Static assets


## Asthetic and Design

SyncQuark utilizes a refined dark-mode palette designed to reduce eye strain and focus attention on the content:

- **Deep Workspace** — `#0F172A`  
  Primary application background for long working sessions

- **Fluid Surfaces** — `#111827`  
  Cards, panels, and elevated UI surfaces

- **Focus Blue** — `#2563EB`  
  Primary actions, links, and emphasis states

- **Success Mint** — `#22C55E`  
  Completed tasks, confirmations, and positive feedback


## Notes & Tips

- Categories are currently a fixed set (Work, Personal, Shopping, Health, Other) — this keeps the dashboard consistent. We can make this configurable if you want.
- The app uses `localStorage` to persist tasks. Use the Export/Import buttons in the Navbar to backup/restore tasks.
- To change theme colors or add category-color mappings, see `src/styles/theme.css` and the `Badge` component.

## Contribution

PRs and issues are welcome. For changes affecting layout or data shape, please add/update unit tests and keep UI accessible (ARIA labels & keyboard flows).


## Author

**Dwarika Kumar**

AI Full Stack Developer

