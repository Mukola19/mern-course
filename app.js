require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require("path");

const app = express()
const PORT = process.env.APP_PORT || 5000

app.use(express.json({extended: true}))

// app.use(express.static(__dirname + '/client/build'));

app.use('/api/auth', require('./routes/auth.routes.js'))
app.use('/api/link', require('./routes/links.routes.js'))
app.use('/t', require('./routes/redirect.routes.js'))


if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname, 'client', 'build', 'index.html'))
    })

}


async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex:true
        })

        app.listen(PORT, () => console.log(`App has ben started on ${PORT}...`))

    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()



