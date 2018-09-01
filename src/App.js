const AdminListRepository = require("./Repositories/AdminListRepository");
const BansRepository = require("./Repositories/BansRepository");
const DiscordClient = require("./Services/DiscordClient");

class App {
    constructor(syncChannels, dbAdapter) {
        this.syncChannels = syncChannels;
        this.dbAdapter = dbAdapter;
        this.adminListRepository = new AdminListRepository(this.dbAdapter);
        this.banListRepository = new BansRepository(this.dbAdapter);
    }

    async run() {
        await this.adminListRepository.prepare().catch(r => {
            console.error("Unable to load admin list: " + r);
        });

        await this.banListRepository.prepare().catch(r => {
            console.error("Unable to load ban list: " + r);
        });

        const discordClient = new DiscordClient(this.syncChannels, this.adminListRepository, this.banListRepository);
        discordClient.start();
    }
}

module.exports = App;