# Utsav Family Restaurant & Banquet Hall MERN Website

This is a MERN version of the Utsav website:

- MongoDB + Mongoose for optional persisted site content
- Express + Node API
- React + Vite frontend
- Responsive luxury restaurant and banquet hall UI

## Structure

```text
utsav-mern/
  client/   React frontend
  server/   Express API and MongoDB model
```

## Setup

```bash
npm install
```

Optional MongoDB setup:

```bash
copy server\.env.example server\.env
```

Edit `server/.env` and set `MONGO_URI`. If `MONGO_URI` is not set or MongoDB is unavailable, the API uses fallback seed data so the app still runs.

## Development

```bash
npm run dev
```

Frontend: `http://127.0.0.1:5173`

Backend API: `http://127.0.0.1:5000/api/site`

## Production Build

```bash
npm run build
npm run start
```
