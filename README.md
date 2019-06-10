# Todo API

# Getting started

## Database

Make sure you have [Docker](https://www.docker.com/) installed

### Setting up

**.env file**

1. Create the `.env` file
2. Copy and parse the `connection information` below:

```bash
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_HOST=localhost
POSTGRES_DB=todo
POSTGRES_PORT=54320
```

**database**
```bash
docker-compose up -d
```

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
