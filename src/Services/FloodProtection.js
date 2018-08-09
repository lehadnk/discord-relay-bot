class FloodProtection {

    constructor() {
        this.floodProtectionTimespan = 8000;
        this.msgLimit = 2;
        this.banTime = 600000;
        this.counters = {};
        this.muted = new Map();
    }

    countMessage(msg) {
        let userId = msg.author.id;
        if (this.counters[userId] === undefined) {
            this.counters[userId] = 1;
        } else {
            this.counters[userId]++;
        }

        if (this.counters[userId] > this.msgLimit) {
            this.ban(msg.author)
        }

        setTimeout(() => this.counters[userId]--, this.floodProtectionTimespan);
    }

    canWrite(userId) {
        return !this.muted.has(userId);
    }

    ban(user) {
        this.muted.set(user.id, 1);
        setTimeout(() => this.muted.delete(user.id), this.banTime);
        user.send("Чат не помойка! Пожалуйста, старайтесь не строить лестницу из ваших сообщений лишь потому, что вам лень сформулировать предложение полностью. Вы будете автоматически размутаны через 10 минут.");
    }

}

module.exports = FloodProtection;