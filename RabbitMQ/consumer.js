const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");

    channel.consume("jobs", (msg) => {
      console.log("Got message :", msg.content.toString());
      channel.ack(msg);
    });
  } catch (err) {
    console.log(err);
  }
}
module.exports = connect;
