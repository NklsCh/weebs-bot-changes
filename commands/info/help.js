const { Embed } = require("guilded.js");

module.exports = {
  name: "help",
  description: "Displays all available commands.",
  run: async (client, message, args) => {
    try {
      const embed = new Embed()
        .setTitle("prefix is .")
        .setColor("#F5C400")
        .addField(
          ".memberinfo",
          "get info for a server member, by doing the following: \`.memberinfo [@weebwashere]\`"
        )
        .addField(
          ".serverinfo",
          "get info a server your in, by doing the following: \`.serverinfo\`"
        )
        .addField(
          ".create",
          "create your own reminders, by doing the following: \`.create [time] [message]\`"
        )
        .addField(
          ".remove",
          "remove your reminders, by doing the following: \`.remove [ID]\`"
        )
        .addField(
          ".about",
          "get information about Reminder, by doing the following: \`.about\`"
        )
        .setThumbnail("https://img.guildedcdn.com/WebhookThumbnail/8b50aa40900db54099275a22b8906346-Full.webp?w=160&h=160")
      await message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
    }
  },
};