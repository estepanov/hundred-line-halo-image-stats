require('dotenv').config()
const express = require('express')
const app = express()
const Jimp = require('jimp')
const axios = require('axios')
const volleyball = require('volleyball')

app.use(volleyball)
app.use(express.static('public'))
app.get('/api/:gamerTag/image.jpg', (req, res) => {
  Jimp.read('./images/halo_bg.jpg')
    .then(img => {
      const image = img.clone().contrast(.2)
      return getSpartan(req.params.gamerTag).then(resp => {
        return Jimp.read(resp.data).then(spartan => {
          return image.composite(spartan.resize(Jimp.AUTO, 250), 300, 40)
        })
      })
    })
    .then(image =>
      getEmblem(req.params.gamerTag).then(resp => {
        return Jimp.read(resp.data).then(emb => {
          return image.composite(emb.resize(Jimp.AUTO, 50), 10, 10)
        })
      })
    )
    .then(image => {
      return Jimp.loadFont('./fonts/header.fnt').then(font => {
        image.print(font, 65, 15, req.params.gamerTag)
        return image
      })
    })
    .then(image =>
      getRecords(req.params.gamerTag).then(resp =>
        Jimp.loadFont('./fonts/white_sm.fnt').then(font => {
          const stats = resp.data.Results[0].Result
          image.print(font, 10, 60, `Arena Stats`)
          image.print(font, 10, 190, `Arena Games`)
          return Jimp.loadFont('./fonts/stats.fnt').then(font => {
            image.print(font, 400, 20, `SR ${stats.SpartanRank}`)
            image.print(font, 400, 35, `${Math.floor(stats.Xp / 1000)}k XP`)
            image.print(font, 10, 85, `${stats.ArenaStats.TotalKills}  Kills`)
            image.print(font, 10, 100, `${stats.ArenaStats.TotalDeaths}  Deaths`)
            image.print(font, 10, 115, `${stats.ArenaStats.TotalAssists}  Assists`)
            image.print(font, 10, 130, `${stats.ArenaStats.TotalHeadshots}  Headshots`)
            image.print(font, 10, 145, `${stats.ArenaStats.TotalMeleeKills}  Melee Kills`)
            image.print(font, 10, 160, `${stats.ArenaStats.TotalAssassinations}  Assassinations`)
            image.print(font, 10, 175, `${stats.ArenaStats.TotalGrenadeKills}  Grenade Kills`)
            image.print(font, 10, 215, `${stats.ArenaStats.TotalGamesCompleted}  Completed`)
            image.print(font, 10, 230, `${stats.ArenaStats.TotalGamesWon}  Wins (${((stats.ArenaStats.TotalGamesWon / stats.ArenaStats.TotalGamesCompleted) * 100).toFixed(2)}%)`)
            image.print(font, 10, 245, `${stats.ArenaStats.TotalGamesLost}  Losses (${((stats.ArenaStats.TotalGamesLost / stats.ArenaStats.TotalGamesCompleted) * 100).toFixed(2)}%)`)
            return image
          })
        })
      )
    )
    .then(img =>
      img.getBuffer(Jimp.AUTO, (err, buff) => {
        res.type('jpg').send(buff)
      })
    )
    .catch(error => {
      console.error(error)
      return res.sendStatus(404).send('Player Not Found')
    })
})
app.listen(process.env.PORT, () => console.log(`Port: ${process.env.PORT}`))

const getSpartan = player =>
  axios.get(
    `https://www.haloapi.com/profile/h5/profiles/${player}/spartan?95`, {
      responseType: 'arraybuffer',
      headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY }
    }
  )
const getEmblem = player =>
  axios.get(`https://www.haloapi.com/profile/h5/profiles/${player}/emblem?95`, {
    responseType: 'arraybuffer',
    headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY }
  })
const getRecords = player =>
  axios.get(`https://www.haloapi.com/stats/h5/servicerecords/arena?players=${player}`,
    { headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY } }
  )
