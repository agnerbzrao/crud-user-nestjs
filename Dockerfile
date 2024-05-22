FROM node:20.13.1-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i && npm i -g @nestjs/cli
CMD npm run start:dev 