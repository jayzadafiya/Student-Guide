
const mongoose = require('mongoose')
mongoose.connect("mongodb+srv://zadafiyajay2:umBejKuzBOy0Z0Z1@cluster0.xupwufu.mongodb.net/?retryWrites=true&w=majority");


const db = mongoose.connection;

db.on("error", console.error.bind(console, 'Error connecting to MOngoDB'));

db.once('open', () => {
    console.log('connected to mongoDB');
})

module.exports = db;