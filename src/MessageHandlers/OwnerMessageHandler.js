import ChatMessageHelpers from '../ChatMessageHelpers';

class OwnerMessageHandler {
    constructor(client, adminListRepository)
    {
        this.client = client;
        this.adminListRepository = adminListRepository;
        this.client.on('message', this.handle.bind(this));
    }

    handle(msg)
    {
        if (msg.author.id !== process.env.OWNER_DISCORD_ID) return;

        if (msg.content.match(/^\/addadmin .*$/)) {
            let msgData = msg.content.split(' ');

            if (msgData.length < 3) {
                ChatMessageHelpers.temporaryMessage(msg.channel, "You must provide discord_id and comment", 7000);
                return;
            }

            let command = msgData.splice(0, 1).join();
            let discordId = msgData.splice(0, 1).join();
            let comment = msgData.join(' ');

            if (this.adminListRepository.isAdmin(discordId)) {
                msg.channel.send("User " + discordId + " is already in admin list");
                return;
            }

            this.adminListRepository.add(discordId, comment);
            msg.channel.send("User " + discordId + " was added to admin list");
            return;
        }
    }
}

module.exports = OwnerMessageHandler;