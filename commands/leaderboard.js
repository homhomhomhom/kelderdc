const Discord = require('discord.js');

module.exports.run = async(bot, message, args, con) =>{
    con.query(`SELECT * FROM userLevels`, (err, results)=>{
        if (err) throw err;

        con.query(`SELECT * FROM userLevels ORDER BY userLevel DESC LIMIT 5`, (err, results)=>{
            console.log(results)


            let embedLB = new Discord.RichEmbed()
                .setTitle('De Kelder leaderboard')
                .setAuthor("De Kelder")
                .addField(`${results[0].userLevel}`, `<@${results[0].userID}>`)
                .addField(`${results[1].userLevel}`, `<@${results[1].userID}>`)
                .addField(`${results[2].userLevel}`, `<@${results[2].userID}>`)
                .addField(`${results[3].userLevel}`, `<@${results[3].userID}>`)
                .addField(`${results[4].userLevel}`, `<@${results[4].userID}>`)
            message.channel.send(embedLB)
        })



    })
}

module.exports.help = {
    name:'lb'
}