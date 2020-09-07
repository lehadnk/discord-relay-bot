const warriorIds = [
    '212541475928408064', // rylaiko
];

const mageIds = [
    '206158108731506689', // Акула
];

const classColors = {
    priest: '#FFFFFC',
    druid: '#FF7D0A',
    dh: '#A330C9',
    dk: '#C41F3B',
    rogue: '#FFF569',
    hunter: '#ABD473',
    paladin: '#F58CBA',
    shaman: '#0070DE',
    mage: '#69CCF0',
    warlock: '#9482C9',
    warrior: '#C79C6E',
    monk: '#00FF96',
    classic: '#D1DEBD',
    default: '#999999',
};

module.exports = {

    getClassColor(msg) {
        if (warriorIds.indexOf(msg.author.id) > -1) {
            return classColors.warrior;
        }

        if (mageIds.indexOf(msg.author.id) > -1) {
            return classColors.mage;
        }

        switch(msg.guild.id) {
            case '207912188407578624': // priest
                return classColors.priest;
            case '215548192891076610': // dh
            case '736173202979422271':
                return classColors.dh;
            case '217529023838814208': // rogue
                return classColors.rogue;
            case '217529109272592384': // dk
            case '452908426276634634': // new dk
                return classColors.dk;
            case '203632333620772874': // druid
                return classColors.druid;
            case '215427955193544704': // hunter
                return classColors.hunter;
            case '210643527472906241': // paladin
                return classColors.paladin;
            case '214750173413376003': // shaman
                return classColors.shaman;
            case '212664465181769728': // mage
                return classColors.mage;
            case '217529170291458048': // warlock
                return classColors.warlock;
            case '217528830418616322': // warrior
                return classColors.warrior;
            case '217529277489479681': // monk
                return classColors.monk;
            case '415846451193839617': // classic
                return classColors.classic;
        }

        return classColors.default; // undefined
    },

    getAvatar(msg) {
        if (msg.author.id === '207169330549358592' && msg.guild.id === '207912188407578624') {
            return 'https://i.imgur.com/4nD6yJN.jpg';
        }

        return msg.author.displayAvatarURL;
    },

    getCrossmoderColor(msg) {
        if (msg.member.roles.find(r => r.name === 'Priest')) {
            return classColors.priest;
        }
        if (msg.member.roles.find(r => r.name === 'Druid')) {
            return classColors.druid;
        }
        if (msg.member.roles.find(r => r.name === 'Warrior')) {
            return classColors.warrior;
        }
        if (msg.member.roles.find(r => r.name === 'Demon Hunter')) {
            return classColors.dh;
        }
        if (msg.member.roles.find(r => r.name === 'Hunter')) {
            return classColors.hunter;
        }
        if (msg.member.roles.find(r => r.name === 'Warlock')) {
            return classColors.warlock;
        }
        if (msg.member.roles.find(r => r.name === 'Death Knight')) {
            return classColors.dk;
        }
        if (msg.member.roles.find(r => r.name === 'Mage')) {
            return classColors.mage;
        }
        if (msg.member.roles.find(r => r.name === 'Rogue')) {
            return classColors.rogue;
        }
        if (msg.member.roles.find(r => r.name === 'Classic')) {
            return classColors.classic;
        }
        if (msg.member.roles.find(r => r.name === 'Paladin')) {
            return classColors.paladin;
        }

        return classColors.default;
    },

    getMsgAuthorName(msg) {
        if (msg.member === 'undefined' || msg.member === null) {
            return msg.author.username;
        }

        return msg.member.displayName;
    },

    temporaryMessage(channel, text, lifespan) {
        const response = channel.send(text);
        response.then((m) => { m.delete(lifespan); });
    },

    chunkArray(myArray, chunk_size) {
        let index = 0;
        let arrayLength = myArray.length;
        let tempArray = [];

        for (index = 0; index < arrayLength; index += chunk_size) {
            let myChunk = myArray.slice(index, index+chunk_size);
            // Do something if you want with the group
            tempArray.push(myChunk);
        }

        return tempArray;
    }
};