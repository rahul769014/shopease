# ShopEase

A shopping app practice project built with React, Vite, and Redux Toolkit.

## Run locally

```sh
npm install
npm run dev
```

## Checks

```sh
npm run lint
npm run build
```

## Data and state

- Product data, including image URLs, is fetched from DummyJSON.
- Shared product, search, cart, and wishlist state is managed in `src/store/`.
- Cart and wishlist items are saved in the browser's local storage.
- Registration and login use the configured MockAPI users resource.
