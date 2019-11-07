const Discord = require('discord.js');

module.exports.run = async(bot, message, args, con) =>{
    con.query(`SELECT * FROM userLevels`, (err, results)=>{
        if (err) throw err;

        con.query(`SELECT * FROM userLevels ORDER BY userLevel DESC LIMIT 5`, (err, results)=>{
            console.log(results)


            let embedLB = new Discord.RichEmbed()
                .setTitle('De Kelder leaderboard')
                .setAuthor("De Kelder")
                .addField(`${results[0].userLevel}`)
                .addField(`${results[1].userLevel}`)
                .addField(`${results[2].userLevel}`)
                .addField(`${results[3].userLevel}`)
                .addField(`${results[4].userLevel}`)
            message.channel.send(embedLB)
        })



    })
}

module.exports.help = {
    name:'lb'
}