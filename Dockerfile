# Stage 1
FROM node:20-alpine3.16 as builder
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install --omit=dev

COPY . .
RUN npm run build

# Stage 2
FROM nginx:1.23.4
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]