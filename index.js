var express = require('express'); 
require("dotenv").config();
var app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

const menu = [
    {
        name: 'Home',
        url: '/'
    },
    {
        name: 'Course',
        url: '/course'
    },
    {
        name: 'Blog',
        url: '/blog'
    },
    {
        name: 'Value proposition',
        url: '/valuepropostion'
    },
    {
        name: 'Team',
        url: '/team'
    },
    {
        name: 'About',
        url: '/about'
    },
    {
        name: 'Contact',
        url: '/contact'
    }
]


app.get('/', function(req, res){
    res.render('index.ejs', {menu:menu, url:req.url});
});

app.get('/course', function(req, res){
    res.render('course.ejs', {menu:menu, url:req.url});
});

app.get('/blog', function(req, res){
    res.render('blog.ejs', {menu:menu, url:req.url});
});

app.get('/valuepropostion', function(req, res){
    res.render('valueProp.ejs', {menu:menu, url:req.url});
});

app.get('/team', function(req, res){
    res.render('team.ejs', {menu:menu, url:req.url});
});

app.get('/about', function(req, res){
    res.render('about.ejs', {menu:menu, url:req.url});
});

app.get('/contact', function(req, res){
    res.render('contact.ejs', {menu:menu, url:req.url});
});


const port = process.env.PORT
app.listen(port || 8000, () => {console.log(`server is running on the port ${port}`)})