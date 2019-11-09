const Discord = require('discord.js');

module.exports.run = async(bot, message, args, con) =>{
    
    con.query(`SELECT * FROM userLevels`, (err, results)=>{
        if (err) throw err;

        con.query(`SELECT * FROM userLevels ORDER BY userLevel DESC LIMIT 5`, (err, results)=>{
            console.log(results)
            let sicon = message.guild.iconURL
            let embedLB = new Discord.RichEmbed()
                .setTitle('De Kelder leaderboard')
                .addField('Nummer 1', `Gebruiker: <@${results[0].userID}>`)
                .addField(`Level: ${results[0].userLevel}`, `XP: ${results[0].userXP}`)
                .addField('Nummer 2',  `Gebruiker: <@${results[1].userID}>`)
                .addField(`Level: ${results[1].userLevel}`, `XP: ${results[1].userXP}`)
                .addField('Nummer 3',  `Gebruiker: <@${results[2].userID}>`)
                .addField(`Level: ${results[2].userLevel}`, `XP: ${results[2].userXP}`)
                .addField('Nummer 4',  `Gebruiker: <@${results[3].userID}>`)
                .addField(`Level: ${results[3].userLevel}`, `XP: ${results[3].userXP}`)
                .addField('Nummer 5',  `Gebruiker: <@${results[4].userID}>`)
                .addField(`Level: ${results[4].userLevel}`, `XP: ${results[4].userXP}`)
            message.channel.send(embedLB)
        })



    })
}

module.exports.help = {
    name:'lb'
}