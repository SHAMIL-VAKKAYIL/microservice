FROM node:18-alpine

WORKDIR /app/product-service

RUN npm install -g pnpm

COPY product-service/package.json product-service/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY product-service ./

COPY common-middleware /app/common-middleware

COPY  protos /app/protos

EXPOSE 5003

EXPOSE 50058

CMD [ "pnpm", "start" ]