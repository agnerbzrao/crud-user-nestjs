FROM node:20.11-alpine
WORKDIR /cache/node_modules

COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npm i -g @nestjs/cli

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . .
# CMD [ -d "node_modules" ] && npm run start:dev 