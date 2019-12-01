const subscriber = require("redis").createClient();

subscriber.on("message", function(channel, message) {
  console.log(message);
});

let channel = "incoming";
subscriber.subscribe(channel);
