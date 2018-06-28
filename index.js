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
      const image = img.clone().opacity(.2)
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
    .then(image =>
      Jimp.loadFont('./fonts/white_sm.fnt').then(font => {
        image.print(font, 10, 100, 'stats')
        return image
      })
    )
    .then(img =>
      img.getBuffer(Jimp.AUTO, (err, buff) => {
        res.type('jpg').send(buff)
      })
    )
    .catch(console.log)
})
app.listen(process.env.PORT, () =>
  console.log(`live: http://localhost:${process.env.PORT}`)
)

const getSpartan = player =>
  axios.get(`https://www.haloapi.com/profile/h5/profiles/${player}/spartan?95`, { responseType: 'arraybuffer', headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY } })
const getEmblem = player =>
  axios.get(`https://www.haloapi.com/profile/h5/profiles/${player}/emblem?95`, { responseType: 'arraybuffer', headers: { 'Ocp-Apim-Subscription-Key': process.env.PRIMARY_KEY } })
