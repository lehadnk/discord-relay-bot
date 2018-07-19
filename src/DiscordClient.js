const Discord = require("discord.js");
const DefaultMessageHandler = require("./MessageHandlers/DefaultMessageHandler");
const AdminMessageHandler = require("./MessageHandlers/DefaultMessageHandler");

class DiscordClient {
    constructor(syncChannels, adminList)
    {
        this.client = new Discord.Client();
        new AdminMessageHandler(this.client, adminList);
        new DefaultMessageHandler(this.client, syncChannels);
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