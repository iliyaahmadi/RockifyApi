const { Pool } = require('pg');

class DB {
  instance = null;
  constructor(config) {
    if (!this.instance) {
      this.instance = new Pool(config);
    }
  }
  getInstance() {
    return this.instance;
  }
}

module.exports = DB;
