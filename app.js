const express = require('express'); 
const port = 8000;
const app = express();

app.use(express.static('./assets'));    
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(port, function (err) {
    if (err) {
        console.log(`Error found on port ${port}: \n ${err}`);
        return;
    }
    console.log('Server up and running on port:', port);
});
