module.exports = {
    run: async (client) => {
      console.log(`[ ${client.user.name} ] : Connected to Guilded`)
      await client.fetchServers()
      const status = {
        content: `operating in ${client.servers.cache.size} servers.`,
        emoteId: 1990593,
      }
      await client.setStatus(status)
      console.log(
        `${client.user.name} is in ${client.servers.cache.size} servers`,
      )
    },
  }