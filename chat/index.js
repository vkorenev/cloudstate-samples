const express = require("express");
const app = express();
const server = require("http").createServer(app);
const fs = require('fs');
const crdt = require("cloudstate").crdt;

app.use("/site", express.static("public"));

server.listen(3000);
console.log("Http Servee running on " + server.address().address + ":" + server.address().port);






let indexPage = Buffer.from("");
fs.readFile('./public/index.html', function(err, data) {
  console.log("data", data.length);
  indexPage = data;
});

function getChatPage(user){
  console.log("**** showChatPage!!!!! " + process.cwd() , user);  
  return {
    content_type: "text/html",
    data: indexPage.toString("base64")
  }
}


let bundleJs = Buffer.from("");
fs.readFile('./public/build/bundle.js', function(err, data) {
  console.log("data", data.length);
  bundleJs = data;
});

function getBundleJs(user){
  console.log("**** bundleJs!!!!! " + process.cwd() , user);  
  return {
    content_type: "text/javascript",
    data: bundleJs.toString("base64")
  }
}

function getBundleImg(imgRequest){
    console.log("**** imgRequest!!!!! " + process.cwd() , imgRequest);  
}

const entity = new crdt.Crdt(
    "chat.proto",
    "cloudstate.samples.chat.chat.Chat"
  );

  entity.commandHandlers = {
    GetChatPage: getChatPage,
    GetBundleJs: getBundleJs,
    GetBundleImg: getBundleImg
  };
  
  module.exports = entity;


const opts = {};

if (process.env.PORT) {
    opts.bindPort = process.env.PORT;
}

entity.start(opts);