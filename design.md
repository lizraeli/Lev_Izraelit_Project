## Project Design

- This project utilizes the [The One API](https://the-one-api.dev/) to get information about the Lord of the Rings movies, characters and quotes.
- This project uses the [NextJS](https://nextjs.org/) framework and makes API requests from the server side, reading the API key from an environment file.
  - Network requests for all movies (`/movie`) and all characters (`/character`) are made using [getStaticProps](https://nextjs.org/docs/basic-features/data-fetching/get-static-props) - NextJS makes the request at build time, pre-rendering the movies and characters pages.
  - Network requests utilizing dymaic parameters are made using [getServerSideProps](https://nextjs.org/docs/basic-features/data-fetching/get-server-side-props) - NextJS makes these API request every time the page is request, utilizing the query parameters supplied to the url. These API requests include fetching a single movie (`/movie/{id}`), quotes for movie `/movie/{id}/quote`, single character (`/character/{id}`) and quotes for character (`/character/{id}/quote`).
- The project files are nested within the `src` folder, with the following folder structure:
  - [src/components/](src/components/): components that are used across one or more pages.
  - [src/hooks](src/hooks/): React hooks that are used across one or more pages.
  - [src/models](src/models/): Type definitions following the response from The One API.
  - [src/Providers](src/providers/): React providers - current only the Material UI [ThemeProvider](https://mui.com/material-ui/customization/theming/#theme-provider), used to customize the primary color and font.
  - [src/pages](src/pages): the web pages, `index.tsx` being the homepage, and two nested folders:
    - [src/pages/movies]: this folder contains:
      - an `index.tsx` file, corresponding to this web app's `/movies` url. This is a pre-rendered movies page.
      - an `[id]` page, corresponding to `/movies/[id]` route. When navigating to this route, the NextJS backend makes a request to the API routes to fetch the single movie details and quotes for the movie, and then returns a page pre-populated with the fetched data.
    - [src/pages/characters]: similarly to the `movies` folder, this folder contains:
      - an `index.tsx` file, corresponding to this web app's `/movies` url. This is a pre-rendered movies page.
      - an `[id]` page, corresponding to `/characters/[id]` route. When navigating to this route, the NextJS backend makes a request to the API routes to fetch the single character details and quotes for the character, and then returns a page pre-populated with the fetched data.
- This Project uses the [Material UI](https://mui.com/material-ui/getting-started/overview/) library for styling:
  - Custom styles are defined either inline using the [sx prop](https://mui.com/system/getting-started/the-sx-prop/) or using the [styled](https://mui.com/system/styled/) utility function in certain use-cases, such as when specifying a media query.
  - Where a large amount of items (charachters, quotes) are available to be rendered, frontend pagination is used to display 10 items at a time.
  - Icons are supplied as part of the Material UI [@mui/icons-material](https://mui.com/material-ui/material-icons/) package.