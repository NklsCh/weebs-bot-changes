module.exports = {
  name: "hello",
  description: "says hello to a user.",
  run: async (client, message, args) => {
    await message.reply("hello!")
},
};
