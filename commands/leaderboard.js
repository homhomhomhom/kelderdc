const Discord = require('discord.js');

module.exports.run = async(bot, message, args, con) =>{
    
    con.query(`SELECT * FROM userLevels`, (err, results)=>{
        if (err) throw err;

        con.query(`SELECT * FROM userLevels ORDER BY userLevel DESC LIMIT 5`, (err, results)=>{
            console.log(results)

            let sicon = message.guild.iconURL
            let embedLB = new Discord.RichEmbed()
                .setTitle('De Kelder leaderboard')
                .setAuthor("De Kelder")
                .setThumbnail(sicon)
                .addField(`#1: Level ${results[0].userLevel}`, `User: <@${results[0].userID}>`)
                .addField(`#2: Level ${results[1].userLevel}`, `User: <@${results[1].userID}>`)
                .addField(`#3: Level ${results[2].userLevel}`, `User: <@${results[2].userID}>`)
                .addField(`#4: Level ${results[3].userLevel}`, `User: <@${results[3].userID}>`)
                .addField(`#5: Level ${results[4].userLevel}`, `User: <@${results[4].userID}>`)
            message.channel.send(embedLB)
        })



    })
}

module.exports.help = {
    name:'lb'
}