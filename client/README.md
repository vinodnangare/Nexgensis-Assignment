# Product Admin Dashboard

A small admin dashboard to log in and manage products. Built with **React (Vite) + Tailwind CSS + Axios + React Router + react-hot-toast** using the [DummyJSON API](https://dummyjson.com).

**Live demo:** <https://admin-product-management.netlify.app/>

> Built with React + Vite instead of Next.js. `/products/[id]` is `/products/:id` in React Router.

## Setup
```bash
git clone <https://github.com/vinodnangare/Nexgensis-Assignment>
cd <client>
npm install
npm run dev
```
Login: **emilys / emilyspass**

## Project structure
```
src/
├── api/        axiosInstance.js, authApi.js, productApi.js
├── Component/  small reusable UI pieces (table, card, badges, skeletons, modals ...)
├── hooks/      useDebounce, useMediaQuery, useProducts
├── Pages/      LoginPage, ProductsPage, ProductDetailPage, NotFoundPage
└── utils/      auth, queryParams, localChanges, format, categoryColor
```

## What I finished
- [x] Login with errors, protected routes, logout
- [x] Product list: table on desktop, cards on mobile (image, title, category, price, rating, stock)
- [x] Pagination with limit/skip: page numbers, Previous/Next, page size 10/20/50, "Showing x–y of z"
- [x] Debounced search (500 ms), back to page 1 on change
- [x] Category filter and sort by price / rating / title
- [x] Product details (image gallery, description, price, reviews) and a not-found page
- [x] Add / edit / delete with validation and a confirm popup
- [x] Skeleton loading, empty state, and error state with Retry
- [x] One shared Axios file (token + central error handling)
- [x] Page, page size, search, category and sort saved in the URL
- [x] No React Query / SWR / table or pagination libraries

## Decisions
**Fast typing.** `useDebounce` waits until typing stops, and each fetch uses an `AbortController`. When a new request starts, the effect cleanup cancels the old one, so an old response can never replace a new one. Tested with `delay=2000`.

**Search + category.** The API cannot do both, so they are mutually exclusive: choosing one clears the other. Filtering search results in the browser would break `limit/skip` pagination and the total count. The UI tells the user.

**Add / edit / delete are not saved by the API.** I still call the real endpoints, and I also keep the changes in `localStorage` and apply them on top of the API data (added on top, edited replaced, deleted removed). Limitation: added products show only on page 1 of the unfiltered list.

**Bad URL values.** `readParams` turns `?page=abc` and `?limit=7` into safe defaults. `?page=999` redirects to the last page.

**Double clicks.** A `useRef` lock blocks repeated Save / Login / Delete instantly, because state updates are asynchronous. The button is also disabled for visual feedback.

**Skeleton loading.** It has the same shape as the real content (table rows on desktop, cards on mobile), so the page doesn't jump when data arrives.

**Category colors.** The character codes of the category name are added up, and `sum % number_of_colors` picks a color. The same category always gets the same color. Some categories can share a color because there are fewer colors than categories.

## Problem I faced
After deploying to Netlify, the app worked fine when I clicked through it, but refreshing any inner page (like `/products` or `/products/5`) showed Netlify's own "Page not found" screen instead of my app.

This happens because this is a Single Page Application: there is really only one HTML file, `index.html`, and React Router draws all the other "pages" inside the browser using JavaScript, without asking the server for a new page. When I click a link, React Router intercepts it and swaps the content — the server is never involved. But when I hit refresh, the browser does ask the server directly for that exact path (e.g. `/products/5`), and Netlify has no actual file or route at that path, so it returns a 404.

I fixed it by adding a `public/_redirects` file with one line:
```
/*  /index.html  200
```
This tells Netlify: for any path (`/*`), serve `index.html` instead (with a 200 status, not a redirect), so React Router can load and take over routing on the client side again. I tested it by refreshing on `/products`, `/products/5`, and a random wrong path like `/xyz`, and all three now load correctly instead of showing Netlify's 404.

## Where AI helped
I used AI to plan the folder structure (api / Component / hooks / Pages / utils), review edge cases I hadn't thought of on my own (the search race condition, `?page=999`, double-click submits), and speed up writing repetitive UI markup like the badges and skeletons. I did not copy any full solution from anywhere; I wrote, tested and can explain every line, and I made the actual fixes (like the Netlify redirect and the search bar bug) myself once the problem showed up while testing.