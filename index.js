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

const courses = [
    {
        subject:"general_studies",
        thumbnail:"course_1.png",
        number_of_lessons:"120",
        about_course:"Studying diverse art, modern &world history, post-Independence India, world & Indian geography, and Indian society's culture and structure.",
        tutor:"Samriti talk",
        prev_institude:"Drishti IAS",
        student_enrolled:"160",
        rating:"5"
    },
    {
        subject:"general_studies",
        thumbnail:"course_2.png",
        number_of_lessons:"120",
        about_course:"Studying government, law, decision-making, equality, rights, fairness, global interactions, relationships, politics.",
        tutor:"Salman Hyder",
        prev_institude:"Drishti IAS",
        student_enrolled:"160",
        rating:"5"
    },
    {
        subject:"general_studies",
        thumbnail:"course_3.png",
        number_of_lessons:"120",
        about_course:"Exploring economic growth, agriculture, science, environment, security, and disaster management to promote sustainable development and safety.",
        tutor:"Ananta Shroff",
        prev_institude:"Edukemy IAS",
        student_enrolled:"200",
        rating:"5"
    },
    {
        subject:"general_studies",
        thumbnail:"course_1.png",
        number_of_lessons:"120",
        about_course:"Examining ethical principles, attitudes, and values, illustrated through case studies to promote probity in governance and decision-making.",
        tutor:"Himanshu Kandpal",
        prev_institude:"TestBook",
        student_enrolled:"200",
        rating:5
    },
    {
        subject:"CSAT",
        thumbnail:"course_2.png",
        number_of_lessons:"120",
        about_course:"Studying diverse art, modern &world history, post-Independence India, world & Indian geography, and Indian society's culture and structure.",
        tutor:"Samriti talk",
        prev_institude:"Drishti IAS",
        student_enrolled:"160",
        rating:"5"
    }
]

testimonials = [
    {
        name:"Adam Smith",
        Designation:"Python Developer",
        tesimonial:"Testimonial 1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating:4,
    },
    {
        name:"Avadh Ojha",
        Designation:"Modern World History Professor",
        tesimonial:"Testimonial 2  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating:4,
    },
    {
        name:" Dr. Vikas Divyakirti",
        Designation:"CEO Drishti IAS",
        tesimonial:"Testimonial 3  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating:4,
    },
    {
        name:"B. Singh Sir",
        Designation:"Ex. IES",
        tesimonial:"Testimonial 4  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating:4,
    },
    {
        name:"Kapuria Sir",
        Designation:"Faculty for Indian Economy",
        tesimonial:"Testimonial 5  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating:4,
    },
    {
        name:"Vibhas Jha Sir",
        Designation:"Assistant Professor at Delhi School of Economics",
        tesimonial:"Testimonial 6  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating:4,
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

app.get('/course_detail', (req,res)=>{
    res.render('course_detail.ejs', {menu:menu, url:req.url})
})


// COURSE DATA LINKS
app.get('/courses/:course_name', (req,res) => {
    const filteredArray = courses.filter(obj => obj.subject === req.params.course_name);
    res.send(
        {
            course_name:req.params.course_name,
            courses:filteredArray
        })
});

app.get('/testimonials', (req,res)=>{
    res.send({testimonials})
})

app.get('/specific_course',(req,res) => {
    res.send({message:'ok'})
})

const port = process.env.PORT
app.listen(port || 8000, () => {console.log(`server is running on the port ${port}`)})