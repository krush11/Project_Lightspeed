const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/innovate_dev', { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true 
});
mongoose.set('useFindAndModify', false);
const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;
