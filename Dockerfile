FROM node:alpine AS base

WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack prepare pnpm@8.8.0 --activate
RUN pnpm install --global turbo@latest

ADD . .

RUN chmod +x config/docker/entrypoint.d/dev.sh
CMD [ "sh", "config/docker/entrypoint.d/dev.sh" ]