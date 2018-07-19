class AdminMessageHandler {
    constructor(client, adminList)
    {
        this.client = client;
        this.adminList = adminList;
        this.client.on('message', this.handle.bind(this));
    }

    isAdmin(discordUserId)
    {
        return this.adminList.indexOf(discordUserId) !== -1;
    }

    handle(msg)
    {
        if (!this.isAdmin(msg.author.id)) return;
    }
}

module.exports = AdminMessageHandler;