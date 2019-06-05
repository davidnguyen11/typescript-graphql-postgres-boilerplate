#!/bin/bash

rm -rf ./dist

echo "Building ts..."
npm run build

npm run serve