// Define handlers
export const handlers: any = {}

// Users handler
handlers.users = function(data: any, callback: any) {
    let acceptableMethods = ['post','get','put','delete']
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback)
        // callback(200, {'detail': 'Success'})
    } else {
        callback(405, {'detail': 'This method is not allowed'})
    }
}

// Containers for users submethods
handlers._users = {}

handlers._users.post = function(data: any, callback: any) {
    callback(200,{'detail': 'Success'})
}

handlers._users.get = function(data: any, callback: any) {
    callback(200,{'detail': 'Success'})
}

handlers._users.put = function(data: any, callback: any) {
    callback(200,{'detail': 'Success'})
}

handlers._users.delete = function(data: any, callback: any) {
    callback(200,{'detail': 'Success'})
}

/*
---!!! TEST !!!---
*/

// Ping handler
handlers.ping = function(data: any, callback: any) {
    callback(200, {'detail': 'Success'})
}

//Not found handler
handlers.notFound = function(data: any, callback: any) {
    callback(404,{'detail': 'The famous 404'})
}

