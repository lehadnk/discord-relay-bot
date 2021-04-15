import AppServiceContainer from "../../AppServiceContainer"

export class PostTimer {
    private readonly floodProtectionTimespan: number
    private readonly msgLimit: number
    private readonly banTime: number

    private readonly counters = {}
    private muted = new Map<string, void>()

    constructor()
    {
        this.floodProtectionTimespan = 8000
        this.msgLimit = 2
        this.banTime = 600000
    }

    public countMessage(authorId: string, channelId: string)
    {
        let hash = this.getCounterHash(authorId, channelId)
        if (this.counters[hash] === undefined) {
            this.counters[hash] = 1
        } else {
            this.counters[hash]++
        }

        if (this.counters[hash] > this.msgLimit) {
            this.ban(authorId, channelId)
        }

        setTimeout(() => this.counters[hash]--, this.floodProtectionTimespan)
    }

    public canWrite(authorId: string, channelId: string)
    {
        let hash = this.getCounterHash(authorId, channelId)
        return !this.muted.has(hash)
    }

    private ban(authorId: string, channelId: string)
    {
        let hash = this.getCounterHash(authorId, channelId)
        this.muted.set(hash)
        setTimeout(() => this.muted.delete(hash), this.banTime)
        AppServiceContainer.messagingService.sendDM(authorId, "Чат не помойка! Пожалуйста, старайтесь не строить лестницу из ваших сообщений лишь потому, что вам лень сформулировать предложение полностью. Вы будете автоматически размутаны через 10 минут.")
    }

    private getCounterHash(authorId: string, channelId: string): string
    {
        return authorId + channelId
    }
}