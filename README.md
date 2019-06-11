# Graphql Todo API

- [Getting started](#getting-started)
  - [.env file](#env-file)
  - [Database](#database)
  - [Seeding data](#seeding-data)
- [Development](#development)
- [Production](#production)
- [How to write GraphQL](#how-to-write-graphql)
  - [1. Define the schema & type](#1-define-the-schema--type)
  - [2. Register \*.graphql in schema.graphql](#2-register-graphql-in-schemagraphql)
  - [3. Define models for data](#3-define-models-for-data)
  - [4. Implement the resolvers](#4-implement-the-resolvers)
- [Playground](#playground)
- [Usage](#usage)
- [References](#references)

## Getting started

- Make sure you have [Docker](https://www.docker.com/) installed on your machine.
- Make sure you have [NodeJS](https://nodejs.org/en/) installed on your machine.

Then run

**npm**

```bash
npm i
```

**yarn**

```bash
yarn install
```

### .env file

**.env file**

1. Create the `.env` file
2. Copy and parse the database connection information below:

```bash
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_HOST=localhost
POSTGRES_DB=todo
POSTGRES_PORT=54320
```

### Database

To create database, run:

```bash
docker-compose up -d
```

### Seeding data

**dump data**

To initialize the dump data for a database, run:

```bash
npm run seed
```

## Development

To run on development environment

```bash
npm run dev
```

## Production

To run on production environment

```bash
npm start
```

## How to write GraphQL

### 1. Define the schema & type

For more information: [https://graphql.org/learn/schema/](https://graphql.org/learn/schema/)

**graphql/types/todo-list.graphql**

```bash
type ResponseTodoList {
  status: String!
  message: String!
  data: [TodoListItem]
}

type TodoListItem {
  id: ID!
  content: String!
}

input InputTodoListItem {
  content: String!
}

type Query {
  todoListItems(keyword: String): ResponseTodoList!
}

type Mutation {
  createTodoItem(item: InputTodoListItem): ResponseTodoList!
}
```

### 2. Register \*.graphql in schema.graphql

**graphql/types/schema.graphql**

```bash
# import Query.*, Mutation.* from "todo-list.graphql"
```

### 3. Define models for data

The model actually the type of data mapped to fields of table in database.

**models/todo-list.ts**

```ts
export interface TodoListItem {
  id: number;
  content: string;
  created_at: Date;
  updated_at: Date;
}

export interface InputTodoListItem {
  content: string;
}
```

### 4. Implement the resolvers

**graphql/resolvers/queries/todoListItems.ts**

```ts
import { DB } from '../../../types';

export async function todoListItems(db: DB, args: any) {
  const res = await db.query('SELECT * FROM todo_list');
  ...
}
```

**graphql/resolvers/mutations/createTodoItem.ts**

```ts
import { DB } from '../../../types';

export async function createTodoItem(db: DB, args: any) {
  const query = 'INSERT INTO todo_list(content) VALUES($1) RETURNING *';
  const values = ['Call Your Dad'];
  const res = await db.query(query, values);
  ...
}
```

## Playground

This sandbox can only run in development mode by command `yarn dev` or `npm run dev`. After starting the development environment, open:

- [http://localhost:4000/graphql](http://localhost:4000/graphql)

**query - without param**

```bash
query{
  todoListItems{
    status
    data{
      content
    }
  }
}
```

**query - with param**

```bash
query{
  todoListItems(keyword: "Call your Mom"){
    status
    data{
      content
    }
  }
}
```

**mutation - createTodoItem**

```bash
mutation{
  createTodoItem(item:{
    content: "Just relax, dude!"
  }){
    status
    data{
      content
    }
  }
}
```

# Usage

With `express-graphql`, you can just send an HTTP **POST** request to the endpoint you mounted your GraphQL server on, passing the GraphQL query as the query field in a JSON payload.

**POST cURL**

```bash
curl -X POST \
  http://localhost:4000/graphql \
  -H 'Content-Type: application/json' \
  -H 'Postman-Token: c011dc94-6f67-483a-84cb-2bd4ed442a95' \
  -H 'cache-control: no-cache' \
  -d '{
	"query": "{ todoListItems{ data { content } } }"
}'
```

**GET cURL**

```bash
curl -X GET \
  'http://localhost:4000/graphql?query=query+todoListItems%28$keyword:String%29{todoListItems%28keyword:$keyword%29{status}}&variables={%22keyword%22:%22Call%20your%20Mom%22}' \
  -H 'Postman-Token: f92396a4-4f51-47f0-ac20-3c900289358f' \
  -H 'cache-control: no-cache'
```

**POST fetch**

```js
const keyword = 'Call your Mom';
const query = `{ todoListItems(keyword: "${keyword}"){ data { content } } }`;

fetch('/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  body: JSON.stringify({ query }),
})
  .then(res => res.json())
  .then(data => console.log('data returned:', data));
```

**GET fetch**

```js
const query = `
  todoListItems($keyword:String){
    todoListItems(keyword:$keyword){
      status
      data{
        content
      }
    }
  }
`;

const variables = `{"keyword":"Call your Mom"}`;

fetch(`/graphql?query=query+${query}&variables=${variables}`)
  .then(res => res.json())
  .then(data => console.log('data returned:', data));
```

_For more information check:_

- [https://graphql.org/graphql-js/graphql-clients/](https://graphql.org/graphql-js/graphql-clients/)
- [https://blog.apollographql.com/4-simple-ways-to-call-a-graphql-api-a6807bcdb355](https://blog.apollographql.com/4-simple-ways-to-call-a-graphql-api-a6807bcdb355)

# References

- [node-postgres](https://node-postgres.com/)
- [graphql](https://graphql.org/)
- [Apollo server](https://www.apollographql.com/docs/apollo-server/)
- [Docker](https://www.docker.com/)
- [Docker compose](https://docs.docker.com/compose/)
- [https://graphql.org/graphql-js/graphql-clients/](https://graphql.org/graphql-js/graphql-clients/)
- [https://blog.apollographql.com/4-simple-ways-to-call-a-graphql-api-a6807bcdb355](https://blog.apollographql.com/4-simple-ways-to-call-a-graphql-api-a6807bcdb355)
