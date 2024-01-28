FROM node:alpine AS base

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@8.8.0 --activate
RUN pnpm install --global turbo@latest

ADD . .

RUN chmod +x config/docker/entrypoint.d/dev.sh
CMD [ "sh", "config/docker/entrypoint.d/dev.sh" ]