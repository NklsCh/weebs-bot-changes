const { Embed } = require("guilded.js");
module.exports = {
  description: "get information about the server.",
  run: async (client, message, args) => {
    try {

      const member = await client.members.fetch(message.serverId, message.authorId)
        if(message.member.user.type === 0) return;
      
      // Check if the args array is empty
      if (args.length === 0) {
        // Return an error message if it is
        return await message.reply("Please specify a name for the thread.");
      }
      // Join the args array with a space character to create the thread name
      const threadName = args.join(' ');
      // Create the thread with the specified name
      const thread = await message.createThread(threadName);
      console.log(`Created thread "${threadName}" with ID ${thread.id}`);
      // Send a confirmation message in an embed
      const embed = new Embed()
        .setTitle(`Thread Created: ${threadName}`)
        .setDescription('Your thread has been created successfully!')
        .setColor('#00FF00');
      await message.send({ embeds: [embed] });
    } catch (error) {
      console.error(error);
    }
  },
};