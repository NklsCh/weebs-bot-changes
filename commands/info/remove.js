const { Embed } = require("guilded.js");
const { MongoClient } = require("mongodb");
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


module.exports = {
  name: "delete-reminder",
  description: "Deletes a previously set reminder.",
  usage: "delete-reminder <reminder ID>",
  run: async (client, message, args) => {
    try {
      const reminderId = args[0];
      if (!reminderId) {
        return message.reply({content: "please provide a reminder ID to remove.", isSilent: true})
      }

      const reminder = await db.collection(MONGODB_COLLECTION_NAME).findOne({ _id: reminderId });
      if (!reminder) {
        return message.reply({content: `no reminder found with ID: (**${reminderId}**) please make sure your pasting the correct id.`, isSilent: true})
      }

      // Check if the user who created the reminder is the same as the user trying to delete it
      if (reminder.userId !== message.author.id) {
        return message.reply({content: `it seems you dont have permissions to remove this reminder. you can make your own by doing the following: \`.create [time] [private or silent]\``, isSilent: true})
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