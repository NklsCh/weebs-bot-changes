const { Embed } = require("guilded.js");
const moment = require("moment");

module.exports = {
  description: "get information about the server.",
  aliases: ["guild"],
  run: async (client, message) => {
    try {
      const server = await client.servers.fetch(message.serverId);
      const embed = new Embed()
        .addFields([
          { name: "Name:", value: server.name, inline: true },
          { name: "Description:", value: server.description ? server.description : "N/A" },
          { name: "Created:", value: moment(server.createdAt).format("MMMM Do, YYYY"), inline: true },
          { name: "Verified:", value: server.isVerified ? "👍" : "👎", inline: true },
          { name: "Owner:", value: `<@${server.ownerId}>`, inline: true },
          { name: "Timezone:", value: server.timezone ? server.timezone : "❔", inline: true },
          { name: "URL:", value: server.url ? `[${server.name}](${server.url})` : "❔", inline: true },
        ])
        .setThumbnail(server.iconURL)
        .setImage(server.raw.banner)
        .setColor("#F5C400");

      message.reply({ embeds: [embed], isSilent: true });
    } catch (error) {
      console.error(error);
    }
  },
};