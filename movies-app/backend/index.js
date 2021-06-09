require("dotenv").config();
const Server = require('./models/server');

const server = new Server();

//Self call function
(async () => {
  await server.connectWithDB();
  server.listen();
})();
