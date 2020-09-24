/*
Primary file for API
*/

// Dependencies
import * as http from 'http'
import {parse} from 'url'
import {StringDecoder} from 'string_decoder'
import {exportEnvironment} from './core/config'
import {handlers} from './core/handlers'

// Instantiate HTTP Server
const httpServer = http.createServer(function(req: http.IncomingMessage, res: http.ServerResponse) {
    umbrellaServer(req, res)
})

const port: number = typeof(exportEnvironment.httpPort) !== 'undefined' ? exportEnvironment.httpPort : 3000
httpServer.listen(port, function() {
    console.log(`The server is listening on port ${port} in the ${exportEnvironment.envName} environment`)
})

const umbrellaServer = function(req: any, res: any) {
    // Get the URL and parse it
    const parsedUrl = parse(req.url, true)

    // Get the path
    const path = parsedUrl.pathname
    const trimmedPath: any = path?.replace(/^\/+|\/+$/g,'')

    // Get the query string as an object
    const queryStringObject = parsedUrl.query

    // Get the HTTP Method
    const method = req.method.toLowerCase()

    // Get the headers as an object
    const headers = req.headers

    // Get the payload, if any
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    req.on('data', function(data: Buffer) {
        buffer += decoder.write(data)
    })
    req.on('end', function() {
        buffer += decoder.end()

        // Choose the handler this request should go to
        const chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound

        // Construct the data object to send to the handler
        const data = {
            trimmedPath: trimmedPath,
            queryStringObject: queryStringObject,
            method: method,
            headers: headers,
            payload: buffer
        }

        // console.log(data)

        // Route the request to the handler specified in the router
        chosenHandler(data, function(statusCode: number, payload: (undefined | object)) {
            // Use the status code called back by handler or default to 200
            statusCode = typeof(statusCode) === 'number' ? statusCode : 200

            // Use the payload called back by handler or default to empty object
            payload = typeof(payload) === 'object' ? payload : {}
            
            // Convert the payload to a string
            const payloadString = JSON.stringify(payload)

            // Return the response
            res.setHeader('Content-Type','application/json')
            res.writeHead(statusCode)
            res.end(payloadString)
        })
    })
}

// Router
const router: any = {
    users: handlers.users,
    ping: handlers.ping,
    notFound: handlers.notFound,
}