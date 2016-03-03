var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.steamapi;
handle["/steamapi"] = requestHandlers.steamapi;

server.start(router.route, handle);
