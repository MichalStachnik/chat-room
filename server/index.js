const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const MockData = require('../static/mock-data.json')

// Set routes
app.get('/get-messages', (req, res) => {
  try {
    console.log('in get messages on the server');
    res.send({ message: 'hey', MockData });
  } catch (err) {
    next(err);
  }
});

app.post('/send-message', (req, res) => {
  console.log('hit the server with post request');
  res.sendStatus(200);
});

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
