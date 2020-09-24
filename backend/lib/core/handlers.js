"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlers = void 0;
// Define handlers
exports.handlers = {};
// Users handler
exports.handlers.users = function (data, callback) {
    let acceptableMethods = ['post', 'get', 'put', 'delete'];
    if (acceptableMethods.indexOf(data.method) > -1) {
        exports.handlers._users[data.method](data, callback);
        // callback(200, {'detail': 'Success'})
    }
    else {
        callback(405, { 'detail': 'This method is not allowed' });
    }
};
// Containers for users submethods
exports.handlers._users = {};
exports.handlers._users.post = function (data, callback) {
    callback(200, { 'detail': 'Success' });
};
exports.handlers._users.get = function (data, callback) {
    callback(200, { 'detail': 'Success' });
};
exports.handlers._users.put = function (data, callback) {
    callback(200, { 'detail': 'Success' });
};
exports.handlers._users.delete = function (data, callback) {
    callback(200, { 'detail': 'Success' });
};
/*
---!!! TEST !!!---
*/
// Ping handler
exports.handlers.ping = function (data, callback) {
    callback(200, { 'detail': 'Success' });
};
//Not found handler
exports.handlers.notFound = function (data, callback) {
    callback(404, { 'detail': 'The famous 404' });
};
//# sourceMappingURL=handlers.js.map