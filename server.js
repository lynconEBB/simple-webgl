const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 80;

const mimeTypesMap = new Map();
mimeTypesMap.set(".html", "text/html");

const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.wav': 'audio/wav',
    '.mp4': 'video/mp4',
    '.woff': 'application/font-woff',
    '.ttf': 'application/font-ttf',
    '.eot': 'application/vnd.ms-fontobject',
    '.otf': 'application/font-otf',
    '.wasm': 'application/wasm',
    ".frag": "text/plain",
    ".vert": "text/plain",
};

const server = http.createServer(function (request, response) {
    let filePath = './src' + request.url;

    if (filePath === './src/') {
        filePath = './src/index.html';
    }

    let extensionName = String(path.extname(filePath)).toLowerCase();
    let contentType =  mimeTypes[extensionName] || 'application/octet-stream';
    if (extensionName === "") {
        filePath += ".js";
        contentType = 'text/javascript';
    }

    console.log(filePath);

    fs.readFile(filePath, function(error, content) {
        if (error) {
            if(error.code === 'ENOENT') {
                response.writeHead(404, { 'Content-Type': 'text/html' });
                response.end(content, 'utf-8');
            }
            else {
                response.writeHead(500);
                response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
            }
        }
        else {
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
        }
    });

});

server.listen(port);

console.log(`Server running at http://127.0.0.1:${port}`);