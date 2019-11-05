const errors = require('../utils/errors.js')

module.exports.run = async (bot, message, args)=>{
    if(!message.author.hasPermission["MANAGE_MESSAGES"])return errors.noPerms(message, "MANAGE_MESSAGES")

    message.delete()
    let botmessage= args.join(" ")
    message.channel.send(botmessage)


}

module.exports.help ={
    name: "say"
}