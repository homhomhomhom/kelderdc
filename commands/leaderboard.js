const Discord = require('discord.js');

module.exports.run = async(bot, message, args, con) =>{
    
    con.query(`SELECT * FROM userLevels`, (err, results)=>{
        if (err) throw err;

        con.query(`SELECT * FROM userLevels ORDER BY userLevel DESC LIMIT 5`, (err, results)=>{
            console.log(results)

            let sicon = message.guild.iconURL
            let embedLB = new Discord.RichEmbed()
                .setTitle('De Kelder leaderboard')
                
                .addField(`Level: ${results[0].userLevel}`, `Gebruiker: <@${results[0].userID}>`)
                .addField(`Level: ${results[1].userLevel}`, `Gebruiker: <@${results[1].userID}>`)
                .addField(`Level: ${results[2].userLevel}`, `Gebruiker: <@${results[2].userID}>`)
                .addField(`Level: ${results[3].userLevel}`, `Gebruiker: <@${results[3].userID}>`)
                .addField(`Level: ${results[4].userLevel}`, `Gebruiker: <@${results[4].userID}>`)
            message.channel.send(embedLB)
        })



    })
}

module.exports.help = {
    name:'lb'
}