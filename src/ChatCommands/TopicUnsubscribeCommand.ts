import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {AbstractChatCommand} from "nergal";
import {IChatCommand} from "nergal";
import ChannelConfigurationFacade from "../Modules/ChannelConfiguration/ChannelConfigurationFacade";
import AppServiceContainer from "../AppServiceContainer";

export default class TopicUnsubscribeCommand extends AbstractChatCommand implements IChatCommand {
    command: string = '!topic-unsubscribe';

    public async handle(message: DiscordMessage, args: string[]): Promise<DiscordControllerResponse>
    {
        if (!message.isAdmin) {
            return new DiscordControllerResponse("This command is allowed to admins only");
        }

        if (args.length !== 1) {
            return new DiscordControllerResponse("Format: !topic-unsubscribe <channel>");
        }

        let channelId = args[0].replace(/[^0-9]/g, '')

        let facade = new ChannelConfigurationFacade(AppServiceContainer.channelCache)
        await facade.removeChannel(channelId)
        return new DiscordControllerResponse("Channel was removed from listeners")
    }
}