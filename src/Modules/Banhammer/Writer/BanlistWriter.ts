import AppServiceContainer from "../../../AppServiceContainer";
import BansDAO from "../../../DAO/BansDAO";
import Ban from "../../../Models/Ban";

export class BanlistWriter {
    private bansDao = new BansDAO(AppServiceContainer.db)

    public async createBan(
        banned_discord_user_id: string,
        issuer_discord_user_id: string,
        issuer_discord_user_name: string,
        given_at: number,
        comment: string
    ): Promise<Ban>
    {
        let model = new Ban();
        model.banned_discord_user_id = banned_discord_user_id;
        model.issuer_discord_user_id = issuer_discord_user_id;
        model.issuer_discord_user_name = issuer_discord_user_name;
        model.given_at = given_at;
        model.comment = comment;
        await this.bansDao.save(model);
        return model
    }

    public async deleteBan(discord_user_id: string): Promise<void>
    {
        return this.bansDao.delete(discord_user_id);
    }
}