const Discord = require("discord.js");
const ChatMessageHelpers = require("../ChatMessageHelpers");
const FloodProtection = require("../Services/FloodProtection");

class DefaultMessageHandler {
    constructor(client, syncChannels, bansRepository, msgDeleteLogger)
    {
        this.client = client;
        this.syncChannels = syncChannels;
        this.client.on('message', this.handle.bind(this));
        this.bansRepository = bansRepository;
        //this.strictMode = strictMode;
        this.floodProtector = new FloodProtection();
        this.msgDeleteLogger = msgDeleteLogger;
    }

    handle(msg)
    {
        console.log('handle1');
        if (msg.author.bot) return;
        console.log('handle2');
        if (this.client.user.id === msg.author.id) return;
        console.log('handle3');
        if (this.syncChannels.indexOf(msg.channel.name) === -1) return;
        console.log('handle4');

        // Is user in the ban list?
        if (this.bansRepository.getBannedDiscordUserIds().indexOf(msg.author.id) !== -1) return;
        console.log('handle5');

        //Is this user a newcomer?
        if (this.isNewcomer(msg.author) && msg.channel.name !== 'crosschat-moder') {
            msg.author.sendMessage("К сожалению, мы были вынуждены включить защиту от спама в кросс-каналах. Поскольку вы недавно пришли на сервер, вам надо подождать немного времени прежде чем у вас появится возможность писать.");
            this.msgDeleteLogger.log(msg, "User is a newcomer");
            msg.delete().catch(() => console.log("Missing message management permissions in " + msg.guild.name));
            return;
        }
        console.log('handle6');

        if (!this.floodProtector.canWrite(msg.author.id) && msg.channel.name !== 'crosschat-moder') {
            this.msgDeleteLogger.log(msg, "Flood protection");
            msg.delete().catch(() => console.log("Missing message management permissions in " + msg.guild.name));
            return;
        }
        console.log('handle7');

        this.syncMessage(msg);
        console.log('handle8');
        this.floodProtector.countMessage(msg);
    }

    isNewcomer(author)
    {
        if (author.lastMessage === null) {
            return true;
        }

        let joinedAt = new Date(author.lastMessage.member.joinedAt).getTime() / 1000;
        let now = +new Date / 1000;
        return (now - joinedAt < 86400);
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