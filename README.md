# crud-user-nestjs
# NestJS 10 API project template

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your local environment:

- An up-to-date release of [NodeJS](https://nodejs.org/) such as 20.x and NPM
- An [Docker](https://www.docker.com/) installed in your local environment
- An [Docker Compose](https://docs.docker.com/compose/) installed in your local environment

### 1.2 Project configuration

Start by cloning this project on your local environment. Run this command bellow:

``` sh
git https://github.com/agnerbzrao/crud-user-nestjs.git
```

The next thing will be to create a new `.env` file containing the environment variables used for development.

```
cp .env.example .env
```

In .env file, fill in the variable API_URL with your environment url and the JWT_SECRET variable with your preference's value.

After this step above, run the following command:

```
docker-compose up --build
```

So Docker will build two containers, the first one will be a NestJs project and the seconde one a mysql database.

The Dockerfile file will run the command ``npm run ci`` and ``npm run start``.

The final step, in the terminal, run the command:

```
docker exec -it crud-user /bin/sh

```
