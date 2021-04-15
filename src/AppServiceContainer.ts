import {AbstractServiceContainer, IRouter} from 'nergal';
import Router from './Router';
import {ChannelConfigurationCache} from "./Modules/ChannelConfiguration/Cache/ChannelConfigurationCache";
import ChannelConfigurationFacade from "./Modules/ChannelConfiguration/ChannelConfigurationFacade";
import {IChatCommandsLoader} from "nergal/src/ChatCommands/IChatCommandsLoader";
import AppChatCommandsLoader from "./ChatCommands/AppChatCommandsLoader";
import {BanlistCache} from "./Modules/Banhammer/Cache/BanlistCache";
import {BanhammerFacade} from "./Modules/Banhammer/BanhammerFacade";

export default class AppServiceContainer extends AbstractServiceContainer {
    protected static router;
    protected static chatCommandsLoader: IChatCommandsLoader = new AppChatCommandsLoader();

    public static channelCache: ChannelConfigurationCache;
    public static banlistCache: BanlistCache;

    public static init()
    {
        super.init();
    }

    public static async start()
    {
        this.channelCache = new ChannelConfigurationCache();
        this.banlistCache = new BanlistCache();

        this.router = new Router();
        super.updateRouter();
        await super.start();

        let channelFacade = new ChannelConfigurationFacade(this.channelCache)
        await channelFacade.initializeChannelSystem()

        let banhammerFacade = new BanhammerFacade(this.banlistCache)
        await banhammerFacade.initializeBanSystem()
    }
}