FROM node:alpine AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app
RUN corepack enable
RUN corepack prepare pnpm@8.8.0 --activate
RUN pnpm config set store-dir /root/.local/share/pnpm/store
RUN pnpm install --global turbo@latest

ADD . .

RUN chmod +x config/docker/entrypoint.d/dev.sh
CMD [ "sh", "config/docker/entrypoint.d/dev.sh" ]