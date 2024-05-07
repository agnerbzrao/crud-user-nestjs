FROM node:20.11-alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.yaml ./
COPY ./ ./
RUN npm ci -g npm@10.7.0
CMD npm run start 