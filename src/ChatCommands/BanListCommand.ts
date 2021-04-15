import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {AbstractChatCommand} from "nergal";
import {IChatCommand} from "nergal";
import AppServiceContainer from "../AppServiceContainer";
import {BanhammerFacade} from "../Modules/Banhammer/BanhammerFacade";
import {chunkArray} from "../Helpers/Array";

export default class BanListCommand extends AbstractChatCommand implements IChatCommand {
    command: string = '!cross-ban-list';

    public async handle(message: DiscordMessage, args: string[]): Promise<DiscordControllerResponse>
    {
        if (!message.isAdmin) {
            return new DiscordControllerResponse("This command is allowed to admins only");
        }

        let facade = new BanhammerFacade(AppServiceContainer.banlistCache)
        let bans = await facade.getAllBans()

        let response = bans.map(b => b.issuer_discord_user_name + ' (' + b.given_at + '): ' + b.comment);
        let chunks = chunkArray(response, 10)

        chunks.forEach(c => {
            AppServiceContainer.messagingService.sendToChannel(message.channelId, c.join('\n'))
        })

        return null
    }
}