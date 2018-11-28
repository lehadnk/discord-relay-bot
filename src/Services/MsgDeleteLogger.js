const MsgDeleteReason = require('../DTO/MsgDeleteReason');

class MsgDeleteLogger {

    constructor() {
        this.reasonList = new Map();
    }

    log(msg, reason)
    {
        this.reasonList.set(msg.author.id, new MsgDeleteReason(
            msg.content,
            reason
        ));
    }

    getLastDeletedMessageReason(discord_user_id)
    {
        if (!this.reasonList.has(discord_user_id)) return null;
        return this.reasonList.get(discord_user_id);
    }
}

module.exports = MsgDeleteLogger;