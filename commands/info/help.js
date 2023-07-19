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
          ".help-utility",
          "get utility-based commands  :GuildedInfo: "
        )
        .addField(
          ".help-system",
          "get commands for creating reminders. :GuildedInfo: "
        )
        .setImage("https://img.guildedcdn.com/ContentMediaGenericFiles/60a5eaf682c3459a6d6a5ac6b9c3a8c2-Full.webp?w=601&h=152")
        .setThumbnail("https://img.guildedcdn.com/ContentMediaGenericFiles/a9871a37908107b03c651ec17be0d945-Full.webp?w=756&h=756")
        .setFooter(`Reminder is in ${client.servers.cache.size} servers.`);
      const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
    }
  },
};