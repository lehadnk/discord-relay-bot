import ChannelsDAO from "../../../DAO/ChannelsDAO";
import AppServiceContainer from "../../../AppServiceContainer";
import Channel from "../../../Models/Channel";

export class ChannelConfigurationReader
{
    private channelsDao = new ChannelsDAO(AppServiceContainer.db)

    async getAll(): Promise<Channel[]>
    {
        return this.channelsDao.getAll()
    }

    async get(discord_channel_id: string): Promise<Channel>
    {
        return this.channelsDao.getOneByField('discord_channel_id', discord_channel_id)
    }

    async getForGuild(discord_guild_id: string): Promise<Channel[]>
    {
        return this.channelsDao.getAllByField('discord_guild_id', discord_guild_id)
    }
}