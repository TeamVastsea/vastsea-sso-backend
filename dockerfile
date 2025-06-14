FROM node:23-alpine AS BUILDER

WORKDIR /APP

ADD . .

RUN npm i -g pnpm && pnpm install --frozen-lockfile && pnpm build

FROM node:23-alpine AS RUNNER

WORKDIR /RUNNER

COPY --from=BUILDER /APP/node_modules .
COPY --from=BUILDER /APP/package.json .
COPY --from=BUILDER /APP/pnpm-lock.yaml .
COPY --from=BUILDER /APP/dist .
COPY --from=BUILDER /APP/prisma .

RUN npm i -g pnpm && pnpm install --frozen-lockfile

CMD [ "sh", "-c", "pnpm prisma migrate deploy && node ./dist/main.js" ]