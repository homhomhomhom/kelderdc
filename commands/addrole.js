const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("MANAGE_ROLES"))
    return errors.noPerms(message, "MANAGE_ROLES");
  if (args[0] == "help") {
    message.reply("Usage: !addrole <user> <role>");
    return;
  }
  let rMember =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  if (!rMember) return errors.cantfindUser(message.channel);
  let role = args.join(" ").slice(22);
  if (!role) return message.reply("Welke rol?");
  let gRole = message.guild.roles.find(`name`, role);
  if (!gRole) return message.reply("Dat bestaat niet, pik.");

  if (rMember.roles.has(gRole.id))
    return message.reply("Ze hebben die rol al.");
  await rMember.addRole(gRole.id);

  try {
    await rMember.send(
      `Sorry voor de DM, maar mijn baas heeft mij gestuurd om te zeggen dat je de role ${gRole.name} hebt ontvangen.`
    );
  } catch (e) {
    console.log(e.stack);
    message.channel.send(`Gegroet, <@${rMember.id}>. Je hebt ${gRole.name} gekregen`)
  }
};

module.exports.help = {
  name: "addrole"
};
