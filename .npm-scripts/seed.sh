#!/bin/bash

echo "Filling data to `todo_list` table"
node ./scripts/seed/todo-list/index.ts
