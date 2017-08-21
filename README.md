# Personal projects

## Tools used along this project
* [NodeJS](https://nodejs.org) as backend server.
* [Express](http://expressjs.com) as web framework.
* [Body-parser](https://github.com/expressjs/body-parser) as Node.js body parsing middleware
* [Got](https://github.com/sindresorhus/got) as Promise HTTP request.
* [MongoDB](https://www.mongodb.com) as DBMS.
* [Mongoose](http://mongoosejs.com) as MongoDB driver.
* [ES6](http://es6-features.org) as main language.
* [Async](https://github.com/caolan/async) as async utilities for node and the browser
* [Mocha](https://mochajs.org) as testing framework.
* [Chai](http://chaijs.com) as TDD assertion library.
* [Fast-csv](https://github.com/C2FO/fast-csv) as CSV parser for node
* [ESLint](http://eslint.org) as JavaScript linter.
* [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb) as plugin for helping to follow the code style guide

## Workflow and code style guide
We use [airbnb-javascript](https://github.com/airbnb/javascript) as JavaScript style guide.

**Guidelines:**

* If your code will perform asynchronous operations it must use promises
* Every bug should be registered as an issue
* Your code should be almost entirely written in english
* Your code should follow the [airbnb-javascript](https://github.com/airbnb/javascript) style guide
* Your commits should be written in english, they must be descriptive and minimalist
* You should try to use testing in your code, but this is not required
* Clean code help [clean-code-javascript](https://github.com/ryanmcdermott/clean-code-javascript)

**Note:** _Your code could be rejected by breaking the above rules._

## Running the project
1. Install Node.js, you can use [n](https://github.com/tj/n) or [nvm](https://github.com/creationix/nvm) which are Node Version Managers, they are the easiest way to get Node.js installed. 
1. Clone the project 
2. Install the project dependencies ```npm install```
3. Run the backend server ```npm run local``` Navigate to `http://localhost:3000/`.
