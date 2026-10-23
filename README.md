# ShopEase

ShopEase is a practice online shopping website. It was built to learn how to
create a website with React and connect its pages and shopping features.

## What this project does

1. Shows a homepage with links to product categories.
2. Loads product information and images from the DummyJSON service.
3. Lets visitors browse products, new arrivals, deals, and categories.
4. Lets visitors create an account and log in using a MockAPI practice service.
5. Lets logged-in users add products to a cart.
6. Lets visitors save products to a wishlist.
7. Saves cart and wishlist choices in the browser, so they can remain after a
   page refresh on the same browser.
8. Uses Redux Toolkit to share product, search, cart, and wishlist information
   between pages.
9. Uses a responsive layout so the website can be viewed on desktop and mobile
   screens.

## Tools and services used

- **React** builds the pages and reusable parts of the website.
- **Vite** runs the project during development and creates the production build.
- **React Router** lets visitors move between pages.
- **Redux Toolkit** manages shared shopping information.
- **Tailwind CSS** and regular CSS style the website.
- **Lucide React** provides icons.
- **DummyJSON** supplies practice product data.
- **MockAPI** supplies a practice users service for registration and login.

> This is a learning project. MockAPI and browser storage are for practice and
> are not a secure setup for a real online shop.

## Main pages

- `/` — homepage
- `/category/beauty` — Beauty products
- `/category/fragrances` — Fragrances
- `/category/furniture` — Furniture
- `/category/groceries` — Groceries
- `/new-arrivals` — new arrivals
- `/deals` — discounted products
- `/wishlist` — saved wishlist products
- `/login` — log in
- `/register` — create an account
- `/dashboard` — shopping dashboard (login required)
- `/cart` — shopping cart (login required)

## Run the project on your computer

1. Install [Node.js](https://nodejs.org/) if it is not already installed.
2. Open this project folder in VS Code.
3. Open the VS Code terminal using **Terminal > New Terminal**.
4. Install the project packages:

   ```sh
   npm install
   ```

5. Start the local website:

   ```sh
   npm run dev
   ```

6. Open the local link shown in the terminal, usually `http://localhost:5173`.
7. To stop the local website, click the terminal and press **Ctrl+C**.

## Check the project

Run these commands in the VS Code terminal:

```sh
npm run lint
npm run build
```

- `npm run lint` checks the code for common problems.
- `npm run build` creates the files needed to publish the website.

## Publish changes to the live website

The project can be connected to GitHub and Netlify so that pushing a change to
GitHub starts a Netlify deployment.

1. Save your changes in VS Code.
2. Open **Source Control** with **Ctrl+Shift+G**.
3. Stage the files you want to include by clicking the **+** next to each file.
4. Enter a short message, such as `Update homepage design`.
5. Click **Commit**.
6. Click **Sync Changes** or **Push** to send the commit to GitHub.
7. Open the Netlify site's **Deploys** page and wait for the new deploy to
   finish.
8. Refresh the live website to see the published changes.
