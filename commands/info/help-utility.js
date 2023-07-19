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
          ".serverinfo",
          "get information on the server you are in, for example: \`.serverinfo\`. :GuildedInfo: "
        )
        .addField(
          ".memberinfo",
          "get information on any user that is inside your current server, for example: \`.memberinfo (user)\`.  :GuildedInfo: "
        )
        .setThumbnail("https://img.guildedcdn.com/ContentMediaGenericFiles/a9871a37908107b03c651ec17be0d945-Full.webp?w=756&h=756")
      const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
    }
  },
};