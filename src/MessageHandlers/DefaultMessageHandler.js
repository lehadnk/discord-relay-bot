const Discord = require("discord.js");
const ChatMessageHelpers = require("../ChatMessageHelpers");

class DefaultMessageHandler {
    constructor(client, syncChannels)
    {
        this.client = client;
        this.syncChannels = syncChannels;
        this.client.on('message', this.handle.bind(this));
    }

    handle(msg)
    {
        if (this.client.user.id === msg.author.id) return;
        if (this.syncChannels.indexOf(msg.channel.name) === -1) return;
        this.syncMessage(msg);
    }

    syncMessage(msg)
    {
        const embed = new Discord.RichEmbed()
            .setAuthor(ChatMessageHelpers.getNickname(msg), ChatMessageHelpers.getAvatar(msg))
            .setDescription(msg.content)
            .setColor(ChatMessageHelpers.getClassColor(msg));

        if (msg.attachments.first() !== undefined) {
            embed.setImage(msg.attachments.first().url);
        }

        this.client.guilds.forEach(function (guild) {
            if (guild.id !== msg.guild.id) {
                const channel = guild.channels.find('name', msg.channel.name);
                if (channel !== null) {
                    channel.send({embed}).catch(r => console.error("Unable to sync message to " + guild.name + ": " + r));
                }
            }
        });
    };
}

module.exports = DefaultMessageHandler;