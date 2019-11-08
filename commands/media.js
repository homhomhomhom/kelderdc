const Discord = require('discord.js')
let errors = require('../utils/errors')
module.exports.run = async(bot, message, args, con)=>{
    if(!message.member.hasPermissions(["MANAGE_ROLES"])) return errors.noPerms(message, 'MANAGE_ROLES');


    let roleM = message.guild.roles.find(r => r.name ==='Media');

    let user = message.mentions.users.first();

    user.addRole(roleM)
}


module.exports.help = {
    name: 'media'
}