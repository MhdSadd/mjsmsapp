const http = require("http");
const app = require("./app");
const PORT = process.env.PORT || 1500;

const server = http.createServer(app);


server.listen(PORT, () => {
  console.log(`server listening on port::: ${process.env.host}${PORT}`);
});