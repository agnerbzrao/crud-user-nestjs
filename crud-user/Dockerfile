FROM node:20.11-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm i -g @nestjs/cli

CMD npm run start:dev 