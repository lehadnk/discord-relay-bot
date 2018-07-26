const Discord = require("discord.js");
const DefaultMessageHandler = require("./MessageHandlers/DefaultMessageHandler");
const AdminMessageHandler = require("./MessageHandlers/AdminMessageHandler");
const BansRepository = require("./Repositories/BansRepository");

class DiscordClient {
    constructor(syncChannels, adminList, bansRepository)
    {
        this.client = new Discord.Client();

        new AdminMessageHandler(this.client, adminList, bansRepository);
        new DefaultMessageHandler(this.client, syncChannels, bansRepository);
    }

    start()
    {
        if (process.env.BOT_TOKEN === undefined) {
            console.error("Error: no BOT_TOKEN provided. Please configure your .env file");
            return;
        }

        this.client.login(process.env.BOT_TOKEN);
    }
}

module.exports = DiscordClient;