const amqp = require("amqplib");

const messageQueueConnectionString = process.env.AMQP_URL;
const rabbitMqConnection = amqp.connect(messageQueueConnectionString);
const queue = "create-erc-725-profile";

rabbitMqConnection
  .then((connection) => connection.createChannel())
  .then((channel) => channel.assertQueue(queue))
  .then((ok) => {
    return channel.consume(queue, (msg) => {
      if (msg !== null) {
        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function () {
          console.log(" [x] Done");
          channel.ack(msg);
        }, 10 * 1000);
      }
    });
  })
  .catch(console.warn);
