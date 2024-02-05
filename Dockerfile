FROM node:20.11-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.yaml ./
COPY ./ ./
RUN npm i
CMD npm run start 