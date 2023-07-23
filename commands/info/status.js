const fetch = require('node-fetch')

module.exports = async (client) => {
  const status = `in ${client.servers.cache.size} servers.`
  const server = await client.fetchServers()
  
  try {
    await client.setStatus({
      content: status,
      emoteId: 1990593,
    })
    console.log(`status set to "${status}".`)
  } catch (error) {
    console.error(error)
  }
}
