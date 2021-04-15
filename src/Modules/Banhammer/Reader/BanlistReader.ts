import BansDAO from "../../../DAO/BansDAO";
import AppServiceContainer from "../../../AppServiceContainer";
import Ban from "../../../Models/Ban";

export class BanlistReader {
    private bansDao = new BansDAO(AppServiceContainer.db);

    async getAll(): Promise<Ban[]>
    {
        return this.bansDao.getAll();
    }

    async getUser(discord_user_id: string): Promise<Ban[]>
    {
        return this.bansDao.getAllByField('banned_discord_user_id', discord_user_id)
    }
}