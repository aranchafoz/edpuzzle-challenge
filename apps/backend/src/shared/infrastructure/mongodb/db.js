const assert = require("assert");
const { MongoClient, ServerApiVersion } = require("mongodb");

/* ====================================================== */
/*                    Implementation                      */
/* ====================================================== */

class DatabaseClient {
  constructor({ url, logger }) {
    assert(url, "Database - Missing url field");
    this.url = url;
    this.logger = logger;
  }
  async connect() {
    try {
      const client = new MongoClient(this.url, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      await client.connect();
      await client.db("admin").command({ ping: 1 });

      this.client = client;

      return { client };
    } catch (err) {
      throw err;
    }
  }
  async disconnect() {
    if (this.client) await this.client.close();
    this.client = undefined;
  }
}

/* ====================================================== */
/*                      Public API                        */
/* ====================================================== */

module.exports = { DatabaseClient };
