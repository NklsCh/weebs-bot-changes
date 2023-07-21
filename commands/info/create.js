const { Embed } = require("guilded.js");
const ms = require("ms");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");

const MONGODB_URI = "mongodb+srv://weebjs:Summer8455@cluster0.ikzk44n.mongodb.net/?retryWrites=true&w=majority";
const MONGODB_DB_NAME = "Cluster0";
const MONGODB_COLLECTION_NAME = "reminders";

let db;

MongoClient.connect(MONGODB_URI, { useUnifiedTopology: true })
  .then((client) => {
    db = client.db(MONGODB_DB_NAME);
    console.log(`Connected to MongoDB database "${MONGODB_DB_NAME}"`);
  })
  .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
  });

const cooldowns = new Map();

module.exports = {
  name: "remind",
  description: "Sets a reminder for a specified time.",
  usage: "remind <time> [reminder message] [private|silent]",
  run: async (client, message, args) => {
    try {
      const userId = message.author.id;
      const time = args[0];
      const reminder = args.slice(1).join(" ") || "Reminder";
      const option = args.find((arg) => arg === "private" || arg === "silent");

      if (!time) {
        return message.reply("please use the format \`.create [time] [silent | private]\` when creating reminders. Thank you.");
      }

      const timeMs = ms(time);
      if (!timeMs) {
        return message.reply("please use the format \`.create [time] [silent | private]\` when creating reminders. Thank you.");
      }

      if (timeMs < 60000 || timeMs > 2592000000) {
        return message.reply("please set a reminder time between 1 minute and 30 days.");
      }

      const cooldown = cooldowns.get(userId);
      if (cooldown && (Date.now() - cooldown) < 60000) {
        const remainingTime = ms(60000 - (Date.now() - cooldown), { long: true });
        return message.reply(`please wait ${remainingTime} before setting another reminder.`);
      }

      const reminderObj = {
        _id: uuidv4().replace(/-/g, "").substr(0, 12),
        userId,
        reminder,
        time: new Date(Date.now() + timeMs),
      };

      const result = await db.collection(MONGODB_COLLECTION_NAME).insertOne(reminderObj);
      const reminderId = reminderObj._id;

      const embed = new Embed()
        .setColor("#F5C400")
        .setTitle("Done!")
        .setDescription(`Your reminder has now been made. I will remind you in \`${time}\``.)
        .setFooter(`Reminder ID: ${reminderId}`);

      message.reply({ embeds: [embed], isSilent: true })
        .then((msg) => {
          msg.addReaction("90002171");
        });

      cooldowns.set(userId, Date.now());

      setTimeout(async () => {
        const exists = await db.collection(MONGODB_COLLECTION_NAME).findOne({ _id: reminderId });
        if (exists) {
          db.collection(MONGODB_COLLECTION_NAME).deleteOne({ _id: reminderId });

          const embed = new Embed()
            .setColor("#F5C400")
            .setTitle("Time's Up!")
            .setDescription(`hey there! (<@${userId}>) your reminder is up! you have now been reminded.`)

          if (option === "private") {
            message.reply({ embeds: [embed], isPrivate: true })
              .then((msg) => {
                msg.addReaction("90001164");
              });
          } else if (option === "silent") {
            message.reply({ embeds: [embed], isSilent: true })
              .then((msg) => {
                msg.addReaction("90001164");
              });
          } else {
            message.reply({ embeds: [embed], isSilent: true })
              .then((msg) => {
                msg.addReaction("90001164");
              });
          }
        }
      }, timeMs);
    } catch (error) {
      console.error(`Errors occurred while running this command: ${error}`);
    }
  },
};