/**const http = require('http');
const url = require('url');

const handler = (req, res) => {
  
  let path = url.parse(req.url).pathname; 

  if (path === '/'){
    res.writeHead(200);
    res.write("Hello World");
    res.end();
  } else if (path === '/transfer') {
    res.writeHead(200);
    res.write("Transfer");
    res.end();
  }
};

const server = http.createServer(handler);
server.listen(3000);
*/
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.json());
server.set('port',process.env.PORT);
server.listen(process.env.PORT);

server.get('/', (request, response) => {
  response.send("Hello");
});
server.get('/available-tokens', (request, response) => {
  response.send("[DAI, ETH, ERC721]");
});
server.get('/transfer', (request, response) => {
  response.send("Transfer");
});
server.post('/transfer', (request, response) => {
  console.log(request.body);
  response.send("Received");
});
























