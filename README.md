# Biblio

A bibliography management service

[![Build Status](https://travis-ci.org/VernonHawk/Biblio.svg?branch=master)](https://travis-ci.org/VernonHawk/Biblio)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need [Node.js](https://nodejs.org) (which comes together with [npm](https://www.npmjs.com/)), [MongoDB](https://www.mongodb.com/) and [git](https://git-scm.com/downloads).

Check if everything is OK by running `npm -v`, `node -v` and `git --version` in the CLI, it should look simmilar to this:

```bash
> npm -v
5.8.0
```

```bash
> node -v
v9.11.1
```

```bash
> git --version
git version 2.10.1.windows.1
```

### Installing

After you have installed [Node.js](https://nodejs.org) and [MongoDB](https://www.mongodb.com/), enter the CLI at the projects root directory. Then install the node modules via `npm install` or `npm i`.

### Development and build

After installing the packages, you could run these commands:

- `npm run mongod` OR `npm run md` to launch a MongoDB server
- `npm run dev-server` OR `npm run dev-s` to launch a dev server (don't forget to run `mongod` first!)
- `npm run dev-client` OR `npm run dev-c` to launch a webpack-dev-server
- `npm run build` to create a production build of a client
- `npm run server` to launch a production server.

Examples:

```bash
> npm run mongod

biblio@0.1.0 mongod Disk:\path\to\the\project\Biblio
mongod --auth

2018-04-30T12:45:49.825-0700 I CONTROL  [initandlisten] MongoDB starting : pid=12992 port=27017 dbpath=C:\data\db\ 64-bit host=YOUR_HOST
```

```bash
> npm run dev-server

biblio@version server Disk:\path\to\the\project\Biblio
set NODE_ENV=development&& nodemon src/back-end/startServer.js

[nodemon] 1.17.3
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node src/back-end/startServer.js`
App listening on port 3000!
Connected to MongoDB
```

```bash
> npm run dev-client

biblio@version dev-client Disk:\path\to\the\project\Biblio
node scripts/start.js
Starting the development server...
Compiled successfully!

You can now view biblio in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://SomeIP:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

```bash
> npm run build

biblio@version build Disk:\path\to\the\project\Biblio
node scripts/build.js

Creating an optimized production build...
Compiled successfully.
```

```bash
> npm run server

> biblio@0.1.0 server Disk:\path\to\the\project\Biblio
> set NODE_ENV=production&& node src/back-end/startServer.js

App listening on port 3000!
Connected to MongoDB
```

## Running the tests

To run the tests open CLI and run `npm run test`. It will run [Jest](https://facebook.github.io/jest/) tests.

## Built With

- [Node.js](https://nodejs.org) - JavaScript runtime powering the server
- [Express](http://expressjs.com/) - The web framework
- [MongoDB](https://www.mongodb.com/) - NoSQL Database
- [React](https://reactjs.org/) - Main UI Library
- [Reactstrap](https://reactstrap.github.io/) - Bootstrap 4 with React
- [Bootstrap](https://getbootstrap.com/) - Mainly used by Reactstrap
- [Webpack](https://webpack.js.org/) - Powerful module bundler

## Versioning

We use [Git](https://git-scm.com) for versioning. For the versions available, see the [tags on this repository](https://github.com/VernonHawk/Biblio/tags).

## Authors

- **Igor Morenec** - *Main developer* - [VernonHawk](https://github.com/VernonHawk)

See also the list of [contributors](https://github.com/VernonHawk/Biblio/contributors) who participated in this project.

## License

This project is licensed under the Apache License - see the [LICENSE](LICENSE) and [NOTICE](NOTICE) files for details.
