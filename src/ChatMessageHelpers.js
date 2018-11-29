const warriorIds = [
    '212541475928408064', // rylaiko
];

const mageIds = [
    '206158108731506689',
];

module.exports = {

    getClassColor(msg) {
        if (warriorIds.indexOf(msg.author.id) > -1) {
            return '#C79C6E';
        }

        if (mageIds.indexOf(msg.author.id) > -1) {
            return '#69CCF0';
        }

        switch(msg.guild.id) {
            case '207912188407578624': // priest
                return '#FFFFFF';
            case '215548192891076610': // dh
                return '#A330C9';
            case '217529023838814208': // rogue
                return '#FFF569';
            case '217529109272592384': // dk
                return '#C41F3B';
            case '452908426276634634': // new dk
                return '#C41F3B';
            case '203632333620772874': // druid
                return '#FF7D0A';
            case '215427955193544704': // hunter
                return '#ABD473';
            case '210643527472906241': // paladin
                return '#F58CBA';
            case '214750173413376003': // shaman
                return '#0070DE';
            case '212664465181769728': // mage
                return '#69CCF0';
            case '217529170291458048': // warlock
                return '#9482C9';
            case '217528830418616322': // warrior
                return '#C79C6E';
            case '217529277489479681': // monk
                return '#00FF96';
        }

        return '#999999'; // undefined
    },

    getAvatar(msg) {
        if (msg.author.id === '207169330549358592' && msg.guild.id === '203632333620772874') {
            return 'https://i.imgur.com/UBFnkWL.png';
        }

        return msg.author.displayAvatarURL;
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
};