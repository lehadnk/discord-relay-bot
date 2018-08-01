const ChatMessageHelpers = require("../ChatMessageHelpers");

class AdminMessageHandler {
    constructor(client, adminList, bansRepository)
    {
        this.client = client;
        this.adminList = adminList;
        this.client.on('message', this.handle.bind(this));
        this.bansRepository = bansRepository;
    }

    isAdmin(discordUserId)
    {
        return this.adminList.indexOf(discordUserId) !== -1;
    }

    handle(msg)
    {
        if (!this.isAdmin(msg.author.id)) return;

        if (msg.content.match(/^\/crossban .*$/)) {
            let msgData = msg.content.split(' ');

            if (msgData.length < 3) {
                ChatMessageHelpers.temporaryMessage(msg.channel, "To ban someone, you must enter discord id and reason", 7000);
                return;
            }

            let command = msgData.splice(0, 1).join();
            let discordId = msgData.splice(0, 1).join();
            let reason = msgData.join(' ');

            this.bansRepository.ban(discordId, reason, msg.author.id, ChatMessageHelpers.getMsgAuthorName(msg));
            msg.channel.send("User " + discordId + " was banned in crosschat channels by "+ChatMessageHelpers.getMsgAuthorName(msg) + ". Reason: " + reason);
            return;
        }

        if (msg.content.match(/^\/crossunban .*$/)) {
            let msgData = msg.content.split(' ');

            if (msgData.length !== 2) {
                ChatMessageHelpers.temporaryMessage(msg.channel, "Wrong message format: should be /crossunban <id>", 7000);
            }

            this.bansRepository.unban(msgData[1]).then((response) => {
                ChatMessageHelpers.temporaryMessage(msg.channel, response, 7000);
            });
            return;
        }

        if (msg.content.match(/^\/crossbaninfo .*$/)) {
            let msgData = msg.content.split(' ');

            if (msgData.length !== 2) {
                ChatMessageHelpers.temporaryMessage(msg.channel, "Wrong message format: should be /crossunban <id>", 7000);
            }

            this.bansRepository.getBanInfo(msgData[1]).then(
                banList => {
                    banList.forEach((row) => {
                        ChatMessageHelpers.temporaryMessage(
                            msg.channel,
                            "User " + row.discord_user_id + " was banned by " + row.issuer_discord_user_name + " at " + row.issued_at + ". Reason: " + row.reason,
                            25000
                        );
                    })
                },
                reject => {
                    ChatMessageHelpers.temporaryMessage(msg.channel, reject, 7000);
                }
            );
        }

        if (msg.content.match(/^\/crossbanlist$/)) {
            this.bansRepository.getBanList().then(list => {
                ChatMessageHelpers.temporaryMessage(msg.channel, list, 25000);
            });
        }

        if (msg.content.match(/^\/strictmode$/)) {

        }
    }
}

module.exports = AdminMessageHandler;