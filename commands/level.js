const Discord = require('discord.js')

module.exports.run = async(bot, message, args, con) =>{
    let user;
    if(message.mentions.users.first()){
        user = message.mentions.users.first()
    }else{
        user = message.author
    }
    con.query(`SELECT * FROM userLevels WHERE userID = ${user.id}`, (err, results)=>{
        if(err) throw err;
  
        let lvlembed = new Discord.RichEmbed()
            .setTitle('Level')
            .setAuthor(user.username)
            .setColor("RANDOM")
            .addField('Level', `${results[0].userLevel}`, true)
            .addField("XP", `${results[0].userXP}`, true)
            .setFooter('uwu', user.displayAvatarURL)

        message.channel.send(lvlembed).then(message => {
            message.delete(5000)
        })
    })
}

module.exports.help ={
    name: 'level'
}