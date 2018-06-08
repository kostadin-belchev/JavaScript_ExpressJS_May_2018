const express = require('express')

let app = express()
const port = 1337

app.get('/', (req, res) => {
  res.send('Hello from express!')
})

app.listen(port, () => console.log(`Listening on port ${port}`))
