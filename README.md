# Сhat3-manager-backend

This application implements the server part of the local hosting management manager. The client part of the application is located in the repository [chat3-manager-frontend](https://github.com/vzx7/chat3-manager-frontend).

The application is built on the basis of a starter [TypeScript Express Starter](https://github.com/ljlm0402/typescript-express-starter).

## Technologies

### 🐳 Docker :: Container Platform

[Docker](https://docs.docker.com/) is a platform for developers and sysadmins to build, run, and share applications with containers.

[Docker](https://docs.docker.com/get-docker/) Install.

- starts the containers in the background and leaves them running : `docker-compose up -d`
- Stops containers and removes containers, networks, volumes, and images : `docker-compose down`

Modify `docker-compose.yml` and `Dockerfile` file to your source code.

### ♻️ NGINX :: Web Server

[NGINX](https://www.nginx.com/) is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

Proxying is typically used to distribute the load among several servers, seamlessly show content from different websites, or pass requests for processing to application servers over protocols other than HTTP.

When NGINX proxies a request, it sends the request to a specified proxied server, fetches the response, and sends it back to the client.

Modify `nginx.conf` file to your source code.

### ✨ ESLint, Prettier :: Code Formatter

[Prettier](https://prettier.io/) is an opinionated code formatter.

[ESLint](https://eslint.org/), Find and fix problems in your JavaScript code

It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary.

1. Install [VSCode](https://code.visualstudio.com/) Extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode), [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

2. `CMD` + `Shift` + `P` (Mac Os) or `Ctrl` + `Shift` + `P` (Windows)

3. Format Selection With

4. Configure Default Formatter...

5. Prettier - Code formatter

<img src="https://user-images.githubusercontent.com/42952358/126604937-4ef50b61-b7e4-4635-b3c9-3c94dd6b06fa.png" alt="Formatter Setting" />

> Palantir, the backers behind TSLint announced in 2019 that they would be deprecating TSLint in favor of supporting typescript-eslint in order to benefit the community.
> So, migration from TSLint to ESLint.

### 🌐 REST Client :: HTTP Client Tools

REST Client allows you to send HTTP request and view the response in Visual Studio Code directly.

VSCode Extension [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) Install.

Modify `*.http` file in src/http folder to your source code.

### 🔮 PM2 :: Advanced, Production process manager for Node.js

[PM2](https://pm2.keymetrics.io/) is a daemon process manager that will help you manage and keep your application online 24/7.

- production mode :: `npm run deploy:prod` or `pm2 start ecosystem.config.js --only prod`
- development mode :: `npm run deploy:dev` or `pm2 start ecosystem.config.js --only dev`

Modify `ecosystem.config.js` file to your source code.

### 🏎 SWC :: a super-fast JavaScript / TypeScript compiler

[SWC](https://swc.rs/) is an extensible Rust-based platform for the next generation of fast developer tools.

`SWC is 20x faster than Babel on a single thread and 70x faster on four cores.`

- tsc build :: `npm run build`
- swc build :: `npm run build:swc`

Modify `.swcrc` file to your source code.

### 💄 Makefile :: This is a setting file of the make program used to make the compilation that occurs repeatedly on Linux

[Makefile](https://makefiletutorial.com/)s are used to help decide which parts of a large program need to be recompiled.

- help :: `make help`

Modify `Makefile` file to your source code.

## 🗂 Code Structure (base)

```sh
│
├──📂 .vscode
│  ├── launch.json
│  └── settings.json
│
├──📂 src
│  ├──📂 config
│  │  └── index.ts
│  │
│  ├──📂 controllers
│  │  ├── auth.controller.ts
│  │  └── users.controller.ts
│  │
│  ├──📂 dtos
│  │  └── users.dto.ts
│  │
│  ├──📂 exceptions
│  │  └── httpException.ts
│  │
│  ├──📂 http
│  │  ├── auth.http
│  │  └── users.http
│  │
│  ├──📂 interfaces
│  │  ├── auth.interface.ts
│  │  ├── routes.interface.ts
│  │  └── users.interface.ts
│  │
│  ├──📂 middlewares
│  │  ├── auth.middleware.ts
│  │  ├── error.middleware.ts
│  │  └── validation.middleware.ts
│  │
│  ├──📂 models
│  │  └── users.model.ts
│  │
│  ├──📂 routes
│  │  ├── auth.route.ts
│  │  └── users.route.ts
│  │
│  ├──📂 services
│  │  ├── auth.service.ts
│  │  └── users.service.ts
│  │
│  ├──📂 test
│  │  ├── auth.test.ts
│  │  └── users.test.ts
│  │
│  ├──📂 utils
│  │  ├── logger.ts
│  │  └── vaildateEnv.ts
│  ├──📂 static
│  │  └── index.html
│  │
│  ├── app.ts
│  └── server.ts
│
├── .dockerignore
├── .editorconfig
├── .env.development.local
├── .env.production.local
├── .env.test.local
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .huskyrc
├── .lintstagedrc.json
├── .prettierrc
├── .swcrc
├── docker-compose.yml
├── Dockerfile.dev
├── Dockerfile.prod
├── ecosystem.config.js
├── jest.config.js
├── Makefile
├── nginx.conf
├── nodemon.json
├── package-lock.json
├── package.json
└── tsconfig.json
```
## Goal

This application interacts with the Postgresql database, the [HestiaCP](https://hestiacp.com/) API CLI and API Aplication Creator (
application for deploying a template application in a domain) which are deployed in the same environment.

Through the Hestia API, we will administer local hosting. Create new sites, configure the environment, dns zone, etc.
Through the API Aplication creator, we will deploy the application itself on a new domain domain.

## Build for develop
Let's prepare the development environment:
```bash 
# if docker was not installed
# for archlinux 
$ sudo pacman -S docker docker-compose
$ sudo usermod -aG docker ${USER}
# logout from user and go in
# get code
$ git clone git@github.com:vzx7/chat3-manager-backend.git
$ cd chat3-manager-backend
$ npm i
```
To build the application, you need to add two files to the root dir
**.env** for docker-compose, and **.env.development.local** for the application itself.
They should contain the following variables:
```ini
# PORT
PORT = 3000

# TOKENS
TOKEN_SECRET_KEY = your_key
REFRESH_TOKEN_SECRET_KEY = your_key
TOKEN_TIME = 15m
REFRESH_TOKEN_TIME = 15d
REFRESH_TOKEN_COOKIES_EXPIRES = 14 # days

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = your_host
CREDENTIALS = true

# DATABASE
POSTGRES_USER = root
POSTGRES_PASSWORD = your_password
POSTGRES_HOST = localhost
POSTGRES_PORT = 5432
POSTGRES_DB = dev

# EXTERNAL API
EXTERNAL_API_URL = api_host
EXTERNAL_API_PORT = 4567
EXTERNAL_API_KEY = api_key

```
Let's build and launch
```bash
$ ./src/scripts/dockerStart.sh
```
Stop app:
```bash
$ ./src/scripts/dockerStop.sh
```

## 💳 License

[MIT](LICENSE)