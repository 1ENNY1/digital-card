#!/bin/sh
set -e
echo "migrate"
npx prisma migrate deploy
echo "seed"
node dist/prisma/seed.js
echo "start"
exec node dist/src/main.js
