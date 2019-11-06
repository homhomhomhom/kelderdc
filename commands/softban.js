const Discord = require('discord.js')
const botconfig = require('../botconfig.json')

module.exports.run = async(bot, message, args)=>{
    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send('Oei, je hebt niet de juiste permissies')

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])

    if(!banMember) return message.channel.send('Wie moet ik bannen')

    let reason = args.slice(1).join(" ")
    if(!reason) reason = "Stoffelo is onze papa"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send('Oei, ik heb hier geen rechten voor')

    if(banMember === banMember){
        message.channel.send('Waarom probeer jij jezelf te softbannen?')
    }else{
        banMember.send(`Je bent uit ${message.guild.name} gekankert. Dit is de opgegeven reden ${reason}`).then(()=>
        message.guild.ban(banMember, {days: 1, reason:reason})).then(()=> message.guild.unban(banMember.id, {reason:"Softban"})).catch(err => console.error(err))
    
        message.channel.send(`**${banMember.user.tag} is eruitgegooit**`)
    
        const embed = new Discord.RichEmbed()
            .setColor(botconfig.red)
            .setAuthor(`${message.guild.name}`, message.guild.iconURL)
            .addField("Softban", "Softban")
            .addField('Verbannen', banMember.user.username)
            .addField('Verbannen door', message.author.username)
            .addField('Reden', reason)
            .addField('Datum', message.createdAt.toLocaleString())
    
        message.channel.send({embed})
    }

  

}

module.exports.help ={
    name:'softban'
}