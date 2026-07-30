# fe-data-watch

Next.js **13.4** **pages router** app (not App Router). Package manager: **yarn** (`yarn.lock`). Docker build uses **Node 16**. No test suite.

## Commands

```bash
yarn install
yarn dev      # next dev
yarn build
yarn start
yarn lint     # next lint (eslint + prettier as error)
```

## Required env (`NEXT_PUBLIC_*`)

| Var | Used for |
|-----|----------|
| `NEXT_PUBLIC_DATA_WATCH_API_URL` | This product’s BE (`services/http/data-watch-http`) |
| `NEXT_PUBLIC_API_URL` | Other/platform API (`services/http/client-http`) — waitlist, blog, etc. |
| `NEXT_PUBLIC_ALLOWED_EXTENTION` | Comma-separated list; **module crashes if unset** (`constants/allowed-extention.js`) |
| `NEXT_PUBLIC_BASE_URL` | Share URLs (blog) |
| `NEXT_PUBLIC_HJID` / `NEXT_PUBLIC_HJSV` | Hotjar in `_app.js` |

Docker runtime: build bakes placeholders; `entrypoint.sh` sed-replaces `APP_NEXT_PUBLIC_*` in `.next` from real env at container start. `output: 'standalone'` in `next.config.js`.

## Architecture

- **Pages**: `pages/` — marketing/auth at root; app shell under `pages/app/{upload,table,exploration,data-quality}`
- **UI**: `components/base` (primitives), `components/pages/*`, `components/layouts/*`, `components/shared/*`
- **Data layer**: `services/features/<feature>/{repositories,hooks}` — repos call HTTP clients; hooks wrap react-query
- **HTTP**:
  - `dataWatchHttp()` → `${NEXT_PUBLIC_DATA_WATCH_API_URL}/v1` + Bearer from cookie
  - `clientHttp()` → `${NEXT_PUBLIC_API_URL}/v1` + Bearer
- **SSR helpers**: compose via `serverProps(withAuth(), withSession(), …)` (`services/servers/`). Mutate `ctx.res.props` / `notFound` / `redirect`; do not return props from inner fns directly.
- Path alias: `@/*` → repo root (`jsconfig.json`)

## Cookies

Defined in `constants/cookie-keys.js`: `_DW_ACCESS_TOKEN`, `_DW_SESSION_ID`, `_DW_CURRENT_FILE`.

## Style

- Prettier: single quotes, semi, printWidth 100, arrowParens avoid — **eslint fails on format**
- Tailwind + daisyui; custom colors prefixed `c-*` in `tailwind.config.js`
- Feature JS is plain `.js` (not TS), occasional JSDoc types

## Gotchas

- Two backends: do not point data-watch feature repos at `clientHttp`
- Array query params must stay non-bracket form (both HTTP clients use `query-string` serializer on purpose)
- `next-transpile-modules` wraps config for `echarts`/`zrender`; also `transpilePackages: ['react-hotjar']`
