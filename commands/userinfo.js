const Discord = require('discord.js')
const moment = require('moment')
let xp = require('../xp.json')
module.exports.run = async(bot, message, args)=>{
    let user 
    if(message.mentions.users.first()){
        user = message.mentions.users.first()
    }else{
        user = message.author
    }   

    const member = message.guild.member(user)

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;

    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setThumbnail(message.author.avatarURL)
        .setTitle(`${user.username} # ${user.discriminator}`)
        .addField("Bijnaam :", `${member.nickname !== null ? `${member.nickname}` : "Geen bijnaam"} `, true)
        .addField("Gemaakt op :", `${moment.utc(member.joinedAt).format("DD/MM/YYYY, HH:mm:ss")}`, true)
        .addField('Bot :', `${user.bot}`, true)
        .addField("Status :", `${user.presence.status}`, true)
        .addField("Game :", `${user.presence.game ? user.presence.game.name : "Geen game"}`, true)
        .addField('Huidig level :', curlvl + ' ' + '('+curxp+ ' ' +'xp' +')')
        .addField("Rollen :", member.roles.map(roles => `${roles.name}`).join(', '),true)
        message.channel.send({embed})
}

module.exports.help ={
    name:"userinfo"
}