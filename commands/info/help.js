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
          ".memberinfo",
          "get info for a server member, for example: \`.memberinfo [@weebwashere]\`"
        )
        .addField(
          ".serverinfo",
          "get info on your servers your in."
        )
        .addField(
          ".create",
          "create your own reminders, for example: \`.create [time] [message]\`"
        )
        .addField(
          ".remove",
          "remove your reminders, for example: \`.remove [ID]\`"
        )
        .addField(
          ".about",
          "get information about Reminder."
        )
        .setThumbnail("https://img.guildedcdn.com/WebhookThumbnail/8b50aa40900db54099275a22b8906346-Full.webp?w=160&h=160")
        .setFooter(`operating in ${client.servers.cache.size} servers.`);
      const helpMessage = await message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
    }
  },
};