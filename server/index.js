require('dotenv').config()
const app = require('./app')
const config = require('./src/config/config')

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})