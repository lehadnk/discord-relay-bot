import {DiscordMessage} from "nergal";

export class SuspiciousMessageFilter {
    private newcomerTreshold: number

    constructor() {
        this.newcomerTreshold = 86400
    }

    public isSuspicious(msg: DiscordMessage)
    {
        if (this.isNewcomer(msg)) {
            return true
        }

        const regexpSteam = new RegExp('http.*:\\/\\/.*steam');
        const regexpGift = new RegExp(/\.gift\s/);

        let flag = regexpSteam.test(msg.message);
        if (flag) {
            return flag;
        }

        flag = regexpGift.test(msg.message);

        return flag;
    }

    private isNewcomer(msg: DiscordMessage)
    {
        let author = msg.object.author
        if (author.lastMessage === null) {
            return true
        }

        // some users doesn't have it filled - why?
        if (author.lastMessage.member === null) {
            return false
        }

        let joinedAt = new Date(author.lastMessage.member.joinedAt).getTime() / 1000
        let now = +new Date / 1000
        return (now - joinedAt < this.newcomerTreshold)
    }
}
