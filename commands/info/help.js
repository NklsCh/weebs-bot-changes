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
          ".help-others",
          "get commands for creating reminders. :GuildedInfo: "
        )
        .setFooter(`Reminder is in ${client.servers.cache.size} servers.`);
      const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
    }
  },
};