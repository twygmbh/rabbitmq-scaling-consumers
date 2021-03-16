var amqp = require("amqplib/callback_api");

amqp.connect(
  "amqp://user:PASSWORD@rabbitmq.rabbit.svc.cluster.local:5672",
  function (error, connection) {
    connection.createChannel(function (error, channel) {
      var queue = "create-erc-725-profile";

      channel.assertQueue(queue, {
        durable: false,
      });
      channel.prefetch(1);
      console.log(
        " [*] Waiting for messages in %s. To exit press CTRL+C",
        queue
      );
      channel.consume(
        queue,
        function (msg) {
          var secs = msg.content.toString().split(".").length - 1;
          console.log(secs);

          console.log(" [x] Received %s", msg.content.toString());
          setTimeout(function () {
            console.log(" [x] Done");
            channel.ack(msg);
          }, 10 * 1000);
        },
        {
          noAck: false,
        }
      );
    });
  }
);
