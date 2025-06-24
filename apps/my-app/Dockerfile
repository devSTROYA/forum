#############
## BUILDER ##
#############
FROM node:20.17.0-alpine AS builder
RUN npm install -g pnpm
WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-lock.yaml nest-cli.json tsconfig.json ./
COPY --chown=node:node apps ./apps
COPY --chown=node:node libs ./libs
COPY --chown=node:node prisma ./prisma
COPY --chown=node:node scripts ./scripts
COPY --chown=node:node templates ./templates

RUN pnpm install --frozen-lockfile --loglevel=error
RUN pnpm build my-app

################
## PRODUCTION ##
################
FROM node:20.17.0-alpine AS production
RUN npm install -g pnpm
WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-lock.yaml ./
COPY --chown=node:node --from=builder /usr/src/app/dist/apps/my-app ./dist

RUN pnpm install --prod --frozen-lockfile --loglevel=error

ENV NODE_ENV production

USER node

EXPOSE 8080

CMD ["node", "dist/main.js"]