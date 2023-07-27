const WebSocket = require('ws');
const { token } = require('./settings.json');

// config
const bannedWords = [];
const socket = new WebSocket('wss://www.guilded.gg/websocket/v1', {
  headers: {
    Authorization: `Bearer ${token}`
  },
});

socket.on('open', function() {
  console.log('connected to Guilded!');
});

socket.on('message', function incoming(data) {
  const json = JSON.parse(data);
  const {t: eventType, d: eventData} = json;
  console.log({eventType, eventData});

  if (eventType === 'ChatMessageCreated' || eventType === 'ChatMessageUpdated') {
    const {message: {id: messageId, content, channelId}} = eventData;
    const isBanned = bannedWords.some(word => content.toLowerCase().includes(word.toLowerCase()));

    if (isBanned) {
      // delete message containing a banned word
      fetch(`https://www.guilded.gg/api/v1/channels/${channelId}/messages/${messageId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
  } else if (eventType === 'BotServerMembershipCreated') {
    const {server: {defaultChannelId}} = eventData;

    // posts welcome message with an image
    fetch(`https://www.guilded.gg/api/v1/channels/${defaultChannelId}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        embeds: [{
          title: "Hello! I am Reminder. 👋",
          description: `want to see more of my commands? please dont worry! just do the following: \`\`\`.help\`\`\` so what are you waiting for? start creating your reminders today!  

 **Links**
[Support Server](guilded.gg/weebdev)`,
          image: {
            url: "https://media.tenor.com/C5WKAiQ_XbQAAAAC/hello-chat-gif-satoru-gojo.gif"
          }
        }]
      }),
    });
  }
});