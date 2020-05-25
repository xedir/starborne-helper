/*
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const Honeycomb = require('honeycomb-grid')

const Grid = Honeycomb.defineGrid()
Grid.rectangle({width: 4, height: 4})


app.use(express.static('public'));
//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');

*/

const http = require('http');
const fs = require('fs');
const url = require('url');

const Honeycomb = require('honeycomb-grid')

const server = http.createServer((request, response) => {

    let pathname = url.parse(request.url).pathname;

    console.log(`Request for ${pathname} received`);
 
    if (pathname === '/') {

        pathname = '/index.html';
     }
  
     fs.readFile('public/' + pathname.substr(1), (err, data) => {
  
        if (err) {
  
           console.error(err);
  
           response.writeHead(404, { 'Content-Type': 'text/plain' });
           response.write('404 - file not found');
  
        } else {
            response.writeHead(200);
            response.write(data.toString());
        }
  
        response.end();
     });
  });

const port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);