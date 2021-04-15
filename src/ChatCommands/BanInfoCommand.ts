import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {AbstractChatCommand} from "nergal";
import {IChatCommand} from "nergal";
import AppServiceContainer from "../AppServiceContainer";
import {BanhammerFacade} from "../Modules/Banhammer/BanhammerFacade";

export default class BanInfoCommand extends AbstractChatCommand implements IChatCommand {
    command: string = '!cross-ban-info';

    public async handle(message: DiscordMessage, args: string[]): Promise<DiscordControllerResponse>
    {
        if (!message.isAdmin) {
            return new DiscordControllerResponse("This command is allowed to admins only");
        }

        if (args.length !== 1) {
            return new DiscordControllerResponse("Format: !ceoss-ban-info <discord_user_id>");
        }

        let discordUserId = args[0].replace(/[^0-9]/g, '')

        let facade = new BanhammerFacade(AppServiceContainer.banlistCache)
        let bans = await facade.getUserBans(discordUserId)

        let response = bans.map(b => b.issuer_discord_user_name + ' (' + b.given_at + '): ' + b.comment).join('\n')

        return new DiscordControllerResponse(response);
    }
}