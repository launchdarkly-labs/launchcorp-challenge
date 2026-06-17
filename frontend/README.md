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

> **Use the Test environment only.** For simplicity, create and toggle all flags inside the LaunchDarkly **Test** environment, and use that environment's client-side ID here. Do not point this app at Production — gating rooms with real production flags will cause confusing cross-environment behavior, and the puzzle flag keys (`feature-flag`, `fuel-system`, etc.) are throwaway names you would never want in a production project.

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
| `/` | `Home` | Landing page with Sign In and Know More button |
| `/about` | `About` | Information about Launchcorp |
| `/dashboard` | `Dashboard` | Orphaned route (kept for reference) — sign-in now goes straight to `/airlock` |
| `/airlock` | `Airlock` | Airlock room — entry gated by `allow_airlock_room`; proceed gated by `feature-flag` |
| `/engine-room` | `EngineRoom` | Engine room — proceed gated by 7 system-readiness flags |
| `/communication-array` | `CommunicationArray` | Communication Array — proceed gated by `wordle-variation` |
| `/mission-control` | `MissionControl` | Final destination — celebration screen with spaceships |

## User Flow

```
/  (Home)
├── Sign In (as `guest`) → on success → /airlock
│                               └── Proceed to Engine Room        → /engine-room
│                                         └── Proceed to Communication Array → /communication-array
│                                                   └── Proceed To Mission Control Center → /mission-control
│                                                             └── Go Home → /
└── Know more about Launchcorp → /about
```

> Only the literal name `guest` (case-insensitive) is accepted by the backend's `/login` endpoint. Any other input returns 401.

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

All flags below **must** be created in the **Test** environment of your LaunchDarkly project. For each flag, ensure **Client-side SDK availability** (*SDKs using Client-side ID*) is enabled, otherwise the browser SDK will fall back to the default value and the gate will fail.

Flag keys, types, and value checks are case-sensitive and exact.

#### 1. Enter the Airlock

| Flag Key | Type | Code Default | Component | Required to Pass |
|----------|------|--------------|-----------|------------------|
| `allow_airlock_room` | Boolean | `false` | `Airlock` | Served value `true` |

If `false`, the Airlock renders an "Entry Denied" view.

#### 2. Airlock → Engine Room (decoded via Atbash transmission puzzle)

| Flag Key | Type | Code Default | Component | Required to Pass |
|----------|------|--------------|-----------|------------------|
| `feature-flag` | Boolean | `''` (string) | `Airlock` | Served value strictly `=== true` |

The puzzle decodes `21 22 26 7 6 9 22 / 21 15 26 20` (Atbash where `A=26 … Z=1`) to **FEATURE FLAG** → flag key `feature-flag`. Click "Proceed to Engine Room" fails with "Entry Denied" if this evaluates to anything other than boolean `true`.

#### 3. Engine Room → Communication Array (crew-reports CSP puzzle)

Each of the 7 systems is its own **Boolean** flag. The button "Proceed to Communication Array" requires the exact configuration below — every other combination yields a blaring red "Access Denied":

| Flag Key | Type | Required Value |
|----------|------|----------------|
| `fuel-system` | Boolean | `true` |
| `navigation-core` | Boolean | `true` |
| `life-support` | Boolean | `true` |
| `shield-generator` | Boolean | `true` |
| `thruster-control` | Boolean | `true` |
| `communications-array` | Boolean | `false` |
| `docking-clamps` | Boolean | `false` |

(Code default for each is `false`, so missing flags break the ON requirements but satisfy the OFF requirements.)

#### 4. Communication Array → Mission Control (Wordle decryption puzzle)

| Flag Key | Type | Code Default | Component | Required to Pass |
|----------|------|--------------|-----------|------------------|
| `wordle-variation` | String | `''` | `CommunicationArray` | Served value must be exactly one of the 10 cosmic words below (uppercase, case-sensitive) |

Accepted values: `NEBULA`, `QUASAR`, `PULSAR`, `PHOTON`, `AURORA`, `COSMIC`, `APOLLO`, `GALAXY`, `METEOR`, `VOYAGE`. Any other value (including lowercase variants) triggers "Access Denied".

---

### Adding a New Flag

1. Create the flag in your LaunchDarkly project (ensure **Client-side SDK availability** is enabled).
2. Use `useLDClient` in the component and call `ldClient.variation('your-flag-key', defaultValue)`.
3. Be deliberate about the default — when the flag is missing or the SDK is misconfigured, this is what the gate evaluates against.
4. Add a row to the appropriate table above so other contributors know the flag must exist.

---

## Project Structure

```
frontend/
├── src/
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # LDProvider + ReactDOM bootstrap
│   ├── index.css             # Global styles
│   ├── components/
│   │   ├── Home.jsx                # Landing page (sign-in)
│   │   ├── Auth.jsx                # Sign In form
│   │   ├── About.jsx               # About Launchcorp page
│   │   ├── Dashboard.jsx           # (orphaned)
│   │   ├── Airlock.jsx             # LD-gated airlock room
│   │   ├── EngineRoom.jsx          # LD-gated engine room
│   │   ├── CommunicationArray.jsx  # LD-gated comm array
│   │   ├── MissionControl.jsx      # Final celebration screen
│   │   ├── BackButton.jsx          # Reusable top-left back button
│   │   └── PuzzleButton.jsx        # "Solve To Proceed" button + modal
│   └── styles/
│       ├── Home.css
│       ├── Auth.css
│       ├── About.css
│       ├── Dashboard.css
│       ├── Airlock.css
│       ├── EngineRoom.css
│       ├── CommunicationArray.css
│       ├── MissionControl.css
│       ├── BackButton.css
│       └── PuzzleButton.css
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
