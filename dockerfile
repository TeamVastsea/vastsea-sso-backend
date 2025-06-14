FROM node:23-alpine AS BUILDER

WORKDIR /APP

ADD . .

RUN npm i -g pnpm && pnpm install --frozen-lockfile && pnpm build

CMD [ "sh", "-c", "pnpm prisma migrate deploy && node ./dist/main.js" ]