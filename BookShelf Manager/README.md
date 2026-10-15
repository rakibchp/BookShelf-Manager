# Book Nook — BookShelf Manager

A responsive MERN application for managing a personal reading list. React and Tailwind CSS provide the interface, Express exposes the API, and MongoDB stores each book.

## Requirements

- Node.js 18 or later
- MongoDB local instance or MongoDB Atlas database

## Run locally (PowerShell)

1. Create `server/.env` and add your MongoDB connection string:

   ```powershell
   MONGO_URI=mongodb+srv://<user>:<password>@<cluster>/<database>?retryWrites=true&w=majority
   PORT=5000
   ```

2. Start the backend in one terminal:

   ```powershell
   cd server
   npm install
   npm run dev
   ```

3. Start the frontend in another terminal:

   ```powershell
   cd client
   npm install
   npm run dev
   ```

   Open the Vite URL (normally `http://localhost:5173`). To use a hosted API, set `VITE_API_URL` to its origin before building the frontend. The default API origin is `http://localhost:5000`.

## API

All successful book records use `{ id, title, author, status, createdAt }`. The MongoDB `_id` is exposed as `id`.

| Method | Endpoint | Purpose | Request body |
| --- | --- | --- | --- |
| GET | `/books` | List books, newest first | — |
| POST | `/books` | Add a book | `{ "title": "The Hobbit", "author": "J.R.R. Tolkien" }` |
| PUT | `/books/:id` | Edit book details or set reading status | `{ "title": "The Hobbit", "author": "J.R.R. Tolkien" }` or `{ "status": "read" }` / `{ "status": "unread" }` |
| DELETE | `/books/:id` | Delete a book | — |

The API returns JSON errors for empty required fields, invalid IDs, and missing records. Try the endpoints in Postman or Insomnia at `http://localhost:5000/books`.

## Exam requirements covered

- React components: `BookForm`, `BookList`, and `BookItem`, with edit, delete, and read/unread actions
- React state and props, responsive Tailwind UI, immediate list updates after API success
- Express JSON middleware and the four required `/books` endpoints
- Mongoose Book schema with title, author, read status, and creation date
- MongoDB persistence and API validation/error responses

## GitHub and deployment steps

1. Create a GitHub repository and push this project (`git init`, `git add .`, `git commit`, then add the repository remote and push).
2. Deploy the backend from the `server` folder and configure `MONGO_URI` and `PORT` in the hosting provider's environment settings.
3. Deploy the frontend from the `client` folder. Set `VITE_API_URL` to the deployed backend origin before building, and allow that frontend origin in backend CORS settings if the host requires it.
4. Verify the deployed page can list, add, mark read/unread, and delete books. Submit the GitHub repository and public app URL to the assessor.

Never commit database credentials. If a credential was previously committed or shared, rotate it in MongoDB Atlas before using that database again.
