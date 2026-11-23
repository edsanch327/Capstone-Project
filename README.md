# Beauty Calendar — Forma Salon

React + Vite frontend, Express backend, PostgreSQL database, login, registration and appointment booking.

## Setup

1. Install Node.js 22+, PostgreSQL and npm.
2. Create a PostgreSQL database named `beauty_calendar` (for example, using pgAdmin or `createdb beauty_calendar`).
3. Copy `.env.example` to `.env`, set `DATABASE_URL` with your PostgreSQL username/password and set a unique `JWT_SECRET` of 32+ characters. **Keep the old JWT_SECRET** if you want existing login tokens to remain valid.
4. Run `npm install` in the project root.
5. Run `psql -U postgres -d beauty_calendar -f server/01-schema.sql` (or run that SQL file in pgAdmin Query Tool).
6. To import accounts from the original SQLite file, run `psql -U postgres -d beauty_calendar -f server/02-users.sql` and then `psql -U postgres -d beauty_calendar -f server/03-appointments.sql`. **These files contain user account data and password hashes: keep them private.**
7. Run `npm run server` in one terminal and `npm run dev` in another.
8. Open the Vite URL (usually http://localhost:5173). Check http://localhost:3001/api/health.

The Express server also creates the PostgreSQL tables automatically if they do not exist. Do not run the data import scripts against a database that already has conflicting user records without reviewing them first.

## Files

- `src/layout`: existing React pages and booking UI (unchanged)
- `src/auth`: existing login, register and auth context (unchanged)
- `src/stylesheet`: existing styles (unchanged)
- `server/index.js`: PostgreSQL-backed Express API using parameterized `pg` queries
- `server/01-schema.sql`: PostgreSQL table definitions, preserving original MySQL comments
- `server/02-users.sql`: original SQLite accounts and password hashes
- `server/03-appointments.sql`: original SQLite appointments

The original SQLite database is not needed after successful migration. This ZIP excludes it to avoid confusion and duplicates. The existing React frontend continues using `/api` and Vite proxies it to port 3001. This project is a local development starter, not a production-hardened deployment.
