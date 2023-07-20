const { Embed } = require("guilded.js");

module.exports = {
  name: "about",
  description: "about Reminder (made by weeb)",
  run: async (client, message, args) => {
    try {
      const embed = new Embed()
        .setTitle("Hello! I am Reminder.")
        .setDescription(
          "I am what people call me on guilded... **Reminder** a guilded bot that was made with node.js, guilded.js, and full of love :BlobCatLove:, how did i come up with this idea? well originally found the idea from just trying to be creative and make a bot what wasnt on guilded yet, and there came.. Reminder."
        )
        .addField("Thanks to the following supporters:", "YumYummity, NotAussie, hoemotion, TooMuchHam, notisa, K1RΔΔ, and **everyone** else for supporting me in this project!");
      message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(`Errors occurred while running this command: ${error}`);
    }
  },
};