# Estágio de build
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Estágio de desenvolvimento
CMD ["npm", "start"]
