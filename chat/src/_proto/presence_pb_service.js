// package: cloudstate.samples.chat.presence
// file: presence.proto

var presence_pb = require("./presence_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Presence = (function () {
  function Presence() {}
  Presence.serviceName = "cloudstate.samples.chat.presence.Presence";
  return Presence;
}());

Presence.Connect = {
  methodName: "Connect",
  service: Presence,
  requestStream: false,
  responseStream: true,
  requestType: presence_pb.User,
  responseType: presence_pb.Empty
};

Presence.Monitor = {
  methodName: "Monitor",
  service: Presence,
  requestStream: false,
  responseStream: true,
  requestType: presence_pb.User,
  responseType: presence_pb.OnlineStatus
};

exports.Presence = Presence;

function PresenceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

PresenceClient.prototype.connect = function connect(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Presence.Connect, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

PresenceClient.prototype.monitor = function monitor(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(Presence.Monitor, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.PresenceClient = PresenceClient;

