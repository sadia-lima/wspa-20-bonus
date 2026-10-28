# Expense Tracker

Starting point for the Web Software Production course project. 
This project will grow week by week.

- `client/` — React + Vite + TypeScript frontend
- `server/` — Node + Express + TypeScript backend (in-memory storage)

Each part is an independent npm project with its own `node_modules`, and its own Biome config for linting/formatting.

## Running

**Server** (http://localhost:3001):

```
cd server
npm install
npm run dev
```

Starts the Express API with `tsx watch`, so it restarts on file changes. Once it's up you should see `Server listening on http://localhost:3001` in the terminal.

```
src/
  app.ts                     # configures the Express app (middleware + routes)
  server.ts                  # entry point: starts listening
  types/
    expense.ts               # Expense / NewExpense types
    category.ts              # Category / NewCategory types
  store/
    expense.ts               # in-memory expense storage
    category.ts              # in-memory category storage
  routes/
    expense.ts               # GET/POST/PUT/DELETE handlers, mounted at /api/expenses
    category.ts              # GET/POST/PUT/DELETE handlers, mounted at /api/categories
```

Storage is in-memory only (see `server/src/store/`) — data resets every time the server restarts, and it isn't shared across multiple server instances. There's no database yet.

Available endpoints:

| Method | Path                 | Description         |
| ------ | -------------------- | -------------------- |
| GET    | `/api/expenses`       | List all expenses   |
| POST   | `/api/expenses`       | Create an expense   |
| PUT    | `/api/expenses/:id`   | Update an expense   |
| DELETE | `/api/expenses/:id`   | Delete an expense   |
| GET    | `/api/categories`     | List all categories |
| POST   | `/api/categories`     | Create a category   |
| PUT    | `/api/categories/:id` | Update a category   |
| DELETE | `/api/categories/:id` | Delete a category   |

`POST`/`PUT /api/expenses` expect a JSON body with `description` (string), `amount` (number), and `date` (ISO string, e.g. `2026-08-01`). `POST`/`PUT /api/categories` expect a JSON body with `name` (string). A missing/wrong-typed field returns `400`; updating or deleting an unknown `id` returns `404`. Categories aren't linked to expenses yet — they're two independent lists for now.

You can try it without the client, e.g.:

```
curl http://localhost:3001/api/expenses
curl http://localhost:3001/api/categories
```

Or use `server/requests.http` with the [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) VS Code extension — it has a ready-made request for every endpoint above; click "Send Request" above a block to run it.

**Client** (http://localhost:5173):

```
cd client
npm install
npm run dev
```

Starts the Vite dev server with hot reload. The app calls the API directly at `http://localhost:3001`, so the server needs to be running too (see above) — without it you'll see a "Failed to fetch" error in the browser console.

The UI is split by responsibility rather than kept in one file. Categories mirror the expense feature file-for-file:

```
src/
  types/
    expense.ts               # Expense / NewExpense types
    category.ts               # Category / NewCategory types
  api/
    expenses.ts               # the only place that calls fetch() for expenses
    categories.ts             # the only place that calls fetch() for categories
  hooks/
    useExpenses.ts            # owns the expenses state, exposes add/edit/remove
    useCategories.ts          # owns the categories state, exposes add/edit/remove
  utils/
    date.ts                   # dd.mm.yyyy <-> ISO date conversion
    currency.ts               # € formatting
  components/
    ExpenseForm.tsx           # add-expense form
    ExpenseList.tsx           # renders one ExpenseListItem per expense
    ExpenseListItem.tsx       # a row; toggles its own view/edit mode
    ExpenseTotal.tsx          # running total
    CategoryForm.tsx          # add-category form
    CategoryList.tsx          # renders one CategoryListItem per category
    CategoryListItem.tsx      # a row; toggles its own view/edit mode
  App.tsx                     # composition root; also holds the expenses/categories view toggle
```

## Linting

[Biome](https://biomejs.dev/) handles both linting and formatting — there's no separate Prettier/ESLint setup. `client/` and `server/` each have their own `biome.json`, so they can drift independently as the course progresses; there's no shared/root config to keep in sync.

Run from inside either project:

```
npm run lint      # check formatting, imports, and lint rules
npm run lint:fix  # same, but apply the fixes it can make automatically
```

`lint:fix` won't touch anything it can't fix safely (e.g. an unused variable) — it'll still report those for you to fix by hand.

## Running with Docker

Both parts have a `Dockerfile` and can be built/run independently.

**Server**:

```
cd server
docker build -t expense-tracker-server .
docker run -p 3001:3001 expense-tracker-server
```

**Client**:

```
cd client
docker build -t expense-tracker-client .
docker run -p 8080:80 expense-tracker-client
```

The client's built bundle calls the API at `http://localhost:3001` directly from the browser, so as long as the server container is running with port 3001 published, the client will be able to reach it.

## Storage

Storage is persisted in PostgreSQL via a connection pool in `server/src/db/pool.ts`, configured via environment variables.

## Testing

Integration tests run against a dedicated PostgreSQL database (`app_test_db`) so development data is never mutated.

1. Ensure the PostgreSQL container is running:
   ```bash
   docker compose up -d db