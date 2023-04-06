# File Structure Explanation
- `.env` file belongs **outside** `src` as well as our config files
    - `.env` file should contain our `DB_URI` variable for connecting to the database, and `COOKIE_SECRET` variable if we want session
- ### `src`
    - ### `components`
        - Same as our regular `react` frontend this is for all of our reusable components
    - ### `models`
        - Same as our regular `express` backend this is for all of our mongoose models
        - can be omitted entirely if we only want a client app
    - ### `pages`
        - ### `api`
            - Replaces our routes and controllers from `express`
            - File/Folder names determine the route, while each file is essentially a controller
            - route variables should use the `[varName]` syntax
            - files named `index` will be treated as `/`
            - syntax for our handlers is identical to `express`
            - can be omitted entirely if we only want a client app
        - ### Other sub-directories
            - These replace our client-side routes and views from `react`
            - File/Folder names determine the route, while each file is essentially a view component
            - Same naming conventions as the `api` directory
    - ### `styles`
        - All of our `CSS` files should belong here
        - Should use the `module` structure for our css files, to only generate the `CSS` we actually end up using for a given component.
    - ### `utils` (or `config`)
        - Helper functions to be used throughout the project
        - Our `mongoose` connection function here
        - Our wrapper to provide session to routes belongs here
        - Our wrapper to provide `react` context to components belongs here
    - ### `middleware.js`
        - This is where we define any extra middleware we might need
        - The check to make sure a user is authenticated before letting them use the site belongs here
        - probably not necessary if not including login/reg authentication


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
