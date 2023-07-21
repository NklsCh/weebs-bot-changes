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
  name: "delete-reminder",
  description: "Deletes a previously set reminder.",
  usage: "delete-reminder <reminder ID>",
  run: async (client, message, args) => {
    try {
      const reminderId = args[0];
      if (!reminderId) {
        return message.reply("please provide a reminder ID to delete.");
      }

      const reminder = await db.collection(MONGODB_COLLECTION_NAME).findOne({ _id: reminderId });
      if (!reminder) {
        return message.reply(`no reminder found with ID: (**${reminderId}**)`);
      }

      // Check if the user who created the reminder is the same as the user trying to delete it
      if (reminder.userId !== message.author.id) {
        return message.reply(`it seems you dont have permissions to remove this reminder. you can make your own by doing the following: \`.create [time] [private or silent]\``);
      }

      await db.collection(MONGODB_COLLECTION_NAME).deleteOne({ _id: reminderId });

      const embed = new Embed()
        .setColor("#F5C400")
        .setTitle("Gotchu! 🚮")
        .setDescription(`Your reminder has been successfully removed, with the following ID: \`\`\`${reminderId}\`\`\``);

      message.reply({ embeds: [embed], isSilent: true })
        .then((msg) => {
          msg.addReaction("90002171");
        });
    } catch (error) {
      console.error(error);
    }
  },
};