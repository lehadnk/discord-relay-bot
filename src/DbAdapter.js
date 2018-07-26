class DbAdapter {
    constructor(dbConnection) {
        this.db = dbConnection;
    }

    async get(sql, placeholders) {
        return new Promise((resolve, reject) => {
            this.db.get(sql, placeholders, (err, row) => {
                if (err !== null) {
                    reject(err);
                    return;
                }

                resolve(row);
            });
        });
    }

    async all(sql, placeholders) {
        return new Promise((resolve, reject) => {
            this.db.all(sql, placeholders, (err, rows) => {
                if (err !== null) {
                    reject(err);
                    return;
                }

                resolve(rows);
            });
        });
    }

    run(sql, placeholders) {
        return new Promise((resolve) => {
            this.db.run(sql, placeholders);
            resolve();
        });
    }
}

module.exports = DbAdapter;