const Discord = require('discord.js')
module.exports.run = async (bot, message, args)=>{
    const embed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setFooter('werk')
        .setDescription(args.join('Rollen uwu'))
        .setTitle('Rolemenu')

        let msg = await message.channel.send(embed)

        await msg.react('👍')
        await msg.react('')
}

module.exports.help ={
    name:'rolmenu'
}