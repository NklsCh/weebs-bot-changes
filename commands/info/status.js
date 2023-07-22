const fetch = require('node-fetch');

module.exports = async (client) => {
  const status = `in ${client.servers.cache.size} servers.`;
  const server = await client.fetchServers();

  const userId = "41GoE1Em";
  const authToken = "gapi_dDkxmG1Q0w8GYT+5FyMV0wA5UOScBUytM6BuzDOJM23Wqw+8u5NMYF+ueT+Ph6atWLj0Woy/JhPyg9b7/QqANQ==";

  try {
    const response = await fetch(`https://www.guilded.gg/api/v1/users/@me/status`, {
      method: 'PUT',
      headers: {
        "Authorization": `Bearer ${authToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: status,
        emoteId: 1990593,
      })
    });
    console.log(`status set to "${status}".`);
  } catch (error) {
    console.error(error);
  }
};