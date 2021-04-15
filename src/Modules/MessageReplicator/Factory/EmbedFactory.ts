const Discord = require("discord.js");
import {Message} from "../DTO/Message";

export class EmbedFactory {
    make(message: Message) {
        let embed = new Discord.MessageEmbed()
        embed.setAuthor(message.authorName, message.avatarUrl)
        embed.setDescription(message.text)
        embed.setColor(message.color)

        if (message.imageUrl) {
            embed.setImage(message.imageUrl)
        }

        return embed
    }
}