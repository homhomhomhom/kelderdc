const Discord = require('discord.js');

module.exports.run = async(bot, message, args, con)=>{
    let user;
    if(message.mentions.users.first()){
        user = message.mentions.users.first()
    }else{
        user = message.author
    }

    con.query(`SELECT * FROM userLevels WHERE userID=${user.id}`, (err,results) =>{
        if(err) throw err;
        con.query(`DELETE FROM userLevels WHERE userID=${user.id}`, (err, results)=>{
            if(err) throw err;

            message.channel.send("oke")
            console.log("Successfully deleted level")
        })
    })
}

module.exports.help = {
    name:'lvldel'
}