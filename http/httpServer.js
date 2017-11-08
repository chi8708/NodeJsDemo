///<reference path="../typings/tsd.d.ts" />
///<reference path="../node_modules/jquery/dist/jquery.js" />
var http = require("http");
var event = require("events");
var util = require("util");

var eventEmitter = new event.EventEmitter();

eventEmitter.on('serverStart', function () {
    console.log("server running...");
});

//通过继承实现事件
function myEvent() {
    event.EventEmitter.call(this);
    
}

//另外几种继承方式
// myEvent.prototype=new eventEmitter();
// myEvent.prototype.__prop__=eventEmitter.prototype;
// myEvent.prototype = Object.create(eventEmitter.prototype);
util.inherits(myEvent, event.EventEmitter);

var myEventsEmitter = new myEvent();
myEventsEmitter.on('serverStart', function () {
    console.log("server running... 222");
});

http.createServer(function (req, rep) {
    rep.writeHead(200, {
        "Content-Type": "text/plain"
    });
    rep.end("hello World");
})
    .listen(8022, '127.0.0.1', null, function (params) {
        eventEmitter.emit('serverStart');
        myEventsEmitter.emit('serverStart');
    });