require('dotenv').config()
require('./config/db')

const app = require('./app');

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Your server is running on port: ${PORT}`)
})