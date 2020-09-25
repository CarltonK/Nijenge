// Define handlers
export const handlers: any = {}

// Users handler
handlers.users = function(data: any, callback: any) {
    let acceptableMethods = ['post','get','put','delete']
    if (acceptableMethods.indexOf(data.method) > -1) {
        handlers._users[data.method](data, callback)
        // callback(200, {'detail': 'Success'})
    } else {
        callback(405, { status: false, detail: 'This operation is not allowed' })
    }
}

// Containers for users submethods
handlers._users = {}

// Create a User
// Required data: firstName, lastName, phone(10), natID(7 || 8), password(>7), tosAgreement(true)
// Optional data: none
handlers._users.post = function(data: any, callback: any) {
    callback(200,{ status: true , detail: 'success' })
}

handlers._users.get = function(data: any, callback: any) {
    callback(200,{ status: true , detail: 'success' })
}

handlers._users.put = function(data: any, callback: any) {
    callback(200,{ status: true , detail: 'success' })
}

handlers._users.delete = function(data: any, callback: any) {
    callback(200,{ status: true , detail: 'success' })
}

/*
---!!! TEST !!!---
*/

// Ping handler
handlers.ping = function(data: any, callback: any) {
    callback(200,{ status: true , detail: 'success' })
}

//Not found handler
handlers.notFound = function(data: any, callback: any) {
    callback(404,{ status: false, detail: 'The famous 404' })
}

