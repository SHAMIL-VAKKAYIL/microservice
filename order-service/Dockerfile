FROM node:18-alpine

WORKDIR /app/order-service

RUN npm install -g pnpm

COPY  order-service/package.json order-service/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY order-service ./

COPY protos /app/protos/

COPY common-middleware /app/common-middleware

EXPOSE 5005

EXPOSE 50055

CMD [ "pnpm", "start" ]