const express = require("express");
const cors = require("cors");

const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.paths = {
      users: "/api/users",
      auth: "/api/auth",
      movies: "/api/movies"
    };

    //Middlewares
    this.middlewares();

    //Routes
    this.routes();
  }

  middlewares() {
    //CORS
    this.app.use( cors() );

    //Body parse
    this.app.use(express.json());
  }

  async connectWithDB() {
    await dbConnection();
  }

  routes() {
    this.app.use(this.paths.users, require('../routes/users'));
    this.app.use(this.paths.auth, require('../routes/auth'));
    this.app.use(this.paths.movies, require('../routes/movies'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server on port ${this.port}`);
    });
  }
}

module.exports = Server;