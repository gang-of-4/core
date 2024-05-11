#!/bin/bash

pnpm config set store-dir /root/.local/share/pnpm/store/v3 --global

pnpm install

pnpm prisma:setup

pnpm dev