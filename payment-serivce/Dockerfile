FROM node:18-alpine

WORKDIR /app/payment-serivce

RUN npm install -g pnpm

COPY payment-serivce/package.json payment-serivce/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY payment-serivce ./

COPY protos /app/protos

COPY common-middleware /app/common-middleware

EXPOSE 5002

CMD [ "pnpm", "start" ]