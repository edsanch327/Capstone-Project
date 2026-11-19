# forma. React salon project

This project includes the homepage, services, stylists, our story, reviews,
contact, login, registration, booking, and customer dashboard.

## Folder layout

- `src/layout/`: React page components, navbar and footer
- `src/stylesheet/`: Separate, readable CSS files
- `src/auth/`: Login, registration, auth context and API helper
- `server/`: Express API and SQLite persistence (not browser code)

## Run locally

1. Install Node.js 22+ and run `npm install`.
2. Copy `.env.example` to `.env` and change `JWT_SECRET` to a long random value.
3. In one terminal run `npm run server`.
4. In another terminal run `npm run dev`.
5. Open the local address shown by Vite (usually http://localhost:5173).

If your Windows NVM launcher produces `UnsupportedVersionSpec`, prepend the
real Node installation folder to the terminal PATH as previously discussed.

The hero image uses a remote Unsplash image, so it may not exactly match the
screenshot and requires an internet connection. Stylists and reviews are
clearly labeled sample content. Replace those and the contact information
before publishing. The booking hours are examples.

The backend is a local starter, not a production-hardened deployment.
