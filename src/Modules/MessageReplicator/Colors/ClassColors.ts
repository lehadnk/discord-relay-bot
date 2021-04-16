import {DiscordMessage} from "nergal";

export class ClassColors {
    private classColors = {
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
    }

    private moderServerColors = {
        'Priest': this.classColors.priest,
        'Druid': this.classColors.druid,
        'Warrior': this.classColors.warrior,
        'Demon Hunter': this.classColors.dh,
        'Hunter': this.classColors.hunter,
        'Warlock': this.classColors.warlock,
        'Death Knight': this.classColors.dk,
        'Mage': this.classColors.mage,
        'Rogue': this.classColors.rogue,
        'Classic': this.classColors.classic,
        'Paladin': this.classColors.paladin,
    }

    private serverColors = {
        '296690626244902913': this.classColors.druid, // test server

        '207912188407578624': this.classColors.priest,
        '215548192891076610': this.classColors.dh,
        '736173202979422271': this.classColors.dh,
        '217529023838814208': this.classColors.rogue,
        '452908426276634634': this.classColors.dk,
        '203632333620772874': this.classColors.druid,
        '215427955193544704': this.classColors.hunter,
        '210643527472906241': this.classColors.paladin,
        '214750173413376003': this.classColors.shaman,
        '212664465181769728': this.classColors.mage,
        '217529170291458048': this.classColors.warlock,
        '217528830418616322': this.classColors.warrior,
        '217529277489479681': this.classColors.monk,
        '415846451193839617': this.classColors.classic,
    }

    private personalColors = {
        '212541475928408064': this.classColors.warrior // rylaiko
    }

    private getCrossmoderColor(msg) {
        Object.entries(this.moderServerColors).forEach(([role, color]) => {
            if (msg.author.roles.find(r => r.name === role)) {
                return color;
            }
        });

        return this.classColors.default;
    }

    getClassColor(msg: DiscordMessage): string
    {
        if (msg.serverId === '474036493061718016') {
            return this.getCrossmoderColor(msg)
        }

        if (this.personalColors[msg.authorId]) {
            return this.personalColors[msg.authorId]
        }

        if (this.serverColors[msg.serverId]) {
            return this.serverColors[msg.serverId]
        }

        return this.classColors.default
    }
}