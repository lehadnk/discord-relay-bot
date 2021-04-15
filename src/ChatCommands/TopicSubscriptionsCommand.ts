import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {AbstractChatCommand} from "nergal";
import {IChatCommand} from "nergal";
import ChannelConfigurationFacade from "../Modules/ChannelConfiguration/ChannelConfigurationFacade";
import AppServiceContainer from "../AppServiceContainer";

export default class TopicSubscriptionsCommand extends AbstractChatCommand implements IChatCommand {
    command: string = '!topic-subscriptions';

    public async handle(message: DiscordMessage, args: string[]): Promise<DiscordControllerResponse>
    {
        if (!message.isAdmin) {
            return new DiscordControllerResponse("This command is allowed to admins only");
        }

        let facade = new ChannelConfigurationFacade(AppServiceContainer.channelCache)
        let channels = await facade.getGuildChannels(message.serverId)
        let response = channels.map(c => "<#" + c.discord_channel_id + ">: " + c.topic)
        return new DiscordControllerResponse(response.join("\n"))
    }
}