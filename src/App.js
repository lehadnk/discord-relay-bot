const AdminListRepository = require("./Repositories/AdminListRepository");
const DiscordClient = require("./DiscordClient");

class App {
    constructor(syncChannels, dbAdapter) {
        this.syncChannels = syncChannels;
        this.dbAdapter = dbAdapter;
        this.adminListRepository = new AdminListRepository(this.dbAdapter);
    }

    async run() {
        const adminList = await this.adminListRepository.getList().catch(r => {
            console.error("Unable to load admin list: " + r);
        });

        const discordClient = new DiscordClient(this.syncChannels, adminList);
        discordClient.start();
    }
}

module.exports = App;