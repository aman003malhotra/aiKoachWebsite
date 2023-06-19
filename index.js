const { default: axios } = require('axios');
var express = require('express');
const session = require('express-session');
const { Client, getTimeAgo, editorJsParse } = require('./config/client');
require("dotenv").config();

const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');

var app = express();

app.use(bodyparser.json({ limit: '50mb' }));
app.use(bodyparser.urlencoded({ limit: '500mb', extended: true, parameterLimit: 5000000 }));
// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());

app.use(cors());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    next();
});

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));



app.use(express.static('public'));
const edjsParser = require("editorjs-parser");

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
    // {
    //     name: 'Value proposition',
    //     url: '/valuepropostion'
    // },
    // {
    //     name: 'Team',
    //     url: '/team'
    // },
    {
        name: 'About',
        url: '#about'
    },
    {
        name: 'Contact',
        url: '/contact'
    }
]


testimonials = [
    {
        name: "Adam Smith",
        Designation: "Python Developer",
        tesimonial: "Testimonial 1  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating: 4,
    },
    {
        name: "Avadh Ojha",
        Designation: "Modern World History Professor",
        tesimonial: "Testimonial 2  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating: 4,
    },
    {
        name: " Dr. Vikas Divyakirti",
        Designation: "CEO Drishti IAS",
        tesimonial: "Testimonial 3  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating: 4,
    },
    {
        name: "B. Singh Sir",
        Designation: "Ex. IES",
        tesimonial: "Testimonial 4  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating: 4,
    },
    {
        name: "Kapuria Sir",
        Designation: "Faculty for Indian Economy",
        tesimonial: "Testimonial 5  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating: 4,
    },
    {
        name: "Vibhas Jha Sir",
        Designation: "Assistant Professor at Delhi School of Economics",
        tesimonial: "Testimonial 6  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        rating: 4,
    }
]

let saveData = null
let currentCourse = "General Studies";

app.get('/', async function (req, res) {
    let response;
    if (saveData == null) {
        response = await Client.get('course-categories')
        saveData = response.data
        // console.log("🚀 ~ file: index.js:161 ~ saveData:", saveData)
    }
    console.log("🚀 ~ file: index.js:162 ~ req.query:", req.query);
    if (req.query.course && Object.keys(saveData).filter(i => i == req.query.course).length > 0) {
        currentCourse = req.query.course;
    }
    req.session.data = saveData[currentCourse]
    // Set the initial currentCourse value
    res.render('index.ejs', { menu: menu, url: req.url, courses: saveData, currentCourse });
});

app.get('/course_detail/:course/:id', async (req, res) => {
    if (saveData == null) {
        response = await Client.get('course-categories')
        saveData = response.data
        // console.log("🚀 ~ file: index.js:161 ~ saveData:", saveData)
    }
    const parser = new edjsParser();
    console.log("🚀 ~ file: index.js:190 ~ app.get ~ req.params.course:", req.params, req.query)
    // console.log("🚀 ~ file: index.js:191 ~ app.get ~ saveData:", saveData)
    // console.log("🚀 ~ file: index.js:190 ~ app.get ~ data:", saveData)
    let data = saveData[req.params.course].filter(i => i.id == req.query.id)[0]
    console.log("🚀 ~ file: index.js:143 ~ app.get ~ data:", data)
    let syllabusData = data.Syllabus.weeks
    let StudyMaterial = parser.parse(data.StudyMaterial)
    let CourseOutline = parser.parse(data.CourseOutline)
    let Assignments = parser.parse(data.AIAssessmentsAndAssignments)
    let mentorship = parser.parse(data.Mentorship)
    let extras = parser.parse(data.Extras)
    res.render('course_detail.ejs', {
        menu: menu, url: req.url,
        courseInfo: data,
        syllabusData: syllabusData,
        CourseOutline, StudyMaterial,
        Assignments: Assignments,
        mentorship: mentorship,
        extras: extras
    })
})

app.get('/course', async (req, res) => {
    let response;
    let saveData;
    if (saveData == null) {
        response = await Client.get('course-categories')
        saveData = response.data
        console.log(saveData)
        // console.log("🚀 ~ file: index.js:161 ~ saveData:", saveData)
    }
    res.render('course.ejs', { menu: menu, url: req.url, courses: saveData });
});





// COURSE DATA LINKS
app.get('/courses/:course_name', (req, res) => {
    const filteredArray = courses.filter(obj => obj.subject === req.params.course_name);
    res.send(
        {
            course_name: req.params.course_name,
            courses: filteredArray
        })
});


app.get('/blog', async (req, res) => {
    let pagenumber = 1
    let limit = 10
    const blogs = await Client(`blogs?page=${pagenumber}&limit=${limit}`)
    console.log("🚀 ~ file: index.js:225 ~ app.get ~ blogs:", blogs.data.data)

    res.render('blog.ejs', { menu: menu, url: req.url, blogs: blogs.data.data, getTimeAgo });
});

app.get('/blog/:slug', async (req, res) => {
    const blogs = await Client(`blog/${req.params.slug}`)
    console.log("🚀 ~ file: index.js:225 ~ app.get ~ blogs:", blogs.data.data)


    res.render('blog_content.ejs', { menu: menu, url: req.url, blog: blogs.data, getTimeAgo, editorJsParse });
})
app.get('/valuepropostion', function (req, res) {
    res.render('valueProp.ejs', { menu: menu, url: req.url });
});

app.get('/team', function (req, res) {
    res.render('team.ejs', { menu: menu, url: req.url });
});

app.get('/about', function (req, res) {
    res.render('about.ejs', { menu: menu, url: req.url });
});

app.get('/contact', function (req, res) {
    res.render('contact.ejs', { menu: menu, url: req.url });
});

const syllabusDatas = [{ "weekNumber": "1", "readings": [{ "title": "handouts 1", "time": "120m" }, { "title": "topic pdf ", "time": "2h" }], "videos": [{ "title": "topic lecture ", "time": "2h" }, { "title": "spefic topic lecture 2", "time": "3h" }], "tests": [{ "title": "MCQ test ", "time": "20m" }, { "title": "Subjective test ", "time": "2h" }] }, { "weekNumber": "2", "readings": [{ "title": "handouts 1", "time": "120m" }, { "title": "topic pdf ", "time": "2h" }], "videos": [], "tests": [] }];




app.get('/testimonials', (req, res) => {
    res.send({ testimonials })
})

app.get('/specific_course', (req, res) => {
    res.send({ message: 'ok' })
})

const port = process.env.PORT
app.listen(port || 8000, () => { console.log(`server is running on the port ${port}`) })