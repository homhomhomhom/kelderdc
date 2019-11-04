const Discord = require('discord.js')
const superagent = require('superagent')
const errors = require('../utils/errors')
module.exports.run = async (bot, message, args)=>{
    if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return errors.noPerms(message, "MANAGE_ROLES")

    if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("Ik heb geen permissie om deze rollen toe tevoegen")

    let mutee = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!mutee) return message.channel.send("Wie moet ik unmuten?")

    let reason = args.slice(1).join(" ")
    if(!reason) reason= "De kanker die dit heeft uitgevoerd heeft geen reden opgegeven"

    let muterole = message.guild.roles.find(r => r.name === "Muted")
    if(!muterole) return message.channel.send(`Kanker op`)
    if(!mutee.muterole) return message.channel.send('kanker op')
    mutee.removeRole(muterole.id).then(()=>{
        message.channel.send(`${mutee.user.username} is geunmute`)

    })
}


module.exports.help ={
    name:'unmute'
}