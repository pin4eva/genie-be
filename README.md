## Installation

```bash
yarn install
```

## Running the app

- Rename the file `.env.sample` to `.env` and update the environment to your need
- start the postgres db by running `docker compose up -d`
- start the application

```bash
# watch mode
$ yarn run dev

# production mode
$ yarn run start:prod
```

- visit <http://localhost:8000/seed> to seed contents into the database.
- visit the graphql endpoint on <http://localhost:8000/api/graphql>
