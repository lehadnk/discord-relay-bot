import Channel from "../../../Models/Channel";
import AppServiceContainer from "../../../AppServiceContainer";

export class MessageSender {
    send(embed, channels: Channel[]) {
        channels.forEach(async channel => {
            let discordChannel = await AppServiceContainer.discordClient.channels.fetch(channel.discord_channel_id)
            if (discordChannel.isText()) {
                await discordChannel.send({embed})
            }
        })
    }
}