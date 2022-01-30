const amqp = require("amqplib");

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672");
    const channel = await connection.createChannel();
    const result = await channel.assertQueue("jobs");
    channel.sendToQueue("jobs", Buffer.from("Job1"));
    console.log("Job sent successfully");
  } catch (err) {
    console.log(err);
  }
}
module.exports = connect;
