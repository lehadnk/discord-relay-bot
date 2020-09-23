const Discord = require("discord.js");
const DefaultMessageHandler = require("../MessageHandlers/DefaultMessageHandler");
const AdminMessageHandler = require("../MessageHandlers/AdminMessageHandler");
const MsgDeleteLogger = require("./MsgDeleteLogger");
const OwnerMmessageHandler = require("../MessageHandlers/OwnerMessageHandler");

class DiscordClient {
    constructor(syncChannels, adminListRepository, bansRepository)
    {
        this.client = new Discord.Client();
        this.msgDeleteLogger = new MsgDeleteLogger();

        new OwnerMmessageHandler(this.client, adminListRepository);
        new AdminMessageHandler(this.client, adminListRepository, bansRepository, this.msgDeleteLogger);
        new DefaultMessageHandler(this.client, syncChannels, bansRepository, this.msgDeleteLogger);
    }

    start()
    {
        if (process.env.BOT_TOKEN === undefined) {
            console.error("Error: no BOT_TOKEN provided. Please configure your .env file");
            return;
        }

        this.client.login(process.env.BOT_TOKEN).then(r => console.log('The bot had started!'));
    }
}

module.exports = DiscordClient;