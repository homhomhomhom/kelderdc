const Discord = require('discord.js')
const botconfig = require('../botconfig.json')

module.exports.run = async(bot, message, args)=>{
    let Leden = message.guild.roles.find(r => r.name === "Leden")
    const guildMember = message.member
    if(message.content === botconfig.prefix + "verifieer"){
        guildMember.addRole(Leden).catch(console.error)
    }
}

module.exports.help ={
    name:'verifieer'
}