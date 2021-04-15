import {DiscordMessage} from "nergal"
import {SuspiciousMessageFilter} from "./SuspiciousMessageFilter";

export class SpamProtectionFacade {
    private suspiciousMessageFilter = new SuspiciousMessageFilter()

    public isSuspicious(msg: DiscordMessage)
    {
        return this.suspiciousMessageFilter.isSuspicious(msg)
    }
}