require('dotenv').config()
const express = require('express')
const app = express()
const Jimp = require('jimp')
const axios = require('axios')
const volleyball = require('volleyball') // dont forget to remove when done

app.use(volleyball)
app.use(express.static('public'))
app.get('/api/', (req, res) => res.send('hello!'))
app.get('/api/:userOne', (req, res) => {
  Jimp.read('./images/halo_bg.jpg')
    .then(img => {
      const image = img.clone().fade(.1)
      return getSpartan(req.params.userOne).then(resp => {
        return Jimp.read(resp.data).then(spartan => {
          return image.composite(spartan.resize(Jimp.AUTO, 250), 300, 40)
        })
      })
    })
    .then(image => getEmblem(req.params.userOne).then(resp => {
      return Jimp.read(resp.data).then(emb => {
        return image.composite(emb.resize(Jimp.AUTO, 50), 10, 10)
      })
    }))
    .then(image => {
      return Jimp.loadFont('./fonts/head_bl.fnt').then(font => {
        image.print(font, 60, 10, req.params.userOne)
        return image
      })
    })
    .then(image => getRecords(req.params.userOne).then(resp => Jimp.loadFont('./fonts/white_sm.fnt').then(font => {
      const stats = resp.data.Results[0].Result.ArenaStats;
      image.print(font, 10, 55, `Arena Stats`)
      return Jimp.loadFont('./fonts/con_sm_wh.fnt').then(font => {
        image.print(font, 10, 80, `${stats.TotalKills}  Kills`)
        image.print(font, 10, 100, `${stats.TotalDeaths}  Deaths`)
        image.print(font, 10, 120, `${stats.TotalAssists}  Assists`)
        image.print(font, 10, 140, `${stats.TotalHeadshots}  Headshots`)
        image.print(font, 10, 160, `${stats.TotalMeleeKills}  Melee Kills`)
        image.print(font, 10, 180, `${stats.TotalAssassinations}  Assassinations`)
        image.print(font, 10, 180, `${stats.TotalGrenadeKills}  Grenade Kills`)

        image.print(font, 180, 80, `${stats.TotalGamesCompleted}  Games Completed`)
        image.print(font, 180, 100, `${stats.TotalGamesWon}  Games Won`)
        image.print(font, 180, 120, `${stats.TotalGamesLost}  Games Lost`)
        image.print(font, 180, 140, `${((stats.TotalGamesWon / stats.TotalGamesCompleted) * 100).toFixed(2)}%  Win Percentage`)
        return image
      })
    })))
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
app.listen(process.env.PORT, () =>
  console.log(`live: http://localhost:${process.env.PORT}`)
)

const getSpartan = player =>
  axios.get(`https://www.haloapi.com/profile/h5/profiles/${player}/spartan?95`, { responseType: 'arraybuffer', headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY } })
const getEmblem = player =>
  axios.get(`https://www.haloapi.com/profile/h5/profiles/${player}/emblem?95`, { responseType: 'arraybuffer', headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY } })
const getRecords = player =>
  axios.get(`https://www.haloapi.com/stats/h5/servicerecords/arena?players=${player}`, { headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY } })
