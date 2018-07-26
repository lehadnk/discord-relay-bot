const ChatMessageHelpers = require("../ChatMessageHelpers");

class BansRepository {
    constructor(dbAdapter)
    {
        this.db = dbAdapter;
        this.bannedIdsCache = [];
    }

    prepare()
    {
        return new Promise(resolve => {
            this.db
                .all("SELECT discord_user_id FROM bans", {})
                .then(list => {
                    this.bannedIdsCache = list.map(li => li.discord_user_id);
                    resolve();
                })
        });
    }

    ban(discordUserId, reason, issuerDiscordUserId, issuerDiscordUserName)
    {
        this.db.run("INSERT INTO bans(discord_user_id, reason, issuer_discord_user_id, issuer_discord_user_name, issued_at) VALUES (?1, ?2, ?3, ?4, ?5)", {
            1: discordUserId,
            2: reason,
            3: issuerDiscordUserId,
            4: issuerDiscordUserName,
            5: new Date().toISOString()
        });
        this.bannedIdsCache.push(discordUserId);
    }

    unban(discordUserId)
    {
        return new Promise(resolve => {
            let index = this.bannedIdsCache.indexOf(discordUserId);

            if (index === -1) {
                resolve("User " + discordUserId + " is not in the ban list");
            }

            this.bannedIdsCache.splice(index, 1);

            this.db.run("DELETE FROM bans WHERE discord_user_id = ?1", {
                1: discordUserId,
            }).then(() => resolve(discordUserId + "'s ban was removed"));
        });
    }

    getBanInfo(discordId)
    {
        return new Promise((resolve, reject) => {
            this.db.all("SELECT * FROM bans WHERE discord_user_id = ?1", {1: discordId}).then((rows) => {
                if (rows.length === 0) {
                    reject("User "+discordId+" is not banned.");
                } else {
                    resolve(rows);
                }
            });
        });
    }

    getBanList()
    {
        return new Promise((resolve) => {
            this.db.all("SELECT * FROM bans", {}).then((rows) => {
                let response = "**Crosschat ban list:**\n";
                rows.forEach((row) => {
                    response += row.discord_user_id + " by " + row.issuer_discord_user_name + " at " + row.issued_at+" reason: " + row.reason+"\n";
                });

                resolve(response);
            });
        });
    }

    getBannedDiscordUserIds()
    {
        return this.bannedIdsCache;
    }
}

module.exports = BansRepository;