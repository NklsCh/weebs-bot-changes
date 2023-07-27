const { Client } = require("guilded.js");
const { Collection } = require("discord.js");
const { token, prefix, color, ownerId } = require("./settings.json");
const functions = require("./handlers/functions");
const client = new Client({token : token});

const express = require('express');
const app = express();
const port = 5001;

// Serve static files from the "public" directory
app.use(express.static('public'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
  });
  
client.commands = new Collection();
client.aliases = new Collection();
client.settings = { prefix, color, ownerId };
client.functions = functions;

for(let handler of  ["command", "event"]) require(`./handlers/${handler}`)(client);

client.login();

app.listen(port, () => {
  console.log(`purp is listening to port : ${port}`)
  
})