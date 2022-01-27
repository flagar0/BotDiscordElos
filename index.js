const Discord = require("discord.js");
const config = require("./config.json");
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { exit } = require("process");

const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES
    ]
});

const prefix = "++";

client.on('ready', () => {
  console.log("Estou Vivo");  
});

client.on("message", async function(message) {
  
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  var commandBody = message.content.slice(prefix.length);
  var args = commandBody.split(' ');
  var command = args.shift().toLowerCase();

//////////////////////////////////////////////////////////////////bastos
  if (command === "bastos" && args[0] != null) {
    let id = await pegaID('Rei%20dos%20reboco%200');
    if(args[0].toLowerCase() ==="solo"){
      var flex = false;
    } else if (args[0].toLowerCase() ==="flex"){
      var flex = true;
    }else{ return;}
    let elos = await pegaElo(id,flex);
    console.log(elos);
    let img = pegaFoto(elos);


    if(elos.miniSeries !=null){
      var pro = elos.miniSeries.progress.replace(/L/g, 'X');
      var md5 = pro.replace(/W/g, 'V');
      var md52 = md5.replace(/N/g, '-')
      var Tabela = new MessageEmbed()
      .setColor('#009911')
      .setTitle(elos.summonerName)
      .setDescription(elos.tier + ' ' + elos.rank)
      .addField('Vitorias / Derrotas', (elos.wins +' / '+ elos.losses), true)
      .addField('Total', ((elos.wins+elos.losses).toString()), true)
      .addField('Pontos', elos.leaguePoints.toString(), true)
      .setImage(img)
      .setFooter({ text: 'MD5: '+ md52})

    }else{
      var Tabela = new MessageEmbed()
      .setColor('#009911')
      .setTitle(elos.summonerName)
      .setDescription(elos.tier + ' ' + elos.rank)
      .addField('Vitorias / Derrotas', (elos.wins +' / '+ elos.losses), true)
      .addField('Total', ((elos.wins+elos.losses).toString()), true)
      .addField('Pontos', elos.leaguePoints.toString(), true)
      .setImage(img)
    
    }
    message.reply({ embeds: [Tabela] });
  } 

///////////////////////////////////////////////////////////////////////////////todos
if (command === "flex" && args[0] != null) {
  let nick = ArrumaNick(args);
  let id = await pegaID(nick);
  if(id =="bug"){message.reply("Jogador nao encontrado"); return;}
  let elos = await pegaElo(id,true);
  
  console.log(elos);
  let img = pegaFoto(elos);


  if(elos.miniSeries !=null){
    var pro = elos.miniSeries.progress.replace(/L/g, 'X');
    var md5 = pro.replace(/W/g, 'V');
    var md52 = md5.replace(/N/g, '-')
    var Tabela = new MessageEmbed()
    .setColor('#009911')
    .setTitle(elos.summonerName)
    .setDescription(elos.tier + ' ' + elos.rank)
    .addField('Vitorias / Derrotas', (elos.wins +' / '+ elos.losses), true)
    .addField('Total', ((elos.wins+elos.losses).toString()), true)
    .addField('Pontos', elos.leaguePoints.toString(), true)
    .setImage(img)
    .setFooter({ text: 'MD5: '+ md52})

  }else{
    var Tabela = new MessageEmbed()
    .setColor('#009911')
    .setTitle(elos.summonerName)
    .setDescription(elos.tier + ' ' + elos.rank)
    .addField('Vitorias / Derrotas', (elos.wins +' / '+ elos.losses), true)
    .addField('Total', ((elos.wins+elos.losses).toString()), true)
    .addField('Pontos', elos.leaguePoints.toString(), true)
    .setImage(img)
  
  }
  message.reply({ embeds: [Tabela] });
} 

if (command === "solo" && args[0] != null) {
  let nick = ArrumaNick(args);
  let id = await pegaID(nick);
  if(id =="bug"){message.reply("Jogador nao encontrado"); return;}
  let elos = await pegaElo(id,false);
  
  console.log(elos);
  let img = pegaFoto(elos);


  if(elos.miniSeries !=null){
    var pro = elos.miniSeries.progress.replace(/L/g, 'X');
    var md5 = pro.replace(/W/g, 'V');
    var md52 = md5.replace(/N/g, '-')
    var Tabela = new MessageEmbed()
    .setColor('#009911')
    .setTitle(elos.summonerName)
    .setDescription(elos.tier + ' ' + elos.rank)
    .addField('Vitorias / Derrotas', (elos.wins +' / '+ elos.losses), true)
    .addField('Total', ((elos.wins+elos.losses).toString()), true)
    .addField('Pontos', elos.leaguePoints.toString(), true)
    .setImage(img)
    .setFooter({ text: 'MD5: '+ md52})

  }else{
    var Tabela = new MessageEmbed()
    .setColor('#009911')
    .setTitle(elos.summonerName)
    .setDescription(elos.tier + ' ' + elos.rank)
    .addField('Vitorias / Derrotas', (elos.wins +' / '+ elos.losses), true)
    .addField('Total', ((elos.wins+elos.losses).toString()), true)
    .addField('Pontos', elos.leaguePoints.toString(), true)
    .setImage(img)
  
  }
  message.reply({ embeds: [Tabela] });
} 
///////////////////////////////////////////////////////////////////////////////todos
});




