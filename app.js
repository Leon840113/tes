const express = require("express");
const line = require("@line/bot-sdk");
const config = {
  channelAccessToken: "Qc+2OIC3nRpAwEX0G24gN5TZnXWUYmGtS5JB1ic3ILKAqARYoKnDNbm2jq+BeaXY3F8fVI3Nxy3Y/NJ5ktjyYEX+5Q0+g1HDBjihawZT2eqT9xwjcUmdEMtdVyUW2hvZ990KdbpcYS8aeVG/ldRLVwdB04t89/1O/w1cDnyilFU=",
  channelSecret: "17803b8f4233a8fb26383aaeb74b40b2",
};
const app = express();
app.post("/webhook", line.middleware(config), (req, res) => {
  Promise.all(req.body.events.map(handleEvent)).then((result) => res.json(result));
});
const client = new line.Client(config);
function handleEvent(event) {
  if (
    event.type != "message" ||
    event.message.type != "text" ||
    event.replyToken == "00000000000000000000000000000000" ||
    event.replyToken == "ffffffffffffffffffffffffffffffff"
  ) {
    return Promise.resolve(null);
  }
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: event.message.text,
  });
}
app.listen(3003, () => {
  console.log("Server listening at port 3003");
});
