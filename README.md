# Type Jr – Typing Speed Test App

##  Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)

---

## Features

-  User registration & login with JWT-based authentication
- Multiple test modes: time-based & word-count-based
- Results history saved per registered user
- Clean, responsive UI built with Tailwind CSS
- Alerts and error handling on both client & server

---

## How To Run App

1. Clone the repository.
2. Create a PostgreSQL database.
3. Run `scripts/databaseModel.sql`.
4. Run `scripts/seedTestCategories.sql`.
5. `cd client` and run `npm install`.
6. `cd server` and run `npm install`.
7. Create a `.env` file in the `server` directory with the following environment variables:
   - `PORT`
   - `DATABASE_URL`
   - `SECRET_KEY`
8. Start the client with: `npm run dev`
9. Start the server with: `npm run start`

