# Launchcorp Frontend

React frontend for the Launchcorp Challenge app, integrated with LaunchDarkly for feature flag management.

## Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| LaunchDarkly React SDK | Feature flag evaluation |
| Vite | Build tool and dev server |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Create a `.env` file in this directory:

```bash
cp .env.example .env
```

Set your LaunchDarkly client-side ID (found in **Account Settings → Projects → Client-side ID**):

```env
VITE_LD_CLIENT_ID=your-client-side-id
```

> The client-side ID starts with a hex string (e.g. `6a1511b0...`), not `sdk-` or `api-`.

### 3. Start the dev server

```bash
npm run dev
```

App runs at **http://localhost:5173**

> The Python backend must also be running on port `8000` for Register / Sign In to work. See `../backend/README.md`.

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Landing page with Register / Sign In and Know More button |
| `/about` | `About` | Information about Launchcorp |
| `/dashboard` | `Dashboard` | Shown after sign in — contains the Click Me button |
| `/castle` | `Castle` | Final destination — message controlled by LaunchDarkly flag |

## User Flow

```
/  (Home)
├── Register        → creates account, shows confirmation
├── Sign In         → on success → /dashboard
│                         └── Click Me → /castle
│                                   └── Go To Home → /
└── Know more about Launchcorp → /about
```

---

## LaunchDarkly Integration

The app is wrapped with `asyncWithLDProvider` in `main.jsx`, which initialises the LD client before rendering.

### Context

```js
{
  kind: 'user',
  key: '12345',
}
```

### Feature Flags

| Flag Key | Type | Component | Behaviour |
|----------|------|-----------|-----------|
| `switch-castle-dungeon` | Boolean | `Castle` | `true` → "Enter The Castle" · `false` → "Enter The Dungeon" |

### Adding a New Flag

1. Create the flag in your LaunchDarkly project (ensure **Client-side SDK availability** is enabled)
2. Use `useLDClient` in the component and call `ldClient.variation('your-flag-key', defaultValue)`

---

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # LDProvider + ReactDOM bootstrap
│   ├── index.css             # Global styles
│   ├── components/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Auth.jsx          # Register / Sign In form
│   │   ├── About.jsx         # About Launchcorp page
│   │   ├── Dashboard.jsx     # Post-login page
│   │   └── Castle.jsx        # LD flag-controlled page
│   └── styles/
│       ├── Home.css
│       ├── Auth.css
│       ├── About.css
│       ├── Dashboard.css
│       └── Castle.css
├── .env                      # Local env vars (gitignored)
├── .env.example              # Template for env vars
├── index.html
├── vite.config.js
└── package.json
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
