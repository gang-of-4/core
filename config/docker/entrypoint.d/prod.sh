#!/bin/bash

pnpm prisma:push

if test -f prisma/seed.ts; then
  pnpm dlx tsx --env-file=.env prisma/seed.ts
fi

pnpm start:prod