const amqp = require("amqplib");

const messageQueueConnectionString = process.env.AMQP_URL;

console.log(process.env.AMQP_URL);
console.log(process.env.POD_NAME);

const parts = process.env.POD_NAME.split("-");
const nodeNumber = parts[parts.length - 1];

const private_key = process.env["KEY_" + nodeNumber];

const rabbitMqConnection = amqp.connect(messageQueueConnectionString);
const queue = "create-erc-725-profile";

rabbitMqConnection
  .then((connection) => connection.createChannel())
  .then((channel) => {
    return channel.assertQueue(queue).then(function (ok) {
      channel.prefetch(2);
      return channel.consume(queue, function (msg) {
        if (msg !== null) {
          console.log(" [x] Received %s", msg.content.toString());
          setTimeout(function () {
            console.log(" [x] Done");
            channel.ack(msg);
          }, 10 * 1000);
        }
      });
    });
  })
  .catch(console.warn);
