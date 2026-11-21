# GadgetHub – React and MongoDB e-commerce demo

Pages: Home, Shop, About, Contact, FAQ, Terms, Privacy, Login / Create account.

## Run locally
1. Install Node.js and start MongoDB locally, or create a MongoDB Atlas database.
2. Copy `.env.example` to `.env`, then set `MONGODB_URI` and a random `JWT_SECRET` of at least 32 characters.
3. Install dependencies and start both the API and Vite:

       npm install
       npm run dev

   Open the URL shown by Vite (normally http://localhost:5173). The API runs on port 3000.
4. Build the React app with `npm run build`. To serve the built app and API together, run `npm start`.

The server seeds the MongoDB products collection from the included catalog on first startup. User accounts, carts, orders, and contact messages are stored in MongoDB. Passwords are hashed on the server; session tokens are kept in HTTP-only cookies.

## Structure
- `src/pages/`       one file per page
- `src/components/`  Navbar, Footer, CartDrawer, ProductCard, Legal, Art, Toast
- `src/context/`     CartContext (API-backed cart + toast), AuthContext (API-backed login state)
- `src/data/`        initial product catalog
- `src/utils/`       client-side password validation
- `src/router.jsx`   tiny page router (#home, #shop, ...)
- `src/styles/`      index.css (theme) and pages.css (page layouts)
- `server/`          Express API and Mongoose models
