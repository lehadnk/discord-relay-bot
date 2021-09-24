import {ChannelConfigurationCache} from "./Cache/ChannelConfigurationCache";
import {ChannelConfigurationReader} from "./Reader/ChannelConfigurationReader";
import {ChannelConfigurationWriter} from "./Writer/ChannelConfigurationWriter";
import {Topic} from "./DTO/Topic";
import Channel from "../../Models/Channel";

export default class ChannelConfigurationFacade {
    private cache: ChannelConfigurationCache

    private reader = new ChannelConfigurationReader()
    private writer = new ChannelConfigurationWriter()

    constructor(cache: ChannelConfigurationCache) {
        this.cache = cache
    }

    async initializeChannelSystem()
    {
        console.log("Initializing channel caches...")
        let channels = await this.reader.getAll()
        channels.map(c => this.cache.store(c))
    }

    getTopicByDiscordChannelId(discord_channel_id: string): Topic
    {
        let topic = this.cache.getTopicByDiscordChannelId(discord_channel_id)
        let topics = this.cache.getChannelsByTopic(topic)

        let dto = new Topic()
        dto.name = topic
        dto.discordChannels = topics ? topics : []
        return dto
    }

    async addChannel(discord_guild_id: string, discord_channel_id: string, topic: string)
    {
        let channelModel = await this.writer.createChannel(discord_guild_id, discord_channel_id, topic)
        this.cache.store(channelModel)
    }

    async removeChannel(discord_channel_id: string)
    {
        let channel = await this.reader.get(discord_channel_id)
        if (channel) {
            this.cache.remove(channel)
            this.writer.deleteChannel(discord_channel_id)
        }
    }

    async getGuildChannels(discord_guild_id: string): Promise<Channel[]>
    {
        return this.reader.getForGuild(discord_guild_id)
    }

    async getChannel(discord_channel_id: string): Promise<Channel>
    {
        return this.reader.get(discord_channel_id)
    }
}