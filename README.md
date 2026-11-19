# Beauty Calendar — Forma Salon

A fresh React + Vite salon website with Express, SQLite, registration, login, and appointment booking.

## Requirements

Node.js 22 or newer and npm.

## Setup

1. Extract this folder and open it in VS Code.
2. Run `npm install` in the project root.
3. In terminal 1, run `npm run server`.
4. In terminal 2, run `npm run dev`.
5. Open the Vite URL, usually http://localhost:5173/.

The included `.env` contains a randomly generated JWT secret for local development. Do not publish it. If you lose the file, copy `.env.example` to `.env` and replace the placeholder with a secure random secret.

The database is created automatically in `server/beauty-calendar.db` the first time the backend starts. The frontend proxies `/api` to port 3001 through Vite. Visit http://localhost:3001/api/health to verify the backend.

## Folders

- `src/layout`: React pages, navigation, footer, shared data
- `src/stylesheet`: individually formatted CSS files
- `src/auth`: React login/registration pages and auth context
- `server`: Express API, password hashing, token validation, SQLite storage

## Notes

This project uses SQLite for easy local setup, not MySQL. Sample stylist profiles, reviews, contact information and service prices are placeholders. The hero and stylist photos are externally hosted Unsplash images; they may differ from the reference screenshot and require internet access. Booking times are example slots, not a real salon's live schedule. This is a local development starter and needs further security and operational work before public deployment.