async function pegaID(nome){
  var dados;
      let response = await axios.get('https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+nome+'?api_key='+config.API_TOKEN)
      .then(function (response) {
        dados = response.data.id
      })
      .catch(function (error) {
        dados = "bug"
        console.log(error);
      })  
      
      return dados
}

async function pegaElo(id,flex){
  //false = solo duo
  //true = flex
  
  let response = await axios.get('https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/'+id+'?api_key='+config.API_TOKEN)
  let dados = response.data
  if(flex == false && dados[0].queueType === "RANKED_SOLO_5x5"){
    return dados[0];
  } else if(flex == false && dados[1].queueType === "RANKED_SOLO_5x5"){
    return dados[1];
  }

  if(flex == true && dados[0].queueType === "RANKED_FLEX_SR"){
    return dados[0];
  } else if(flex == true && dados[1].queueType === "RANKED_FLEX_SR"){
    return dados[1];
  }
}

function pegaFoto(dados){
let rank = dados.tier;
let pos = dados.rank;

switch (rank){

    case 'IRON':
    switch(pos){
      case 'IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Iron_4.png/revision/latest/scale-to-width-down/112?cb=20181229234928';
    break;
    case 'III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/95/Season_2019_-_Iron_3.png/revision/latest/scale-to-width-down/112?cb=20181229234927';
    break;
    case 'II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Iron_2.png/revision/latest/scale-to-width-down/112?cb=20181229234927';
    break;
    case 'I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/0/03/Season_2019_-_Iron_1.png/revision/latest/scale-to-width-down/112?cb=20181229234926';
    break;
    }
    break;

    case 'BRONZE':
switch(pos){
      case 'IV':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/5a/Season_2019_-_Bronze_4.png/revision/latest/scale-to-width-down/112?cb=20181229234913';
    break;
    case 'III':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/81/Season_2019_-_Bronze_3.png/revision/latest/scale-to-width-down/112?cb=20181229234912';
    break;
    case 'II':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Bronze_2.png/revision/latest/scale-to-width-down/112?cb=20181229234911';
    break;
    case 'I':
      return 'https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png/revision/latest/scale-to-width-down/112?cb=20181229234910';
    break;
    }
    break;
    
    case 'SILVER':
      switch(pos){
        case 'IV':
          return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/52/Season_2019_-_Silver_4.png/revision/latest/scale-to-width-down/112?cb=20181229234938';
      break;
      case 'III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/1/19/Season_2019_-_Silver_3.png/revision/latest/scale-to-width-down/112?cb=20181229234937';
      break;
      case 'II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/5/56/Season_2019_-_Silver_2.png/revision/latest/scale-to-width-down/112?cb=20181229234936';
      break;
      case 'I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png/revision/latest/scale-to-width-down/112?cb=20181229234936';
      break;
      }
    break;

    case 'GOLD':
      switch(pos){
        case 'IV':
          return 'https://static.wikia.nocookie.net/leagueoflegends/images/c/cc/Season_2019_-_Gold_4.png/revision/latest/scale-to-width-down/112?cb=20181229234922';
      break;
      case 'III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a6/Season_2019_-_Gold_3.png/revision/latest/scale-to-width-down/112?cb=20181229234921';
      break;
      case 'II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/8/8a/Season_2019_-_Gold_2.png/revision/latest/scale-to-width-down/112?cb=20181229234921';
      break;
      case 'I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png/revision/latest/scale-to-width-down/112?cb=20181229234920';
      break;
      }
    break;

    case 'PLATINUM':
      switch(pos){
        case 'IV':
          return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/ac/Season_2019_-_Platinum_4.png/revision/latest/scale-to-width-down/112?cb=20181229234934';
      break;
      case 'III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/2/2b/Season_2019_-_Platinum_3.png/revision/latest/scale-to-width-down/112?cb=20181229234934';
      break;
      case 'II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/a/a3/Season_2019_-_Platinum_2.png/revision/latest/scale-to-width-down/112?cb=20181229234933';
      break;
      case 'I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png/revision/latest/scale-to-width-down/112?cb=20181229234932';
      break;
      }
    break;

    case 'DIAMOND':
      switch(pos){
        case 'IV':
          return 'https://static.wikia.nocookie.net/leagueoflegends/images/e/ec/Season_2019_-_Diamond_4.png/revision/latest/scale-to-width-down/112?cb=20181229234919';
      break;
      case 'III':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/d/dc/Season_2019_-_Diamond_3.png/revision/latest/scale-to-width-down/112?cb=20181229234918';
      break;
      case 'II':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Diamond_2.png/revision/latest/scale-to-width-down/112?cb=20181229234918';
      break;
      case 'I':
        return 'https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png/revision/latest/scale-to-width-down/112?cb=20181229234917';
      break;
      }
    break;
    
    default:
      return 'https://friendlystock.com/wp-content/uploads/2020/03/5-broken-computer-exploding-cartoon-clipart.jpg';
}}

function ArrumaNick(nick){
  var nome = nick[0];
  if(nick[1]==null){
    return nome;
  }else{

    for (let i = 1; i < nick.length; i++) {
       nome = nome +"%20"+nick[i];
  }
  return nome;
}}

client.login(config.BOT_TOKEN);
