const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client();
const botconfig = require("./botconfig.json");
let cooldown = new Set();
let cdseconds = 5;
let prefix = botconfig.prefix;
var servers = {};
let xp = require("./xp.json");
const tokenfile = require("./token.json");
bot.commands = new Discord.Collection();
fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  } 

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers`);
  bot.user.setActivity("Bente douche. || V1.5", {
    type: "WATCHING"
  });
});

bot.on("error", console.error);

bot.on("message", async message => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;
  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if (!prefixes[message.guild.id]) {
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if (!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }
  user = message.author
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp = curxp + xpAdd;
  if (nxtLvl <= xp[message.author.id].xp) {
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
      .setThumbnail(user.avatarURL)
      .setAuthor(user.username)
      .setTitle("Leveltje omhoog!")
      .setColor("RANDOM")
      .addField("Nieuw leveltje", curlvl + 1)
    
    if(message.channel == channelK) return;
    if(message.channel == channelV) return;
    message.channel.send(lvlup)



    //lvl up roles

    if(xp[message.author.id].level === 10){
        const member = message.member;
        const roleLvlTen = message.guild.roles.find(r => r.name ==='Kelder Vrienden')
        member.addRole(roleLvlTen)
    }


    if(xp[message.author.id].level === 20){
      const member = message.member;
      const roleLvlTwenty = message.guild.roles.find(r=> r.name ==='Kelder Makker')

      member.roleAdd(roleLvlTwenty)
    }

    if(xp[message.author.id].level === 30){
      const member = message.member
      const roleLvlThirty = message.guild.roles.find(r => r.name === 'Kelder Held')
      
      member.roleAdd(roleLvlThirty)
    }
    
    
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), err => {
    if (err) console.log(err);
  });

  let prefix = prefixes[message.guild.id].prefixes;
  if (!message.content.startsWith(prefix)) return;
  if (cooldown.has(message.author.id)) {
    message.delete();
    return message.reply("Je moet 5 seconden wachten voordat ik weer zin heb");
  }

  if (!message.member.hasPermission("ADMINISTRATOR")) {
    cooldown.add(message.author.id);
  }

  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if (commandfile) commandfile.run(bot, message, args);

  setTimeout(() => {
    cooldown.delete(message.author.id);
  }, cdseconds * 1000)
});

bot.on("guildMemberAdd", (member, guild) => {
  const channel = member.guild.channels.find(ch => ch.name == "nieuwelingen");
  if (!channel) return;
  channel.send(`Hey ${member}, welkom in **De Kelder** 😳`);
});

bot.on("guildMemberRemove", (member, guild) => {
  const channel = member.guild.channels.find(ch => ch.name === "nieuwelingen");
  if (!channel) return;
  channel.send(`Oei, daar gaat **${member}** 😔`);
});

bot.on("message", message => {
  if(message.author.bot) return;
  const channelV = bot.channels.find(ch => ch.id === "641198118943195136");
  if (message.channel == channelV) {
    message.delete(1000);
  }
});

bot.on("message", message => {
  if (message.content === botconfig.prefix + "clear") {
    if (message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.fetchMessages().then(
        function(list) {
          message.channel.bulkDelete(list);
        },
        function(err) {
          message.channel.send("Niet gelukt");
        }
      );
    }
  }
});

//color

bot.on("message", message => {
  let args = message.content.substring(botconfig.prefix.length).split(" ");
  switch (args[0]) {
    case "Groen".toLowerCase():
      let groen = message.guild.roles.find(r => r.name === "Groen");
      const memberG = message.member;
      memberG.addRole(groen).catch(console.error);
    break;
    case "Paars".toLowerCase():
      let paars = message.guild.roles.find(r => r.name === "Paars");
      const memberP = message.member;
      memberP.addRole(paars).catch(console.error);
      break;
    case "Roze".toLowerCase():
      let roze = message.guild.roles.find(r => r.name === "Roze");
      const memberR = message.member;
      memberR.addRole(roze).catch(console.error);
    break;
    case "Blauw".toLowerCase():
      let blauw = message.guild.roles.find(r => r.name === "Blauw");
      const memberB = message.member;
      memberB.addRole(blauw).catch(console.error);
      break;
    case "Rood".toLowerCase():
      let rood = message.guild.roles.find(r => r.name === "Rood");
      const memberRO = message.member;
      memberRO.addRole(rood).catch(console.error);
      break;
    case "Zwart".toLowerCase():
      let zwart = message.guild.roles.find(r => r.name === "Zwart");
      const memberZ = message.member;
      memberZ.addRole(zwart).catch(console.error);
    break;
    case "Geel".toLowerCase():
      let geel = message.guild.roles.find(r => r.name === 'Geel');
      const memberg = message.member;
      memberg.addRole(geel).catch(console.error)
  }
});

//remove color

bot.on("message", message => {
  let args = message.content.substring(botconfig.prefix.length).split(" ");
  let member = message.member;
  switch (args[0]) {
    case "Groen".toLowerCase():
      if (member.roles.find(r => r.name === "Groen")) {
        let groen = message.guild.roles.find(r => r.name === "Groen");
        const memberG = message.member;
        memberG.removeRole(groen).catch(console.error);
      } else {
        return;
      }
      break;
    case "Paars".toLowerCase():
      if (member.roles.find(r => r.name === "Paars")) {
        let paars = message.guild.roles.find(r => r.name === "Paars");
        const memberP = message.member;
        memberP.removeRole(paars).catch(console.error);
      } else {
        return;
      }
      break;
    case "Roze".toLowerCase():
      if (member.roles.find(r => r.name === "Roze")) {
        let roze = message.guild.roles.find(r => r.name === "Roze");
        const memberR = message.member;
        memberR.removeRole(roze).catch(console.error);
      } else {
        return;
      }
      break;
    case "Blauw".toLowerCase():
      if (member.roles.find(r => r.name === "Blauw")) {
        let blauw = message.guild.roles.find(r => r.name === "Blauw");
        const memberB = message.member;
        memberB.removeRole(blauw).catch(console.error);
      } else {
        return;
      }
    case "Rood".toLowerCase():
      if (member.roles.find(r => r.name === "Rood")) {
        let rood = message.guild.roles.find(r => r.name === "Rood");
        const memberRO = message.member;
        memberRO.removeRole(rood).catch(console.error);
      } else {
        return;
      }
    case "Zwart".toLowerCase():
      if (member.roles.find(r => r.name === "Zwart")) {
        let zwart = message.guild.roles.find(r => r.name === "Zwart");
        const memberZ = message.member;
        memberZ.removeRole(zwart).catch(console.error);
      }
      break;
    case 'Geel'.toLowerCase():
      if(member.roles.find(r=> r.name === 'Geel')){
        let geel = message.guild.roles.find(r => r.name === 'Geel');
        const memberg = message.member;
        memberg.removeRole(geel).catch(console.error)
      }
  }
});

bot.on("message", message => {
  const channelK = bot.channels.find(ch => ch.id === "641245817692225556");
  if (message.author.bot) return;
  if (message.channel === channelK) {
    message.delete(5000);
  } else {
    return;
  }
});


bot.on("message", message=>{
  if(message.author.bot) return
  if(message.content === 'oopsie'){
    message.channel.send('Oei')
  }
})




bot.login(tokenfile.token || process.env.TOKEN);