FROM node:18-alpine

WORKDIR /app/product-serivce

RUN npm install -g pnpm

COPY product-serivce/package.json product-serivce/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY product-serivce ./

COPY common-middleware /app/common-middleware

COPY  protos /app/protos

EXPOSE 5003

EXPOSE 50058

CMD [ "pnpm", "start" ]