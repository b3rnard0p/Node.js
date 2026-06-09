const db = require('./db');

class TransacaoBanco {
  constructor() {
    this.connection = null;
  }

  async iniciarTransacao() {
    this.connection = await db.getConnection();
    await this.connection.beginTransaction();
  }

  async commit() {
    if (this.connection) {
      await this.connection.commit();
      this.connection.release();
    }
  }

  async rollback() {
    if (this.connection) {
      await this.connection.rollback();
      this.connection.release();
    }
  }
}

module.exports = TransacaoBanco;
