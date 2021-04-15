import Channel from "../../../Models/Channel";

export class ChannelConfigurationCache {
    private topics = new Map<string, Channel[]>()
    private channelTopics = new Map<string, string>()

    store(channel: Channel)
    {
        if (!this.topics.has(channel.topic)) {
            this.topics.set(channel.topic, [])
        }

        console.log("Storing channel " + channel.discord_channel_id + " to topic '" + channel.topic + "' cache")

        this.topics.get(channel.topic).push(channel)
        this.channelTopics.set(channel.discord_channel_id, channel.topic)
    }

    getTopicByDiscordChannelId(discord_channel_id: string): string
    {
        return this.channelTopics.get(discord_channel_id)
    }

    getChannelsByTopic(topic: string): Channel[]
    {
        return this.topics.get(topic)
    }

    remove(channel: Channel)
    {
        let array = this.topics.get(channel.topic)

        let key = 0
        array.forEach(elem => {
            if (elem.discord_channel_id === channel.discord_channel_id) {
                console.log("Removing channel " + channel.discord_channel_id + " from topic '" + channel.topic + "' cache")
                array.splice(key)
            }
            key += 1
        })

        this.topics.set(channel.topic, array)
        this.channelTopics.delete(channel.discord_channel_id)
    }
}