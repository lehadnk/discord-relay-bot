class AdminListRepository {
    constructor(dbAdapter)
    {
        this.db = dbAdapter;
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
}

module.exports = AdminListRepository;