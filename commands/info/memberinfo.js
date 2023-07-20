const { Embed } = require("guilded.js");
const moment = require("moment");

module.exports = {
  description: "View the profile someone",
  run: async (client, message, args) => {
    let user;
    if (!args[0]) {
      message.reply("please mention someone to view their profile, for example: `.memberinfo (@weebwashere)`");
      return;
    } else {
      user = message.mentions.users[0].id;
    }
    const member = await client.members.fetch(message.serverId, user);
    const server = await client.servers.fetch(message.serverId);
    const fields = [
      { name: "Nickname:", value: member.nickname ? member.nickname : "None" },
      { name: "ID:", value: member.user.id },
      { name: "Joined Server:", value: moment(member.joinedAt).format("MMMM Do YYYY") },
      { name: "Joined Guilded:", value: moment(member.user.createdAt).format("MMMM Do YYYY") },
    ];
    const bannerUrl = member.user.banner || "https://img.guildedcdn.com/ContentMediaGenericFiles/8f7d9efc9f61be2abfe31c4d28703005-Full.webp?w=712&h=157";
    const embed = new Embed()
      .setTitle(`${member.user.name}`)
      .setThumbnail(member.user.avatar || null)
      .setColor("#F5C400")
      .addFields(fields)
      .setImage(bannerUrl)
      .setFooter(server.name, server.iconURL);
    message.reply({ embeds: [embed], isSilent: true });
  }
};