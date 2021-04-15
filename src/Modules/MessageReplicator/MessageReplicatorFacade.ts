import {Message} from "./DTO/Message";
import {EmbedFactory} from "./Factory/EmbedFactory";
import {MessageSender} from "./Sender/MessageSender";
import {DiscordMessage} from "nergal";
import Channel from "../../Models/Channel";
import {ClassColors} from "./Colors/ClassColors";

export class MessageReplicatorFacade {
    private embedFactory = new EmbedFactory()
    private messageSender = new MessageSender()
    private classColors = new ClassColors()

    replicate(msg: DiscordMessage, channels: Channel[]) {
        let dto = new Message()
        dto.text = msg.message
        dto.authorName = msg.authorName
        dto.avatarUrl = msg.authorAvatarUrl
        dto.imageUrl = msg.embedImageUrl.length > 0 ? msg.embedImageUrl[0] : null
        dto.color = this.classColors.getClassColor(msg)


        if (msg.authorId === '207169330549358592' && msg.serverId === '207912188407578624') {
            dto.avatarUrl = 'https://i.imgur.com/4nD6yJN.jpg'
        }

        let embed = this.embedFactory.make(dto)

        this.messageSender.send(embed, channels)
    }
}