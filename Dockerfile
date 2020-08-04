FROM node:10-alpine as builder
RUN apk add \
  python \
  make \
  gcc \
  g++
WORKDIR /app
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build


FROM nginx:1.17-alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html


