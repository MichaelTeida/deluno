# Deluno Platform Architecture

> This document is the architectural contract for AI agents and developers.
> It is the single source of truth for how the platform is structured.

---

## 1. Routing & URL Structure

```
domain.com/                                 ← Landing page
├── /pricing                                ← Pricing
├── /blog                                   ← Blog / News
├── /docs                                   ← Documentation
├── /shop                                   ← Shop (future)
├── /about                                  ← About us
│
├── /sign-in                                ← Login (Clerk catch-all)
├── /sign-up                                ← Registration (Clerk catch-all)
│
└── /panel                                  ← 🏠 App Picker
    ├── /panel/noter                        ← App: Noter
    │   └── /panel/noter/[noteId]           ← Note detail (future)
    ├── /panel/[app-b]                      ← App B (future)
    └── /panel/[app-c]                      ← App C (future)
```

---

## 2. Layout Zones

```
┌──────────────────────────────────────────────────────────────────┐
│  HEADER (Top Bar)                                    [User] [⚙] │
│  Logo · Breadcrumbs                                             │
├────┬─────────┬──────────────────────────────────────────────────┤
│    │         │                                                   │
│ R  │ SIDEBAR │              WORKSPACE                           │
│ A  │         │                                                   │
│ I  │ Per-app │  Per-app content:                                │
│ L  │ content │  Content is 100% defined by the app.             │
│    │         │  New app = EMPTY.                                 │
│    │ New     │  Optional menu [⋯] — per app.                   │
│    │ app =   │                                                   │
│    │ EMPTY   │                                                   │
│    │         │                                                   │
└────┴─────────┴──────────────────────────────────────────────────┘

HEADER    → PLATFORM. Shared. Logo, User, Settings.
RAIL      → PLATFORM. App picker icons, Settings, Home.
SIDEBAR   → APP-owned. Each app defines its own. Empty = empty.
WORKSPACE → APP-owned. Each app defines its own. Empty = empty.
```

> **Search, menu ⋯, breadcrumbs** — these are opt-in reusable components. Each app decides whether to use them. A new app's sidebar has no search bar by default.

---

## 3. File System Architecture

```
app/
├── layout.tsx                          ← Root (Clerk, Theme, Fonts, Glass)
├── page.tsx                            ← Landing page
├── globals.css                         ← Theme Engine + Design Tokens
│
├── (website)/                          ← Public website (future)
│   ├── layout.tsx                      ← Marketing layout (header, footer)
│   ├── pricing/page.tsx
│   ├── blog/page.tsx
│   ├── docs/page.tsx
│   └── about/page.tsx
│
├── (auth)/                             ← Clerk catch-all routes
│   ├── layout.tsx
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
│
└── (platform)/
    └── panel/
        ├── layout.tsx                  ← 🔑 PLATFORM SHELL
        │                                  (Header + Rail + Sidebar/Workspace slots)
        ├── page.tsx                    ← App Picker (Dashboard)
        │
        ├── noter/                      ← App: Noter
        │   ├── layout.tsx              ← NoterProvider + sidebar inject
        │   └── page.tsx               ← Workspace content
        │
        └── [app-name]/                 ← New app (template)
            ├── layout.tsx              ← [App]Provider + sidebar inject
            └── page.tsx               ← Workspace content

components/
├── platform/                           ← PLATFORM shell components
│   ├── AppRail.tsx                     ← Left icon rail (declarative apps[])
│   ├── SidebarLayout.tsx               ← Resize, collapse wrapper
│   └── PanelDashboard.tsx              ← App Picker grid
│
├── shared/                             ← Reusable components (opt-in per app)
│   ├── SearchCommand.tsx               ← Command Palette (Ctrl+K)
│   ├── SettingsModal.tsx               ← Settings modal
│   ├── ErrorBoundary.tsx               ← Error handling
│   └── OptionsMenu.tsx                 ← Three-dot menu (⋯)
│
├── ui/                                 ← Design primitives
│   ├── LiquidGlassFilter.tsx
│   └── ...
│
├── noter/                              ← NOTER-specific components
│   ├── NoterSidebarContent.tsx
│   ├── NoterBreadcrumbs.tsx
│   ├── NoteEditor.tsx
│   ├── NoteList.tsx
│   ├── NoteMenu.tsx
│   ├── DashboardView.tsx
│   └── TrashView.tsx
│
└── theme-provider.tsx

lib/
├── contexts/
│   ├── PlatformContext.tsx              ← Sidebar state, nav, search, resize
│   └── NoterContext.tsx                ← Noter app state
├── i18n/                               ← Internationalization foundation
│   ├── en.json                         ← Default translations
│   └── useTranslation.ts              ← Hook: useT() → t('key')
├── noter.ts                            ← Types & helpers for Noter
└── utils.ts                            ← Shared utilities
```

### Handling Large `page.tsx` or `layout.tsx`

