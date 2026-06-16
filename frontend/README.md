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
| `/dashboard` | `Dashboard` | Shown after sign in — contains the Enter The Airlock Room button |
| `/airlock` | `Airlock` | Airlock room — gated by LaunchDarkly flag |
| `/engine-room` | `EngineRoom` | Engine room — gated by LaunchDarkly flag |

## User Flow

```
/  (Home)
├── Register        → creates account, shows confirmation
├── Sign In         → on success → /dashboard
│                         └── Enter The Airlock Room → /airlock
│                                   └── Proceed to Engine Room → /engine-room
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

The following flags must be created in your LaunchDarkly project for the app to work as intended. For each flag, ensure **Client-side SDK availability** (SDKs using Client-side ID) is enabled.

| Flag Key | Type | Default (off) | Component | Behaviour |
|----------|------|---------------|-----------|-----------|
| `allow_airlock_room` | Boolean | `false` | `Dashboard`, `Airlock` | `true` → entry allowed to `/airlock` · `false` → "Entry Denied" |
| `engine_room_access` | String | `""` | `Airlock` | Value `"You Are Ready"` → entry allowed to `/engine-room` · anything else → "Entry Denied" |

### Adding a New Flag

1. Create the flag in your LaunchDarkly project (ensure **Client-side SDK availability** is enabled)
2. Use `useLDClient` in the component and call `ldClient.variation('your-flag-key', defaultValue)`
3. Add a row to the table above so other contributors know it must be created

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
│   │   ├── Airlock.jsx       # LD flag-gated airlock room
│   │   ├── EngineRoom.jsx    # LD flag-gated engine room
│   │   └── BackButton.jsx    # Reusable top-left back button
│   └── styles/
│       ├── Home.css
│       ├── Auth.css
│       ├── About.css
│       ├── Dashboard.css
│       ├── Airlock.css
│       ├── EngineRoom.css
│       └── BackButton.css
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
