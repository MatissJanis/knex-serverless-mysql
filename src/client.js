import MysqlClient from 'knex/lib/dialects/mysql';

export default class ServerlessMysqlClient extends MysqlClient {
  constructor(config) {
    super(config);

    this.mysql = config.mysql;
  }

  get dialect() {
    return 'serverlessMysql';
  }
  get driverName() {
    return 'serverlessMysql';
  }

  acquireConnection() {
    return Promise.resolve(this.mysql);
  }

  releaseConnection() {
    return this.mysql.end();
  }
}
