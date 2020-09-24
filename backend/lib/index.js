"use strict";
/*
Primary file for API
*/
Object.defineProperty(exports, "__esModule", { value: true });
// Dependencies
const http = require("http");
const url_1 = require("url");
const string_decoder_1 = require("string_decoder");
const config_1 = require("./core/config");
const handlers_1 = require("./core/handlers");
// Instantiate HTTP Server
const httpServer = http.createServer(function (req, res) {
    umbrellaServer(req, res);
});
const port = typeof (config_1.exportEnvironment.httpPort) !== 'undefined' ? config_1.exportEnvironment.httpPort : 3000;
httpServer.listen(port, function () {
    console.log(`The server is listening on port ${port} in the ${config_1.exportEnvironment.envName} environment`);
});
const umbrellaServer = function (req, res) {
    // Get the URL and parse it
    const parsedUrl = url_1.parse(req.url, true);
    // Get the path
    const path = parsedUrl.pathname;
    const trimmedPath = path === null || path === void 0 ? void 0 : path.replace(/^\/+|\/+$/g, '');
    // Get the query string as an object
    const queryStringObject = parsedUrl.query;
    // Get the HTTP Method
    const method = req.method.toLowerCase();
    // Get the headers as an object
    const headers = req.headers;
    // Get the payload, if any
    const decoder = new string_decoder_1.StringDecoder('utf-8');
    let buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    });
    req.on('end', function () {
        buffer += decoder.end();
        // Choose the handler this request should go to
        const chosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers_1.handlers.notFound;
        // Construct the data object to send to the handler
        const data = {
            trimmedPath: trimmedPath,
            queryStringObject: queryStringObject,
            method: method,
            headers: headers,
            payload: buffer
        };
        // console.log(data)
        // Route the request to the handler specified in the router
        chosenHandler(data, function (statusCode, payload) {
            // Use the status code called back by handler or default to 200
            statusCode = typeof (statusCode) === 'number' ? statusCode : 200;
            // Use the payload called back by handler or default to empty object
            payload = typeof (payload) === 'object' ? payload : {};
            // Convert the payload to a string
            const payloadString = JSON.stringify(payload);
            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });
};
// Router
const router = {
    users: handlers_1.handlers.users,
    ping: handlers_1.handlers.ping,
    notFound: handlers_1.handlers.notFound,
};
//# sourceMappingURL=index.js.map