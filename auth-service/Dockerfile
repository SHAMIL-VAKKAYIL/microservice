FROM node:18-alpine

WORKDIR /app/auth-service

RUN npm install -g pnpm

COPY auth-service/package.json auth-service/pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY auth-service ./

COPY protos /app/protos

COPY common-middleware /app/common-middleware


EXPOSE 5001

CMD ["pnpm", "start"]