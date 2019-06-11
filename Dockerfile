FROM node:10.15.3-alpine as builder
WORKDIR /todo_api
COPY . ./
RUN yarn install
RUN yarn build

FROM node:10.15.3-alpine
WORKDIR /todo_api
COPY --from=builder /todo_api ./
RUN yarn install --production=true
EXPOSE 8080
ENTRYPOINT ["yarn", "serve"]
