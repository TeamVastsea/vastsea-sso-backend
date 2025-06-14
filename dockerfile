FROM node:23-alpine AS BUILDER

ADD . .

RUN npm i -g pnpm && pnpm ci && pnpm build

FROM node:23-alpine AS RUNNER

COPY --from=BUILDER node_modules .
COPY --from=BUILDER package.json .
COPY --from=BUILDER pnpm-lock.yaml .
COPY --from=BUILDER dist .

RUN npm i -g pnpm && pnpm ci && pnpm prisma migrate deploy

CMD [ "sh -c", "pnpm prisma migrate deploy && node ./dist/main.js" ]