const express     = require('express');
const bodyParser  = require("body-parser");
const server      = express();

server.use(bodyParser.json());

server.set('port', process.env.PORT || 3000);

server.get('/', (request, response) => {
    response.send('Hello Express Server');
});

server.get('/contact', (request, response) => {
    response.send('Some contact info ### ### ####');
});

server.get('/about', (request, response) => {
    response.send('Here\'s our story');
});

server.get('/error', (request, response) => {
    throw new Error("BROKEN");
});

server.get('/user/:id', (request, response) => {
    response.send(request.params.id);
});

server.post('/payload', (request, response) => {
    console.log(request.body.key);
    response.send(request.body);
});

/** Hit localhost:3000/paylod on Postman with raw body on JSON 
 * { 
 *  "integer"; 1000
 * } 
 */ 


server.listen(3000, () => { console.log('Node server created at port 3000') });

