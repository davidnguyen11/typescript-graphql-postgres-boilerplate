#!/bin/bash

echo "Filling data to `todo_list` table"
node ./scripts/migration/todo-list/index.ts
