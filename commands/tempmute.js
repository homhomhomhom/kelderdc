const Discord = require('discord.js')
const ms = require('ms')
const errors = require('../utils/errors')

module.exports.run = async (bot, message, args)=>{
    if(!message.member.hasPermission("MANAGE_ROLES")) return errors.noPerms(message, "MANAGE_ROLES")
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Wie de kanker is dat?");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Ik kan deze gebruiker niet muten");
    let muterole = message.guild.roles.find(`name`, "Muted");


    let mutetime = args[1]
    if(!mutetime) return message.reply("Hoelang moet de mute duren?")

    await(tomute.addRole(muterole.id))
    message.reply(`<@${tomute.id}> is gemute voor ${ms(ms(mutetime))}`)

    setTimeout(function(){
        tomute.removeRole(muterole.id);
        message.channel.send(`<@${tomute.id}> is succesvol geunmute!`);
    }), ms(mutetime);

}

module.exports.help = {
    name:'tempmute'
}