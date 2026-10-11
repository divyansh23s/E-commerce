# Ecommerce Store

## Run locally

1. In `backend/.env`, set `DB_CONNECTION` to your MongoDB connection URI and `SECRET_KEY` to a long random value. This file is ignored by Git.
2. In Terminal 1, install and start the backend:

   ```sh
   cd backend
   npm install
   npm run seed
   npm start
   ```

   The API listens on port `5001` by default.

3. In Terminal 2, install and start the frontend:

   ```sh
   cd frontend
   npm install
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000).

Keep both terminals open while using the app. If the frontend was already running when its proxy setting changed, stop it with `Ctrl+C` and run `npm start` again.
