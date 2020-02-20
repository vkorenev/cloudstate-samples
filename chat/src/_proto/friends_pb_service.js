// package: cloudstate.samples.chat.friends
// file: friends.proto

var friends_pb = require("./friends_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var Friends = (function () {
  function Friends() {}
  Friends.serviceName = "cloudstate.samples.chat.friends.Friends";
  return Friends;
}());

Friends.Add = {
  methodName: "Add",
  service: Friends,
  requestStream: false,
  responseStream: false,
  requestType: friends_pb.FriendRequest,
  responseType: friends_pb.Empty
};

Friends.Remove = {
  methodName: "Remove",
  service: Friends,
  requestStream: false,
  responseStream: false,
  requestType: friends_pb.FriendRequest,
  responseType: friends_pb.Empty
};

Friends.GetFriends = {
  methodName: "GetFriends",
  service: Friends,
  requestStream: false,
  responseStream: false,
  requestType: friends_pb.User,
  responseType: friends_pb.FriendsList
};

exports.Friends = Friends;

function FriendsClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

FriendsClient.prototype.add = function add(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Friends.Add, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

FriendsClient.prototype.remove = function remove(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Friends.Remove, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

FriendsClient.prototype.getFriends = function getFriends(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(Friends.GetFriends, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

exports.FriendsClient = FriendsClient;

