import Channel from "../../../Models/Channel";
import ChannelsDAO from "../../../DAO/ChannelsDAO";
import AppServiceContainer from "../../../AppServiceContainer";

export class ChannelConfigurationWriter {
    private channelsDao = new ChannelsDAO(AppServiceContainer.db)

    public async createChannel(discord_guild_id: string, discord_channel_id: string, topic: string): Promise<Channel>
    {
        let model = new Channel()
        model.discord_guild_id = discord_guild_id
        model.discord_channel_id = discord_channel_id
        model.topic = topic
        await this.channelsDao.save(model)
        return model
    }

    public async deleteChannel(discord_channel_id: string): Promise<void>
    {
        return this.channelsDao.delete(discord_channel_id)
    }
}