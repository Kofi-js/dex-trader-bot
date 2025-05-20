Here’s a granular, testable MVP plan. Each task is atomic, with a clear “do X, verify Y” pattern.

---

## 1. Repo & Tooling Setup

1. **Initialize Monorepo**

   * **Start**: Create a new Git repo.
   * **End**: `package.json` in root with workspaces for `apps/frontend`, `apps/backend`, `contracts`.
   * **Test**: `npm install` runs successfully and workspaces are linked.

2. **Add Docker Compose**

   * **Start**: Add `infra/docker-compose.yml` with Supabase and local Hardhat node.
   * **End**: `docker-compose up -d` launches Supabase and Hardhat.
   * **Test**: Can connect to Supabase at its local port and Hardhat RPC at `http://localhost:8545`.

---

## 2. Supabase Auth & DB

3. **Provision Supabase Project**

   * **Start**: `supabase init` in `infra/`.
   * **End**: `.supabase` folder present, local Supabase running.
   * **Test**: Visit Supabase Studio at `http://localhost:54323`.

4. **Create DB Schema**

   * **Start**: Write SQL migrations in `infra/migrations/` for tables:

     * `users` (id, email)
     * `settings` (user\_id FK, risk\_pct, strategy)
     * `trades` (id, user\_id FK, timestamp, pair, side, price, pnl)
   * **End**: Migrations applied.
   * **Test**: Check tables exist via Supabase Studio.

5. **Enable Supabase Auth**

   * **Start**: Configure email/password auth in Supabase settings.
   * **End**: Allowed sign-ups.
   * **Test**: Sign up via Supabase Studio “Auth” tab; new user appears in `auth.users`.

---

## 3. Frontend Scaffold (Next.js + Supabase)

6. **Scaffold Next.js App**

   * **Start**: `npx create-next-app apps/frontend --typescript`.
   * **End**: Runs on `http://localhost:3000`.
   * **Test**: “Welcome” page loads.

7. **Install & Configure Supabase Client**

   * **Start**: `npm install @supabase/supabase-js`, add `NEXT_PUBLIC_SUPABASE_URL` & `NEXT_PUBLIC_SUPABASE_KEY` in `.env.local`.
   * **End**: `lib/supabaseClient.ts` exports configured client.
   * **Test**: Import client in a page and call `.from('users').select()`, logs empty array.

8. **Build Auth UI**

   * **Start**: Create `/pages/login.tsx` with email/password form.
   * **End**: Calls `supabase.auth.signIn()` on submit.
   * **Test**: Enter credentials, verify `supabase.auth.session()` returns a session.

9. **Protect Dashboard Route**

   * **Start**: Create `/pages/dashboard.tsx` that checks `supabase.auth.session()`.
   * **End**: Redirects to `/login` if no session.
   * **Test**: Access `/dashboard` unauthenticated → redirect; authenticated → shows placeholder.

---

## 4. Backend Scaffold (TypeScript + Fastify)

10. **Scaffold Backend App**

    * **Start**: `npm init -y` in `apps/backend`, install `fastify`, `@supabase/supabase-js`, `dotenv`.
    * **End**: `src/index.ts` starts Fastify server on port 4000.
    * **Test**: `curl http://localhost:4000/health` returns `{ status: 'ok' }`.

11. **Configure Supabase Client in Backend**

    * **Start**: Add `.env` with SUPABASE URL/KEY.
    * **End**: `database/client.ts` exports Supabase Admin client.
    * **Test**: Call `client.from('trades').select()` in a test route.

12. **Add Auth Middleware**

    * **Start**: Write Fastify hook that verifies Supabase JWT from `Authorization` header.
    * **End**: `request.user` populated with `user.id`.
    * **Test**: Call protected route without token → 401; with valid token → 200.

---

## 5. Smart Contract Setup (Hardhat + Solidity)

13. **Initialize Hardhat Project**

    * **Start**: `npx hardhat` in `contracts/`, choose TS project.
    * **End**: `hardhat.config.ts` exists.
    * **Test**: `npx hardhat compile` runs without errors.

14. **Write DexExecutor.sol Stub**

    * **Start**: In `contracts/src/DexExecutor.sol`, add empty contract with `executeTrade(address, uint256)`.
    * **End**: Contract compiles.
    * **Test**: `npx hardhat compile` still passes.

