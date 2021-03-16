const { v4 } = require("uuid");
const express = require("express");
const app = express();
const port = 3000;
app.get("/listen", (req, res) => {});
app.get("/initiate", (req, res) => {
  var amqp = require("amqplib/callback_api");

  amqp.connect(
    "amqp://user:PASSWORD@rabbitmq.rabbit.svc.cluster.local:5672",
    function (error0, connection) {
      if (error0) {
        throw error0;
      }
      connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }

        var queue = "create-erc-725-profile";
        var msg = v4();

        channel.assertQueue(queue, {
          durable: false,
        });
        channel.sendToQueue(queue, Buffer.from(msg));
        res.status(200).send(`[x] Profile creation requested ${msg}`);
        console.log(" [x] Profile creation requested %s", msg);
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
