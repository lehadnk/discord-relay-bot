import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {AbstractChatCommand} from "nergal";
import {IChatCommand} from "nergal";
import ChannelConfigurationFacade from "../Modules/ChannelConfiguration/ChannelConfigurationFacade";
import AppServiceContainer from "../AppServiceContainer";

export default class TopicSubscribeCommand extends AbstractChatCommand implements IChatCommand {
    command: string = '!topic-subscribe';

    public async handle(message: DiscordMessage, args: string[]): Promise<DiscordControllerResponse>
    {
        if (!message.isAdmin) {
            return new DiscordControllerResponse("This command is allowed to admins only");
        }

        if (args.length !== 2) {
            return new DiscordControllerResponse("Format: !topic-subscribe <channel> <topic>");
        }

        let channelId = args[0].replace(/[^0-9]/g, '')
        let topic = args[1]

        let facade = new ChannelConfigurationFacade(AppServiceContainer.channelCache)
        let channel = await facade.getChannel(channelId)
        if (channel) {
            return new DiscordControllerResponse("This channel is already subscribed to topic " + channel.topic);
        }

        await facade.addChannel(message.serverId, channelId, topic)

        return new DiscordControllerResponse("Channel <#" + channelId + "> now listens to topic \"" + topic + "\"");
    }
}