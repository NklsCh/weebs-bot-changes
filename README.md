# weebs-bot-template
hello! I'm weeb. wanna make a guilded bot? (in node.js) please follow the steps below!

**1:**
make a new node.js project, and install guilded.js
```

npm install guilded.js

```

**2:** open your terminal or (**shell for replit**) and clone this repository 
```

git clone https://github.com/weebwashere/weebs-bot-template.git

```

**3:** open the command/info folder and make a command named `hello.js` and paste this code:
```

module.exports = {
  name: "hello",
  description: "says hello to a user.",
  run: async (client, message, args) => {
    await message.reply("hello!")
},
};

```

**4:** go to `settings.json` and paste your guilded bot token

then all u gotta do is run ur file by doing `node index.js` or `node .` and your good to go!
