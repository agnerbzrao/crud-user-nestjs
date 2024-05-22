# crud-user-nestjs
# NestJS 10 API project template

## 1. Getting started

### 1.1 Requirements

Before starting, ensure you have these essentials tools in order to set up on your local environment:

- An up-to-date release of [NodeJS](https://nodejs.org/) such as 20.x and NPM
- An [Docker](https://www.docker.com/) installed in your local environment
- An [Docker Compose](https://docs.docker.com/compose/) installed in your local environment

### 1.2 Project configuration

Start by cloning this project on your local environment. Run this command bellow:

``` sh
git https://github.com/agnerbzrao/crud-user-nestjs.git
```

Next, create a new .env file to store the environment variables necessary for development:

```
cp .env.example .env
```

In .env file, populate the variable API_URL with your environment URL and set the JWT_SECRET variable to your preferred value.

Once completed the steps above, run the following command:

```
docker-compose up --build
```

This command will instruct Docker to build two containers: one for the NestJS project and the other for a MySQL database.

The Dockerfile file will execute the commands ``npm run ci`` and ``npm run start``.

The final step, to access the crud-user container, use the following command in your terminal:

```
docker exec -it crud-user /bin/sh

```

The crud-user container requires two tables: the customer and user table. So create these tables using this command:


```
npm run migration:run

```

## 2. NPM commands

The project can be tested running the following commands, within  the crud-user container:


```
npm run test:e2e

```

It'll run the end-to-end tests on the auth controller and on the customer controller.


```
npm run test:e2e

```

It'll run the unit test on the customer service.

## 3. Project goals

The goal of this project is to serve as a example of a CRUD project using the NestJs framework, including e2e and unit tests, and JWT authentication.