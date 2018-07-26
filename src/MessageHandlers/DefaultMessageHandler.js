const Discord = require("discord.js");
const ChatMessageHelpers = require("../ChatMessageHelpers");

class DefaultMessageHandler {
    constructor(client, syncChannels, bansRepository)
    {
        this.client = client;
        this.syncChannels = syncChannels;
        this.client.on('message', this.handle.bind(this));
        this.bansRepository = bansRepository;
    }

    handle(msg)
    {
        if (msg.author.bot) return;
        if (this.client.user.id === msg.author.id) return;
        if (this.syncChannels.indexOf(msg.channel.name) === -1) return;

        // Is user in the ban list?
        if (this.bansRepository.getBannedDiscordUserIds().indexOf(msg.author.id) !== -1) return;

        this.syncMessage(msg);
    }

    syncMessage(msg)
    {
        const embed = new Discord.RichEmbed()
            .setAuthor(ChatMessageHelpers.getMsgAuthorName(msg), ChatMessageHelpers.getAvatar(msg))
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