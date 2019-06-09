# Typescript & GraphQL & Postgres Boilerplate

- [Getting started](#getting-started)
  - [Database](#database)
  - [Automatic code splitting](#automatic-code-splitting)

## Getting started

Make sure you have [Docker](https://www.docker.com/) installed

### Database

To install the database management, run:

```bash
docker-compose up -d
```

To create database, run:

```bash
docker exec -it todo psql -U postgres -c "create database todo"
```

**.env file**

1. Create the `.env` file
2. Copy and parse the connection information below:

```bash
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=todo
DB_PORT=54320
```

## Create tables

Open and run the `database/sql/database.sql` by postgres tools (i.e. [pgAdmin](https://www.pgadmin.org/))

## Seeding data

**dump data**

To initialize the dump data for `todo` database, run:

```bash
npm run seed
```

## Development

To run development environment

```bash
npm run dev
```

## Production

To run production environment

```bash
npm start
```

# References

- [node-postgres](https://node-postgres.com/)
- [pgAdmin](https://www.pgadmin.org/)
