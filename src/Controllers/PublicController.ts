import {DiscordControllerResponse} from "nergal";
import {DiscordMessage} from "nergal";
import ChannelConfigurationFacade from "../Modules/ChannelConfiguration/ChannelConfigurationFacade";
import AppServiceContainer from "../AppServiceContainer";
import {MessageReplicatorFacade} from "../Modules/MessageReplicator/MessageReplicatorFacade";
import {PostTimer} from "../Modules/FloodProtection/PostTimer";
import {SpamProtectionFacade} from "../Modules/SpamProtection/SpamProtectionFacade";

export default class PublicController {
    private readonly channelConfigurationFacade = new ChannelConfigurationFacade(AppServiceContainer.channelCache)
    private readonly messageReplicatorFacade = new MessageReplicatorFacade()
    private readonly postTimer = new PostTimer()
    private readonly spamProtectionFacade = new SpamProtectionFacade()

    public async handle(msg: DiscordMessage): Promise<DiscordControllerResponse>
    {
        if (AppServiceContainer.banlistCache.isBanned(msg.authorId)) {
            console.warn(msg.authorId + " was trying to send the message, but it's banned")
            return null
        }

        let topic = this.channelConfigurationFacade.getTopicByDiscordChannelId(msg.channelId)
        let channels = topic.discordChannels.filter(c => c.discord_channel_id != msg.channelId)
        if (channels.length < 1) {
            return null
        }

        if (!this.postTimer.canWrite(msg.authorId, msg.channelId)) {
            console.warn(msg.authorId + " was trying to send message, but it's temp muted by flood protection")
            return null
        }
        this.postTimer.countMessage(msg.authorId, msg.channelId)

        if (this.spamProtectionFacade.isSuspicious(msg)) {
            console.warn(msg.authorId + " was trying to send message, but it's not allowed since it's suspicious")
            return null
        }

        this.messageReplicatorFacade.replicate(msg, channels)
        return null
    }
}