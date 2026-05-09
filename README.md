# Shared Grid App

Shared Grid App is a real-time collaborative grid where users can claim cells on a shared board. Each user gets a persistent local identity and color in the browser, clicks an unclaimed cell, and all connected clients see the update live through Socket.IO.

The app also includes a leaderboard that counts how many cells each user has claimed and shows whether a user is currently online.

## Features

- Real-time cell claiming with Socket.IO
- React + Vite frontend
- Express + Socket.IO backend
- MongoDB persistence with Mongoose
- Persistent browser user identity using `localStorage`
- Leaderboard based on claimed cells
- Unique `(x, y)` cell index so the same grid cell cannot be claimed twice

## Project Structure

```text
shared-grid/
  client/        React frontend
  server/        Express, Socket.IO, and MongoDB backend
  README.md      Project guide
```

## Requirements

Before running the project locally, install:

- Node.js
- npm
- MongoDB, either local MongoDB or a hosted MongoDB Atlas database

The app currently uses these local URLs:

- Backend: `http://localhost:5000`
- Frontend: `http://localhost:5174`

These values are configured through `.env` files.

## Clone the Project

```bash
git clone <repository-url>
cd shared-grid
```

Replace `<repository-url>` with the actual Git repository URL.

## Install Dependencies

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

## Configure Environment Variables

Create a `.env` file inside the `server` folder:

```bash
cd server
touch .env
```

Add the backend environment variables:

```env
DB_URL=mongodb://127.0.0.1:27017/shared-grid
PORT=5000
BACKEND_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5174
```

For MongoDB Atlas, use your Atlas connection string instead:

```env
DB_URL=mongodb+srv://<username>:<password>@<cluster-url>/shared-grid
```

Create a `.env` file inside the `client` folder:

```bash
cd ../client
touch .env
```

Add the frontend environment variables:

```env
VITE_BACKEND_URL=http://localhost:5000
VITE_FRONTEND_URL=http://localhost:5174
```

Do not commit real credentials to Git.

## Run the App Locally

You need two terminal windows: one for the backend and one for the frontend.

### Terminal 1: Start the Backend

From the project root:

```bash
cd server
npm run dev
```

The backend should start on:

```text
http://localhost:5000
```

If you do not want to use nodemon, run:

```bash
npm start
```

### Terminal 2: Start the Frontend

From the project root:

```bash
cd client
npm run dev
```

The frontend should start on:

```text
http://localhost:5174
```

Open that URL in your browser.

## How to Test Real-Time Behavior

1. Open `http://localhost:5174` in one browser tab.
2. Open the same URL in another tab, another browser, or an incognito window.
3. Click different cells on the grid.
4. Confirm that claimed cells appear live in every open client.
5. Open the leaderboard and confirm the claimed-cell counts update.

Each browser profile gets its own local user ID and color. Opening a normal tab in the same browser profile usually reuses the same user because the identity is stored in `localStorage`.

## Database Notes

Cells are stored in MongoDB through the `Cell` model. The model defines a unique compound index on `x` and `y`, which means MongoDB should reject duplicate claims for the same grid coordinate.

```js
cellSchema.index({ x: 1, y: 1 }, { unique: true });
```

If two users try to claim the same cell at nearly the same time, one insert should succeed and the other should fail with a duplicate key error. The server currently catches that error and logs `"Already claimed"`.

If you already have duplicate cell records in your database before this index exists, MongoDB may fail to create the unique index. In that case, clean up duplicate records first, then restart the server or create the index manually.

## Useful Commands

Run the frontend development server:

```bash
cd client
npm run dev
```

Build the frontend:

```bash
cd client
npm run build
```

Lint the frontend:

```bash
cd client
npm run lint
```

Run the backend development server:

```bash
cd server
npm run dev
```

Run the backend without nodemon:

```bash
cd server
npm start
```

## Troubleshooting

If the frontend cannot connect to the backend, make sure the backend is running on port `5000`.

If the browser shows a CORS error, make sure the frontend is running on `http://localhost:5174`, because the backend currently allows that origin.

If MongoDB connection fails, check that `server/.env` exists and that `DB_URL` is correct.

If duplicate claims appear in the leaderboard, confirm the unique index exists in MongoDB and that there are no old duplicate records in the collection.
