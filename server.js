const express = require('express')
const mongoose = require('mongoose')
const Song = require('./models/song.js')
const app = express()

mongoose.connect('mongodb://localhost/songRecorder', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/songs', async (req, res) => {
  const song = new Song({
    notes: req.body.songNotes
  })

  await song.save()

  res.json(song)
})

app.get('/songs/:id', async (req, res) => {
  let song
  try {
    song = await Song.findById(req.params.id)
  } catch (e) {
    song = undefined
  }
  res.render('index', { song: song })
})

app.listen(5000)