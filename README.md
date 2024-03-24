# Sky Locker

## Setup

Make sure to install the dependencies:

```bash
bun install
```

Make sure to set up the GitHub app

```dotenv
NUXT_JWT_TOKEN=<token>
NUXT_PUBLIC_GITHUB_APP_CLIENT_ID=<client-id>
NUXT_GITHUB_APP_CLIENT_SECRET=<client-secret>
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
sudo bun db:start
bun dev
```