15. **Deploy to Local Hardhat**

    * **Start**: Add `scripts/deploy.ts` that deploys `DexExecutor`.
    * **End**: Run `npx hardhat run scripts/deploy.ts --network localhost`.
    * **Test**: Console logs deployed address; contract exists on Hardhat node.

---

## 6. Core Bot Engine & Execution

16. **Set Up Ethers & Alchemy**

    * **Start**: Install `ethers`, set `ALCHEMY_URL` in backend `.env`.
    * **End**: `providers/eth.ts` exports `provider` and `signer`.
    * **Test**: In a test route, call `provider.getBlockNumber()` and log the result.

17. **Fetch On-Chain Price**

    * **Start**: Write a service method that reads Uniswap V2 pair reserves.
    * **End**: Returns `price = reserve1 / reserve0`.
    * **Test**: Call service in a test and log a numeric price.

18. **Compute RSI Signal**

    * **Start**: Install `technicalindicators`, write a function that takes `number[]` closes → RSI.
    * **End**: Returns latest RSI.
    * **Test**: Supply sample array, verify RSI matches known output.

19. **Trade Executor Stub**

    * **Start**: In `services/executor.ts`, write `executeTrade(pair, amount)` that logs intent.
    * **End**: Returns a mock TX hash.
    * **Test**: Call from an API route, verify response contains dummy hash.

20. **Wire Bot Engine**

    * **Start**: Create `services/bot.ts` that:

      1. Fetch price series
      2. Compute RSI
      3. If RSI < 30 or > 70, call `executeTrade`
    * **End**: Exposes `runStrategy()` function.
    * **Test**: Invoke manually, log “buy”/“sell” decisions.

---

## 7. Scheduling & Persistence

21. **Add Scheduler**

    * **Start**: Install `node-cron`, schedule `bot.runStrategy()` every minute.
    * **End**: Cron job triggers.
    * **Test**: Observe console logs every minute.

22. **Persist Trade Records**

    * **Start**: Extend `executeTrade` to insert a row into `trades` table after run.
    * **End**: New trade record in Supabase on each execution.
    * **Test**: Verify a row in `supabase.trades` after a mock “trade.”

---

## 8. Frontend – Display Live Data

23. **Create Trades API Endpoint**

    * **Start**: In backend, add `/api/trades` that returns last 50 trades for a user.
    * **End**: Secured with auth middleware.
    * **Test**: Auth’d request returns JSON array of trades.

24. **Build Trades Table Component**

    * **Start**: In frontend, create `<TradeTable>` that fetches `/api/trades`.
    * **End**: Renders rows: timestamp, pair, side, price, P\&L.
    * **Test**: Navigate to `/dashboard`, see trade history table.

25. **Add P\&L Chart**

    * **Start**: Use a chart lib (e.g. Recharts) to plot cumulative P\&L over time.
    * **End**: `<PnLChart>` shows line graph.
    * **Test**: Chart renders with sample data.

---

## 9. CI/CD & Containerization

26. **Dockerize Backend**

    * **Start**: Write `infra/Dockerfile.backend` that builds and runs `apps/backend`.
    * **End**: `docker build -f Dockerfile.backend .` produces image.
    * **Test**: Run container locally; API responds.

27. **Dockerize Frontend**

    * **Start**: Write `infra/Dockerfile.frontend` for `apps/frontend`.
    * **End**: Image builds.
    * **Test**: Run container; UI accessible.

28. **Set Up GitHub Actions**

    * **Start**: Add `.github/workflows/ci.yml` to lint, test, and build both apps on push.
    * **End**: Workflow triggers.
    * **Test**: Push a commit → GitHub shows passing CI.

---

## 10. Final Verification & Documentation

29. **End-to-End Smoke Test**

    * **Start**: In a fresh environment, `docker-compose up` then ok flows:

      * Sign up → login
      * Bot runs → trades logged
      * Dashboard updates
    * **End**: All flows complete without manual intervention.
    * **Test**: Document steps and results.

30. **Write README**

    * **Start**: Draft `README.md` covering setup, env vars, running scripts.
    * **End**: README approved.
    * **Test**: A new developer follows README to spin up MVP successfully.

---

You can hand off each numbered task to your engineering LLM; each one is self-contained, verifiable, and leaves you with a clear pass/fail once completed.
