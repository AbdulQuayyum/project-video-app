const express = require('express')
const app = express()
const port = 8080

app.get('/', (req, res) => res.send('Heyy There!'))
app.listen(port, () => console.log(`Project is running on port ${port}!`))