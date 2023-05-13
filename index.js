var express = require('express'); 
require("dotenv").config();
var app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render('index.ejs');
});

const port = process.env.PORT
app.listen(port || 8000, () => {console.log(`server is running on the port ${port}`)})