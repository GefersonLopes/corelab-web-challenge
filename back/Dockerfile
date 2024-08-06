FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16-alpine as production-stage
WORKDIR /app
COPY --from=build-stage /app ./
EXPOSE 3000
CMD ["node", "dist/main"]
