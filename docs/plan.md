# Deluno Platform Architecture

> This document is the architectural contract for AI agents and developers.

## URL Structure

```
domena.com/                          ← Landing page
├── /pricing                         ← Pricing
├── /blog                            ← Blog
├── /docs                            ← Documentation
├── /sign-in                         ← Auth (Clerk catch-all)
├── /sign-up                         ← Auth (Clerk catch-all)
└── /panel                           ← App Picker
    ├── /panel/noter                 ← App: Noter
    └── /panel/[app-name]            ← App: Future apps
```

## Layout Zones

```
┌─────────────────────────────────────────────────┐
│  HEADER — Platform (Logo, Breadcrumbs, User)    │
├────┬────────┬───────────────────────────────────┤
│RAIL│SIDEBAR │           WORKSPACE               │
│    │(per    │           (per app)                │
│    │ app)   │                                    │
└────┴────────┴───────────────────────────────────┘

RAIL      = Platform. App picker icons.
SIDEBAR   = Per app. Empty for new apps.
WORKSPACE = Per app. Empty for new apps.
```

## File Architecture

```
app/(platform)/panel/
├── layout.tsx              ← Platform Shell (Header + Rail + Sidebar + Workspace slots)
├── page.tsx                ← App Picker
└── [app-name]/
    ├── layout.tsx          ← [App]Provider + sidebar inject
    └── page.tsx            ← Workspace content

components/
├── platform/               ← Shell components (AppRail, SidebarLayout, PanelDashboard)
├── noter/                   ← Noter-specific components
├── shared/                  ← Reusable opt-in blocks (SearchCommand, SettingsModal, etc.)
└── ui/                      ← Design primitives

lib/
├── contexts/                ← PlatformContext + per-app contexts
├── i18n/                    ← en.json + useTranslation hook
└── [app-name].ts            ← Types & helpers per app
```

## Adding a New App (Cookbook)

```
1. Create route:     app/(platform)/panel/my-app/layout.tsx + page.tsx
2. Create context:   lib/contexts/MyAppContext.tsx
3. Create types:     lib/my-app.ts
4. Create sidebar:   components/my-app/MyAppSidebar.tsx (optional)
5. Register in Rail: components/platform/AppRail.tsx → add to `apps` array
6. Register card:    components/platform/PanelDashboard.tsx → add card
```

## Reusable Components (Opt-In)

| Component | Import | Use |
|-----------|--------|-----|
| SearchCommand | `@/components/shared/SearchCommand` | Command palette |
| OptionsMenu | `@/components/shared/OptionsMenu` | Three-dot menu |
| ErrorBoundary | `@/components/shared/ErrorBoundary` | Error catch |
| SettingsModal | `@/components/shared/SettingsModal` | Settings |

New apps use NONE of these by default. Add them explicitly.

## i18n

All strings in EN. Foundation: `lib/i18n/en.json` + `useT()` hook.
