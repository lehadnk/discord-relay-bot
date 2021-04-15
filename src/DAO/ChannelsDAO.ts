import {AbstractDAO} from 'nergal';
import {IDbAdapter} from 'nergal';
import Channel from "../Models/Channel";

export default class ChannelsDAO extends AbstractDAO<Channel> {
    fields: string[] = ['id', 'discord_guild_id', 'discord_channel_id', 'topic'];
    table: string = 'channels';

    public constructor(db: IDbAdapter) {
        super(db, () => new Channel);
    }

    async delete(discord_channel_id: string) {
        await this.db.run("DELETE FROM channels WHERE discord_channel_id = ?1", {
            1: discord_channel_id
        });
    }
}