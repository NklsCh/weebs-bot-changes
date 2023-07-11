module.exports = {
    run: async (client) => {
        console.log(`[ ${client.user.name} ] : Connected to Guilded`)

        const server = await client.fetchServers();
        console.log(`${client.user.name} is in ${client.servers.cache.size} servers`);
    }
}