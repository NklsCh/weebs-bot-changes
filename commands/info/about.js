const { Embed } = require("guilded.js");

module.exports = {
  name: "about",
  description: "about Reminder (made by weeb.)",
  run: async (client, message, args) => {
    try {
      const embed = new Embed()
        .setTitle("About Reminder")
        .setDescription(
          "Reminder was made with ❤️ by me, [weebwashere](https://www.guilded.gg/u/weebwashere) a upcoming guilded bot developer just trying to be creative."
        )
        .addField("what was the purpose?", "the purpose of me making reminder was for my goal. to make a bot that either nobody has made, or updated. then something came to my mind.. why not make a reminder bot? (lol)."
        )
        .addField("Supporters", "i could'nt have even made reminder without the people supporting reminder, so thank you to everybody who's helped me throughout this journey. gonna still update the bot with more amazing things in the future."
        )
        .addField("how was it made?", "Reminder was made with [Node.js](https://nodejs.org/en), [Express](https://expressjs.com), [Guilded.js](https://guilded.js.org/), and also [MongoDB](https://www.mongodb.com/).");
      message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(`Errors occurred while running this command: ${error}`);
    }
  },
};