These files are **entry points**, not monoliths. When logic grows:

```
noter/
├── layout.tsx          ← Import + compose (5-20 lines)
├── page.tsx            ← Import + render (10-30 lines)
└── _components/        ← Private components (Next.js ignores _ prefix)
    ├── NoterWorkspace.tsx
    └── NoterToolbar.tsx
```

`page.tsx` and `layout.tsx` should always be **thin** — import and compose, never contain hundreds of lines of logic.

---

## 4. Key Components

### PlatformContext (`lib/contexts/PlatformContext.tsx`)

Manages all platform-level state:
- Sidebar visibility, width, resize
- Mobile nav toggle
- Settings modal
- Search command palette (Ctrl+K)
- Rail expand/collapse

Every child component accesses this via `usePlatform()`.

### AppRail (`components/platform/AppRail.tsx`)

Left icon sidebar. Uses a **declarative `apps[]` array**:

```tsx
const apps: AppDefinition[] = [
    { name: "Apps",  href: "/panel",       icon: <DashboardIcon /> },
    { name: "Noter", href: "/panel/noter", icon: <DocumentIcon /> },
];
```

Adding a new app = adding one object to this array.

### SidebarLayout (`components/platform/SidebarLayout.tsx`)

Wrapper for the resizable sidebar. Provides:
- Desktop: resizable width (200–480px), snap-to-close at <100px
- Mobile: slide-out drawer with backdrop overlay
- Search row, mobile header, mobile app rail
- Content injected via `{children}` — each app provides its own

---

## 5. Reusable Components (Opt-In)

Components in `components/shared/` are **opt-in building blocks**. Each app decides which ones to use.

| Component | Import | Description | Required Props |
|-----------|--------|-------------|----------------|
| `SearchCommand` | `@/components/SearchCommand` | Command Palette (Ctrl+K) | `isOpen`, `onClose` |
| `SettingsModal` | `@/components/SettingsModal` | Settings modal | `isOpen`, `onClose` |
| `SidebarLayout` | `@/components/platform/SidebarLayout` | Sidebar with resize/collapse | `children` |

### Usage Example

```tsx
import SearchCommand from "@/components/SearchCommand";

export default function MyAppPage() {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <SearchCommand isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      {/* Rest of workspace */}
    </>
  );
}
```

**Rule:** Zero automation. New app = empty. Developer adds components intentionally.

---

## 6. Internationalization (i18n)

All UI strings in **EN**. Simple foundation for future translations:

```
lib/i18n/
├── en.json              ← { "noter.newNote": "New Note", "common.save": "Save" }
└── useTranslation.ts    ← export function useT() → (key) => translations[key]
```

```tsx
const t = useT();
return <button>{t("common.save")}</button>;
```

When adding a new language: swap the JSON file in the provider. Zero component changes needed.

---

## 7. Cookbook — Adding a New App

### Step by Step

```
 STEP 1 — Create routing
 ────────────────────────
 📁 app/(platform)/panel/my-app/
 ├── layout.tsx       ← Provider + Sidebar inject
 └── page.tsx         ← Workspace (empty to start)

 STEP 2 — Create logic
 ────────────────────────
 📁 lib/
 ├── my-app.ts        ← Types (interface MyItem { ... })
 └── contexts/
     └── MyAppContext.tsx  ← App state (items, activeItem, CRUD)

 STEP 3 — Create UI (optional)
 ──────────────────────────────────
 📁 components/my-app/
 ├── MyAppSidebar.tsx     ← Sidebar content (list, filters)
 └── MyAppWorkspace.tsx   ← Workspace content (editor, board)

 STEP 4 — Register the app
 ──────────────────────────
 📄 components/platform/AppRail.tsx     → add { name, icon, href }
 📄 components/platform/PanelDashboard  → add card in grid
```

### Minimal App Template (Copy-Paste)

```tsx
// app/(platform)/panel/my-app/layout.tsx
import { MyAppProvider } from "@/lib/contexts/MyAppContext";

export default function MyAppLayout({ children }: { children: React.ReactNode }) {
  return <MyAppProvider>{children}</MyAppProvider>;
}
```

```tsx
// app/(platform)/panel/my-app/page.tsx
export default function MyAppPage() {
  return <div className="h-full flex items-center justify-center text-zinc-400">Ready to build.</div>;
}
```

Time: **~5 minutes** for an empty, working app in the system.

---

## 8. Design System

### Glass Effect

All UI panels use the `.glass` class from `globals.css`. Apps inherit the Liquid Glass aesthetic automatically — no extra CSS needed.

### Design Tokens

```css
--glass-bg-light / --glass-bg-dark     ← Panel backgrounds
--glass-border                          ← Subtle borders
--height-button                         ← Consistent button sizing
```

### Theme

- Light + Dark mode via `@custom-variant dark` (Tailwind v4)
- Controlled by `theme-provider.tsx`
- Toggle in Settings modal


