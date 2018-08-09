const Discord = require("discord.js");
const DefaultMessageHandler = require("../MessageHandlers/DefaultMessageHandler");
const AdminMessageHandler = require("../MessageHandlers/AdminMessageHandler");
const MsgDeleteLogger = require("./MsgDeleteLogger");

class DiscordClient {
    constructor(syncChannels, adminList, bansRepository, msgDeleteLogger)
    {
        this.client = new Discord.Client();
        this.msgDeleteLogger = new MsgDeleteLogger();

        new AdminMessageHandler(this.client, adminList, bansRepository, this.msgDeleteLogger);
        new DefaultMessageHandler(this.client, syncChannels, bansRepository, this.msgDeleteLogger);
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