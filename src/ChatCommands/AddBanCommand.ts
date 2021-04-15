import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {AbstractChatCommand} from "nergal";
import {IChatCommand} from "nergal";
import AppServiceContainer from "../AppServiceContainer";
import {BanhammerFacade} from "../Modules/Banhammer/BanhammerFacade";

export default class AddBanCommand extends AbstractChatCommand implements IChatCommand {
    command: string = '!cross-ban';

    public async handle(message: DiscordMessage, args: string[]): Promise<DiscordControllerResponse>
    {
        if (!message.isAdmin) {
            return new DiscordControllerResponse("This command is allowed to admins only");
        }

        if (args.length < 2) {
            return new DiscordControllerResponse("Format: !cross-ban <discord_user_id> <reason>");
        }

        let discordUserId = args[0].replace(/[^0-9]/g, '')
        let reason = args.splice(1).join(' ')

        let facade = new BanhammerFacade(AppServiceContainer.banlistCache)
        await facade.ban(discordUserId, message.authorId, message.authorName, reason)

        return new DiscordControllerResponse("User was banned");
    }
}