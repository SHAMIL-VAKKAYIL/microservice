FROM node:18-alpine

WORKDIR /app/payment-service

RUN npm install -g pnpm

COPY payment-service/package.json payment-service/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY order-service ./

COPY protos /app/protos

COPY common-middleware /app/common-middleware

EXPOSE 5002

CMD [ "pnpm", "start" ]