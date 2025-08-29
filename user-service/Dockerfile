FROM node:18-alpine

WORKDIR /app/user-service

RUN npm install -g pnpm

COPY user-service/package.json user-service/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY protos /app/protos

COPY user-service ./

COPY common-middleware /app/common-middleware

EXPOSE 5004

EXPOSE 50051

CMD [ "pnpm", "start" ]