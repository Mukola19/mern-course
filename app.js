const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const PORT = config.get('port') || 5000

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/link', require('./routes/links.routes.js'))
app.use('/t', require('./routes/redirect.routes.js'))

async function start() {
    try {
      await mongoose.connect(config.get('mongoURL'), {
            useNewUrlParser:true, 
            useUnifiedTopology:true, 
            // useCreateIndex:true
      })


      app.listen(PORT, () => console.log(`App has ben started on ${PORT}...`))
        
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}






start()



