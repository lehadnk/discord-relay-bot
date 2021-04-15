import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {AbstractChatCommand} from "nergal";
import {IChatCommand} from "nergal";
import AppServiceContainer from "../AppServiceContainer";
import {BanhammerFacade} from "../Modules/Banhammer/BanhammerFacade";

export default class RemoveBanCommand extends AbstractChatCommand implements IChatCommand {
    command: string = '!cross-unban';

    public async handle(message: DiscordMessage, args: string[]): Promise<DiscordControllerResponse>
    {
        if (!message.isAdmin) {
            return new DiscordControllerResponse("This command is allowed to admins only");
        }

        if (args.length !== 1) {
            return new DiscordControllerResponse("Format: !add_channel <discord_user_id>");
        }

        let discordUserId = args[0].replace(/[^0-9]/g, '')

        let facade = new BanhammerFacade(AppServiceContainer.banlistCache)
        await facade.unban(discordUserId)

        return new DiscordControllerResponse("User was unbanned");
    }
}