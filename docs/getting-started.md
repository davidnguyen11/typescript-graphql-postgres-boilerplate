# Getting started

## Database

Make sure you have [Docker](https://www.docker.com/) installed

### Setting up

**Commands**

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
2. Copy and parse the `connection information` below:

```bash
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=todo
DB_PORT=54320
```

## Migration

**dump data**

To initialize the dump data for `todo` database, run:

```bash
npm run migrate
```
