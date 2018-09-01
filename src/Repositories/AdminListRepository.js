class AdminListRepository {
    constructor(dbAdapter)
    {
        this.db = dbAdapter;
        this.adminListCache = this.getList();
    }

    async prepare()
    {
        this.adminListCache = await this.getList().catch(r => {
            console.error("Unable to load admin list: " + r);
        });
    }

    getList()
    {
        return new Promise(resolve => {
            this.db
                .all("SELECT * FROM admins", {})
                .then(list => {
                    resolve(list.map(li => li.discord_user_id));
                })
        });
    }

    add(discordUserId, comment)
    {
        if (this.isAdmin(discordUserId)) return;

        this.db.run("INSERT INTO admins(discord_user_id, comment) VALUES (?1, ?2)", {
            1: discordUserId,
            2: comment,
        });
        this.adminListCache.push(discordUserId, comment);
    }

    isAdmin(discordUserId)
    {
        return this.adminListCache.indexOf(discordUserId) !== -1;
    }
}

module.exports = AdminListRepository;