const Discord = require("discord.js")
const fs = require("fs")
const bot = new Discord.Client()
const tokenfile = require('./token.json')
const botconfig = require('./botconfig.json')
let cooldown = new Set();
let cdseconds = 5;
let prefix = botconfig.prefix
const ytdl = require('ytdl-core')
const queue = new Map()
bot.commands = new Discord.Collection()
fs.readdir("./commands/", (err, files) => {
    if (err) console.log(err);
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        console.log("Couldn't find commands.")
        return
    }

    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`)
        console.log(`${f} loaded!`)
        bot.commands.set(props.help.name, props)
    })
})


bot.on('ready', async () => {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} servers`)
    bot.user.setActivity("Over de Kelder. || V0.8", {
        type: "WATCHING"
    })
})

bot.on('error', console.error);

bot.on('message', async message => {
    if (message.author.bot) return;
    if (message.channel.type === 'dm') return
    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"))
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: botconfig.prefix
        }
    }
    let prefix = prefixes[message.guild.id].prefixes
    if (!message.content.startsWith(prefix)) return
    if (cooldown.has(message.author.id)) {
        message.delete()
        return message.reply("Je moet 5 seconden wachten voordat ik weer zin heb")
    }

    if (!message.member.hasPermission("ADMINISTRATOR")) {
        cooldown.add(message.author.id)
    }


    let messageArray = message.content.split(" ")
    let cmd = messageArray[0]
    let args = messageArray.slice(1)

    let commandfile = bot.commands.get(cmd.slice(prefix.length))
    if (commandfile) commandfile.run(bot, message, args)

    setTimeout(() => {
        cooldown.delete(message.author.id)
    }, cdseconds * 1000)


})


bot.on('guildMemberAdd', (member, guild) => {
    const channel = member.guild.channels.find(ch => ch.name == 'nieuwelingen');
    if (!channel) return;
    channel.send(`Hey ${member}, welkom in **De Kelder** 😳`);
})


bot.on('guildMemberRemove', (member, guild) => {
    const channel = member.guild.channels.find(ch => ch.name === 'nieuwelingen');
    if (!channel) return;
    channel.send(`Oei, daar gaat **${member}** 😔`);
})

//aankodiging

bot.on("message", message => {
    if (message.author.bot) return
    let messageArray = message.content.split(" ")
    let command = messageArray[0]
    let args = messageArray.slice(1)

    if (message.channel.type === "dm") return

    if (!message.content.startsWith(botconfig.prefix)) return

    if (command === botconfig.prefix + 'announce') {
        let channel = message.guild.channels.get("609482938651901955")
        let announcement = args.slice(0).join(" ")
        channel.send(announcement)
    }
})

bot.on("message", message => {
    const channelV = bot.channels.find(ch => ch.name === 'verificatie')
    if (message.author.bot) return
    if (message.channel.type === 'dm') return
    if (message.channel == (channelV)) {
        message.delete(1000)
    }
})

// bot.on('message', async message => {
// 	if (message.author.bot) return;
// 	if (!message.content.startsWith(prefix)) return;

// 	const serverQueue = queue.get(message.guild.id);

// 	if (message.content.startsWith(`${prefix}play`)) {
// 		execute(message, serverQueue);
// 		return;
// 	} else if (message.content.startsWith(`${prefix}skip`)) {
// 		skip(message, serverQueue);
// 		return;
// 	} else if (message.content.startsWith(`${prefix}stop`)) {
// 		stop(message, serverQueue);
// 		return;
// 	} else {
// 		message.channel.send('Wat de kanker was dat')
// 	}
// });

// async function execute(message, serverQueue) {
// 	const args = message.content.split(' ');

// 	const voiceChannel = message.member.voiceChannel;
// 	if (!voiceChannel) return message.channel.send('Je moet in een kanaal zitten!');
// 	const permissions = voiceChannel.permissionsFor(message.client.user);
// 	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
// 		return message.channel.send('Ik heb toestemming nodig om de vc te joinen!');
// 	}

// 	const songInfo = await ytdl.getInfo(args[1]);
// 	const song = {
// 		title: songInfo.title,
// 		url: songInfo.video_url,
// 	};

// 	if (!serverQueue) {
// 		const queueContruct = {
// 			textChannel: message.channel,
// 			voiceChannel: voiceChannel,
// 			connection: null,
// 			songs: [],
// 			volume: 5,
// 			playing: true,
// 		};

// 		queue.set(message.guild.id, queueContruct);

// 		queueContruct.songs.push(song);

// 		try {
// 			var connection = await voiceChannel.join();
// 			queueContruct.connection = connection;
// 			play(message.guild, queueContruct.songs[0]);
// 		} catch (err) {
// 			console.log(err);
// 			queue.delete(message.guild.id);
// 			return message.channel.send(err);
// 		}
// 	} else {
// 		serverQueue.songs.push(song);
// 		console.log(serverQueue.songs);
// 		return message.channel.send(`${song.title} is toegevoegd aan de wachtrij`);
// 	}

// }

// function skip(message, serverQueue) {
// 	if (!message.member.voiceChannel) return message.channel.send('Je moet in een voice kanaal zitten om muziek te stoppen');
// 	if (!serverQueue) return message.channel.send('Er is geen liedje dat ik kan skippen');
// 	serverQueue.connection.dispatcher.end();
// }

// function stop(message, serverQueue) {
// 	if (!message.member.voiceChannel) return message.channel.send('Je moet in een voice kanaal zitten om muziek te stoppen ')
// 	serverQueue.songs = [];
// 	serverQueue.connection.dispatcher.end();
// }

// function play(guild, song) {
// 	const serverQueue = queue.get(guild.id);

// 	if (!song) {
// 		serverQueue.voiceChannel.leave();
// 		queue.delete(guild.id);
// 		return;
// 	}

// 	const dispatcher = serverQueue.connection.playStream(ytdl(song.url))
// 		.on('end', () => {
// 			console.log('Music ended!');
// 			serverQueue.songs.shift();
// 			play(guild, serverQueue.songs[0]);
// 		})
// 		.on('error', error => {
// 			console.error(error);
// 		});
// 	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
// }


//starboard


bot.login(tokenfile.token)