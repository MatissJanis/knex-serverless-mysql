# knex-serverless-mysql

[![npm](https://img.shields.io/npm/v/knex-serverless-mysql.svg)](https://www.npmjs.com/package/knex-serverless-mysql)
[![npm](https://img.shields.io/npm/l/knex-serverless-mysql.svg)](https://www.npmjs.com/package/knex-serverless-mysql)

Minimalistic knex.js dialect for [serverless-mysql].

## Motivation

[serverless-mysql] persists database connections across multiple
AWS Lambda function execution contexts. This reduces the load on
the database. However, this client is not natively supported by
Knex. This library solves the problem.

## Simple Example

```js
const Knex = require('knex');
const knexServerlessMysql = require('knex-serverless-mysql');

const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
  },
});

const knex = Knex({
  client: knexServerlessMysql,
  mysql,
});

exports.run = function () {
  return knex('table_name').where('id', 1);
}
```

## Usage with [datasource-sql]

```js
const Knex = require('knex');
const knexServerlessMysql = require('knex-serverless-mysql');
const { SQLDataSource } = require('datasource-sql');

const mysql = require('serverless-mysql')({
  config: {
    host     : process.env.DB_HOST,
    database : process.env.DB_DATABASE,
    user     : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
  },
});

const knex = Knex({
  client: knexServerlessMysql,
  mysql,
});

class TableNameDataSource extends SQLDataSource {
  getRowById(id) {
    return this.knex('table_name').where('id', id);
  }
}

const dataSource = new TableNameDataSource(knex);

exports.run = function () {
  return dataSource.getRowById(1);
}
```

## Installation

```
yarn add knex-serverless-mysql

# or

npm install knex-serverless-mysql
```

[serverless-mysql]: https://github.com/jeremydaly/serverless-mysql
[datasource-sql]: https://github.com/cvburgess/SQLDataSource
