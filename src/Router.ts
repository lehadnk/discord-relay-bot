import {DiscordMessage} from "nergal";
import {DiscordControllerResponse} from "nergal";
import {IRouter} from 'nergal';
import PublicController from "./Controllers/PublicController";

export default class Router implements IRouter {
    private publicController = new PublicController();

    async route(msg: DiscordMessage): Promise<DiscordControllerResponse> {
        return this.publicController.handle(msg);
    }
}