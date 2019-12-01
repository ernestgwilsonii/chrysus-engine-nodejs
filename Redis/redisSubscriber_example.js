const subscriber = require("redis").createClient();

subscriber.on("message", (channel, message) => {
  console.log(channel);
  console.log(message);
});

let channel = "incoming";
subscriber.subscribe(channel);
