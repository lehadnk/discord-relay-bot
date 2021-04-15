import {BanlistCache} from "./Cache/BanlistCache";
import {BanlistReader} from "./Reader/BanlistReader";
import {BanlistWriter} from "./Writer/BanlistWriter";
import Ban from "../../Models/Ban";

export class BanhammerFacade {
    private cache: BanlistCache;

    private reader = new BanlistReader()
    private writer = new BanlistWriter()

    constructor(cache: BanlistCache) {
        this.cache = cache
    }

    async initializeBanSystem()
    {
        console.log("Initializing ban list cache...")
        let bans = await this.reader.getAll()
        bans.map(b=> this.cache.store(b))
    }

    async ban(banned_discord_user_id: string, issuer_discord_user_id: string, issuer_discord_user_name: string, reason: string)
    {
        let time = Math.floor(Date.now() / 1000);
        let ban = await this.writer.createBan(banned_discord_user_id, issuer_discord_user_id, issuer_discord_user_name, time, reason)
        this.cache.store(ban)
    }

    async unban(banned_discord_user_id: string)
    {
        await this.writer.deleteBan(banned_discord_user_id)
        this.cache.delete(banned_discord_user_id)
    }

    async getUserBans(discord_user_id: string): Promise<Ban[]>
    {
        return this.reader.getUser(discord_user_id)
    }

    async getAllBans()
    {
        return this.reader.getAll()
    }
}