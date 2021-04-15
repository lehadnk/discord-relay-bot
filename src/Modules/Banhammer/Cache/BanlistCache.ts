import Ban from "../../../Models/Ban";

export class BanlistCache {
    private bannedUsers = new Map<string, void>()

    store(ban: Ban) {
        this.bannedUsers.set(ban.banned_discord_user_id)
    }

    delete(discord_user_id: string) {
        this.bannedUsers.delete(discord_user_id)
    }

    isBanned(discord_user_id: string) {
        return this.bannedUsers.has(discord_user_id);
    }
}