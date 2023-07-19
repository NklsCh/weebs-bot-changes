const { Embed } = require("guilded.js");

module.exports = {
  name: "help",
  description: "Displays all available commands.",
  run: async (client, message, args) => {
    let embed1;
    try {
      const server = await client.fetchServers();
      const embed = new Embed()
        .setTitle("prefix is .")
        .setColor("#F5C400")
        .addField(
          ".create",
          "create your reminders, for example: \`.create (1m) (silent or private)\`.  :GuildedInfo: "
        )
        .addField(
          ".delete (ID required)",
          "delete your reminders, for example: \`.delete (000000)\`. :GuildedInfo: "
        )
        .setThumbnail("https://img.guildedcdn.com/ContentMediaGenericFiles/a9871a37908107b03c651ec17be0d945-Full.webp?w=756&h=756")
      const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
    }
  },
};