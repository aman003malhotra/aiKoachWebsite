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
        url: '/#about'
    },
    {
        name: 'Contact Us',
        url: '/contact'
    },

]
console.log = () => { }

testimonials = [
    {
        name: "ABHINAV SIWACH",
        Designation: "AIR-12 | IAS 2022",
        tesimonial:
            "Aikoach provided personalized guidance, mock tests, and valuable study materials, which were instrumental in my preparation. I recommend this platform to all UPSC aspirants",
        rating: 4,
        url: "https://iasskool-wesbite.s3.ap-south-1.amazonaws.com/testimonials/Abhinav-siwach.png"
    },
    {
        name: "KRITIKA GOYAL",
        Designation: "AIR-14 | IAS 2022",
        tesimonial:
            "AIkoach acted as my mentor, providing continuous motivation and guidance throughout my UPSC journey.This platform truly made my preparation enjoyable and fruitful",
        rating: 4,
        url: "https://iasskool-wesbite.s3.ap-south-1.amazonaws.com/testimonials/Kritika_goyal.png"
    },
    {
        name: "SWATI SHARMA",
        Designation: "AIR-15 | IAS 2022",
        tesimonial:
            "Personalized learning at its best. Aicoach unlocked my potential. I highly recommend it to anyone looking for a comprehensive and effective exam prep solution.",
        rating: 4,
        url: "https://iasskool-wesbite.s3.ap-south-1.amazonaws.com/testimonials/Swati-Sharma.png"
    },
    {
        name: "GUNJITA AGRAWAL",
        Designation: "AIR-26 | IAS 2022",
        tesimonial:
            "The mock interviews, DAF tests conducted were a game-changer in my interview preparation. Thanks to this platform, I entered the interview room with confidence. The platform transformed my exam preparation into a smart and efficient process",
        rating: 4,
        url: "https://iasskool-wesbite.s3.ap-south-1.amazonaws.com/testimonials/gunjita-Agrawal.png"
    },
    {
        name: "PRIYANSHA GARG",
        Designation: "AIR-31 | IAS 2022",
        tesimonial:
            "Aikoach is a complete package that exceeded my expectations. The personalized learning experience,comprehensive study materials, and AI-powered analytics provided the perfect combination to optimize my exam preparation",
        rating: 4,
        url: "https://iasskool-wesbite.s3.ap-south-1.amazonaws.com/testimonials/Priyansha-garg.png"
    },
    // {
    //     name: "ARNAV MISHRA",
    //     Designation: "AIR-56 | IAS 2022",
    //     tesimonial:
    //         "The practice tests and mock exams closely simulated the actual exam, the AI-powered practice tests accurately gauged my readiness and helped me identify areas for improvement.Overall it helped me develop confidence and familiarity with the format, would for sure recommend aikoach to aspirants",
    //     rating: 4,
    // },
    // {
    //     name: "ANIRUDHA PANDEY",
    //     Designation: "AIR-64 | IAS 2022",
    //     tesimonial:
    //         "The comprehensive coverage of the syllabus ensured complete preparation. Also the AI capabilities were instrumental in my success. With aikoach, I felt supported and well-equipped to achieve my exam goals",
    //     rating: 4,
    // }
];

const positions = [
    { bottom: '10%', left: '200px', width: '80px', },
    { left: '100px', top: '40%', width: '100px', },
    { mdLeft: '20%', left: '0', width: '80px' },
    { mdRight: '17%', top: '10%', right: '5%', width: '80px', },
    { right: '10%', top: '50%', width: '80px', }
];

features = [
    {
        name: "maatsaab",
        title: "MaatSaab: Revolutionizing Education",
        about: `In today's competitive academic landscape, students often find themselves in need of extra support to overcome challenges and achieve their full potential. That's where MaatSaab comes in - a revolutionary learning solution designed to empower students and facilitate their academic improvement. With its meticulously curated AI lectures, personalized lessons, and innovative features, MaatSaab is transforming the way students learn and succeed.
          <br />
          <br />
  
          <b class="text-xl">1. Personalized Learning Experience:</b><br/>
          MaatSaab understands that every student is unique. With the power of advanced AI technology, MaatSaab offers a personalized learning experience tailored to each student's needs. By accessing meticulously curated AI lectures and tests, students like Alex, struggling with low grades, can embark on a learning journey that is designed to address their specific areas of improvement.
          <br/>
          <br/>
          <b class="text-xl">2. Innovative Tools for Enhanced Learning:</b><br/>
          MaatSaab goes beyond traditional learning platforms by integrating unique tools that enhance the learning experience. One such tool is the Barometer Tab, which allows students to track their progress in real-time, identify weak areas, and measure their growth over time. This innovative feature empowers students to take control of their learning and stay motivated on their path to success.
          <br/>
          <br/>
          <b class="text-xl">3. Ensuring Grade Improvement:</b><br/>
          MaatSaab is committed to ensuring grade improvement for its students. Through a rigorous teacher rating system, MaatSaab guarantees a 100% improvement in grades. By connecting students with highly qualified educators who are evaluated based on their teaching effectiveness, MaatSaab ensures that students receive top-notch guidance and support to excel academically.
          <br/>
          <br/>
          <b class="text-xl">4. Cost-Effective Learning:</b><br/>
          Education should be accessible to all. MaatSaab recognizes the financial challenges that students and families may face. By focusing on targeted areas of improvement, MaatSaab optimizes the learning process, resulting in reduced class expenses by 80%. This cost-effective approach makes high-quality education more affordable and attainable for students from all walks of life.
          <br/>
          <br/>
          <b class="text-xl">5. Evaluating Progress for Success:</b><br/>
          At MaatSaab, the correlation between teacher evaluation and student progress is of utmost importance. By continuously evaluating teachers' performance and their impact on students, MaatSaab ensures that educators refine their teaching methodologies and adapt to the evolving needs of their students. This commitment to evaluation guarantees a high-quality learning experience and sets students on the path to success.
          <br/>
          <br/>
          <b>Are you ready to unlock your true potential? Visit www.aikoach.com today to embark on a transformative learning adventure with MaatSaab and take the first step towards academic excellence.</b>         
          `,
        video_link: "",
    },
    {
        name: "aikoackcommunity",
        title: "AiKoach Community Connect: Where Learning Meets Collaboration",
        about: `
      Welcome to AiKoach.com, your ultimate destination for comprehensive learning and community engagement. Let's dive into the powerful features of our platform, starting with Community Connect. Discover how this unique feature fosters collaboration, support, and growth among students pursuing various educational goals.
  <br />
  <br />
  <b class="text-xl"> Step 1: Select Your Category </b><br />
  Whether you're a 10th student, 12th student, UPSC aspirant, or UPPSC aspirant, AiKoach has tailored resources to support your educational journey. Begin by selecting the category that aligns with your goals, ensuring personalized assistance and relevant materials.
  <br />
  <br />
  
  <b class="text-xl"> Step 2: Identify Your Weak Areas </b><br >
  Our advanced system analyzes your previous assessments and identifies the areas where you require further improvement. Personalized weak areas are presented, allowing you to focus your efforts effectively.
  <br />
  <br />
  
  <b class="text-xl"> Step 3: Connect with Like-Minded Individuals</b><br >
  In the pursuit of academic excellence, you're not alone. AiKoach connects you with individuals who share similar weak areas, offering valuable support and collaboration. Create study groups with those who can become your study companions and mentors.
  <br />
  <br />
  
  <b class="text-xl">Step 4: Collaborative Learning Environment</b><br >
  Through the chat box and screen, you can interact, share knowledge, and support each other's growth. Engage in meaningful conversations and benefit from the collective wisdom of your group members.
  <br />
  <br />
  
  <b class="text-xl"> Step 5: Group Tests for Enhanced Learning </b> <br />
  To further enhance your learning experience, AiKoach offers group tests for multiple-choice questions (MCQs) and subjective questions. These tests challenge your knowledge while fostering a collaborative learning environment. Together, you can overcome your weak areas and achieve success.
  <br />
  <br />
  
  <b class="text-xl">Step 6: Stimulating Group Discussions</b> <br />
  AiKoach provides a dedicated space for group discussions. Here, you can exchange ideas, ask questions, and explore different viewpoints on relevant topics. Engage in dynamic conversations and broaden your understanding through the diverse perspectives of your group members.
  <br />
  <br />
  
  <b class="text-xl">Benefits of AiKoach Community Connect:</b> <br />
  1. Consistency: By practicing with others who have similar weaknesses, you can maintain consistent efforts towards improvement.<br />
  2. Enhanced Commitment: Peer pressure motivates students to achieve their weekly goals, fostering a sense of commitment and dedication.<br />
  3. Improved Learning Experience: Through discussions on important topics, you can deepen your understanding and gain valuable insights from your peers.<br />
  4. Dedicated Mentorship: Teachers can easily identify students who require focused attention on specific areas and provide personalized mentorship. <br />
  <br />
  
  With Community Connect, we empower students to collaborate, support each other, and conquer educational challenges together. Embrace the power of collaboration and achieve academic excellence with AiKoach.
  `,
        video_link: "",
    },
    {
        name: "skill_bureaucrat",
        title: "Skill Bureaucrat: Empowering Future Leaders for Technical Challenges",
        about: `
      <b class="text-xl">Introduction:</b> <br />
      In today's competitive world, the field of bureaucracy requires individuals with a diverse skill set. With around 800 vacancies in the IAS exam every year, aspiring bureaucrats face numerous technical challenges that demand innovative solutions. The Skill Bureaucrat feature is designed to equip individuals with the necessary skills to tackle these challenges effectively. By providing a foundation in web development, full-stack development, UI/UX design, cybersecurity, AI/ML basics, and other relevant technologies, we prepare future bureaucrats to address the diverse issues faced by a country like India.
      <br />
      <br />
      <b class="text-xl">Building a Future-Ready Skill Set: </b> <br />
      To become a successful bureaucrat, it is essential to possess a wide range of technical skills. The Skill Bureaucrat feature ensures that you are equipped with the basic knowledge required to deal with technology-related issues. Whether it's understanding web development, mastering full-stack development, designing user interfaces, ensuring cybersecurity, or grasping AI/ML fundamentals, our program prepares you to handle these challenges efficiently and contribute effectively to the nation.
      <br />
      <br />
      <b class="text-xl">Unleashing Career Opportunities:</b> <br />
      In addition to preparing you for the bureaucracy, the Skill Bureaucrat feature opens doors to exciting tech job opportunities. By gaining proficiency in in-demand skills like MERN stack development, AI/ML engineering, and UI/UX design, you enhance your employability and broaden your career prospects. It serves as a viable option not only for those who may not clear the bureaucracy exam but also for aspirants who want to explore alternate career paths.
      <br />
      <br />
      <b class="text-xl">A Foundation Course for College-Going Students:</b> <br />
      For college-going students in a three-year foundation course, the Skill Bureaucrat feature is an excellent choice. It provides them with diverse options and equips them with essential skills while they continue their preparation for the UPSC exams. This comprehensive approach allows students to enhance their knowledge, explore their interests, and gain valuable practical experience, setting them on a path towards success in both bureaucratic and tech-related fields.
      <br />
      <br />
      In the ever-evolving landscape of bureaucracy, technical skills are crucial for addressing complex challenges effectively. The Skill Bureaucrat feature aims to empower future leaders by providing them with the knowledge and skills required to navigate the diverse issues faced by the nation. By embracing this program, individuals not only become future-ready for bureaucratic roles but also open doors to exciting opportunities in the tech industry. Whether you aspire to be a bureaucrat or pursue a career in the tech field, the Skill Bureaucrat feature equips you with the tools to excel. Embrace this option and embark on a transformative journey towards becoming a skilled bureaucrat and a future leader.
      `,
        video_link: "",
    },
    {
        name: "ai_evaluator",
        title: "Enhance Your Subjective & objective Question Answering Skills with Ai Evaluator",
        about: `
      Welcome to the interactive learning platform! In this demonstration, we will showcase how our app/site utilizes Ai Evaluator to assist students in improving their subjective question answering skills. Through AI-based evaluation, students can receive comprehensive feedback on their performance, along with tailored suggestions for improvement.
      <br />
      <br />
      <b class="text-xl">Step 1: Engaging with a Challenging Subjective and objective Question</b> <br />
      As the student opens the app/site, they are presented with a thought-provoking subjective question. For instance, let's consider the question: "India's constitutional democracy is based on the people's right to call state power to account. Elucidate." The student begins to craft their answer, drawing upon their knowledge and understanding. Similarly Students can attempt objective questions on the platform.
      </br>
      <br />
  
      <b class="text-xl">Step 2: AI-Based Evaluation</b><br />
      Once the student completes their answer, the system employs AI-based evaluation techniques to assess their response for both subjective as well as Objective. The evaluation covers several key assessment indicators, providing a detailed analysis of the student's performance. 
      <br />
      <br />
  
      <b class="text-lg">For Subjective answer a few listed are:</b>
      <ul>
      <li>1. Contextual Understanding: The system evaluates how well the student comprehended the question and provided relevant insights within the given context.</li>
      
      <li>2. Knowledge Proficiency for the Question: This indicator assesses the depth of the student's understanding regarding the topic and their ability to effectively showcase their knowledge.</li>
      
      <li>3. Language Proficiency: The system analyzes the student's grasp of language, including grammar, vocabulary, and coherence in presenting their ideas.</li>
      
      <li>4. Structure and Presentation Proficiency: This indicator evaluates the organization and flow of the student's answer, considering factors such as logical structure, clarity, and effective presentation.</li>
      </ul>
      <br/>
      <b class="text-xl">Step 3: Identifying Knowledge Gaps and Suggesting Improvements</b> <br />
      Based on the evaluation results, the system identifies any knowledge deficits or areas for improvement. If the evaluation reveals a knowledge gap, the system provides specific recommendations to address the deficiency.
      <br />
      <br />
  
      These recommendations may include suggested tests, lectures, and notes that are tailored to the student's identified knowledge gaps. By exploring these resources, students can enhance their understanding of the topic and further improve their performance.
      <br />
      <br />
  
      With the Ai Evaluator feature, students can engage in subjective question answering, receive AI-based evaluation, and access tailored resources for improvement. By focusing on contextual understanding, knowledge proficiency, language proficiency, and structure and presentation skills, students can refine their subjective question answering abilities. Unlock your full potential and elevate your learning experience with this innovative app/site. Embrace the power of AI and enhance your subjective question answering skills for academic success. Happy learning!
      `,
        video_link: ""
    },
    {
        name: "elps",
        title: "Elevate Your English Language Proficiency with ELPS",
        about: `
      Welcome to our innovative methodology, where we follow the inspiring journey of a student striving to enhance their English language proficiency. In this transformative experience, we explore the power of personalized learning and the impact it can have on one's language skills.
      <br />
      <br />
      <b class="text-xl">Assessing English Language Proficiency:</b><br />
      Our story begins as the student opens the app or website and eagerly logs into their user profile. They discover their current English Language Proficiency Score (ELPS), which stands at 42.5 out of 100, indicating areas for improvement.
      <br />
      <br />
      <b class="text-xl">Parameters for Evaluation:</b><br />
      The ELPS score is determined based on several critical parameters, each essential for measuring language proficiency. A sample score is written below for understanding the feature.
      <br />
      1. Grammar: This parameter assesses the student's understanding and application of grammatical rules, including sentence structure, verb tenses, agreement, and word order. The student receives a score of 40 out of 100 in this area.
      <br />
      2. Writing Skills: This parameter evaluates the student's proficiency in expressing ideas in written form, focusing on coherence, organization, grammar, vocabulary usage, and the ability to convey information effectively. The student's score for writing skills is 30 out of 100.
      <br />
      
      3. Spelling and Punctuation: Accuracy and correctness in spelling words and appropriate use of punctuation marks are crucial aspects. The student achieves a score of 60 out of 100 in this parameter.
      <br />
      
      4. Fluency: This parameter examines the smoothness, speed, and natural flow of spoken or written English. The student's fluency score stands at 40 out of 100.
      <br />
      <br />
      
      <b class="text-xl">Suggested Improvements:</b><br />
      Recognizing the student's aspiration for progress, the app or website offers valuable suggestions to enhance their language proficiency. Personalized recommendations include tests, lectures, and notes tailored to address the specific areas of improvement identified by the ELPS assessment.
      <br />
      <br />
      <b class="text-xl">Active Engagement and Growth:</b><br />
      Embracing the opportunity for growth, the student actively engages with the suggested resources. They diligently take tests, attend lectures, and utilize the provided notes, seeking to strengthen their English language skills.
      <br />
      <br />
      <b class="text-xl">Transformation and Achievement:</b><br />
      Through unwavering dedication and consistent practice, the student witnesses a remarkable transformation in their language proficiency. The ELPS score gradually increases from 42.5 to an impressive 60 out of 100, reflecting their enhanced capabilities.
      <br />
      <br />
      <b class="text-xl">Unlocking Opportunities:</b><br />
      With their newfound confidence and refined skills, the student's increased English language proficiency opens doors to countless opportunities for their future endeavors. They can navigate academic, professional, and personal spheres with greater ease and effectiveness.
      <br />
      <br />
      <b class="text-xl">Embrace the Path of Growth:</b> <br />
      This immersive 3D video highlights the power of personalized learning, where targeted assessments, tailored recommendations, and dedicated practice converge to elevate one's English language proficiency. Through determination, educational resources, and a commitment to growth, learners can unlock their full potential.
      <br />
      <br />
      <b class="text-xl">Join the Journey:</b><br />
      Embark on this transformative journey and embrace the path of growth and excellence. Let us guide you through a personalized learning experience, where determination and educational resources intertwine to help you enhance your English language proficiency. Together, let's unlock your full potential and achieve language mastery.
      `,
        video_link: ""
    },
    {
        name: "aipmp",
        title: "Master the Art of Acing Interviews with Personality Management Programme",
        about: `
      In today's competitive job market, having a strong personality, exceptional communication skills, and the ability to excel in interviews are crucial for career success. At Aikoach, we offer the Personality Management Programme, a comprehensive program designed to help individuals enhance their personality, communication abilities, and interview performance. With our advanced AI-powered interface, personalized bootcamps, and real-time mock interviews, we provide the necessary tools and resources to excel in any interview scenario.
  <br />
  <br />
  
  <b class="text-xl">Enhance Your Personality and Performance:</b><br />
  At Aikoach, we understand the importance of a well-rounded personality and effective communication skills. Our platform showcases impressive statistics, demonstrating how our program has helped individuals improve key communication factors such as active listening, speaking clearly, articulation, feedback, speed and sequence of speech, and command of subject. By focusing on these essential skills, we help individuals become confident and successful in interviews and various professional settings.
  <br />
  <br />
  <b class="text-xl">AI-Powered Interface for Interview Preparation:</b><br />
  Our Personality Management Bootcamp offers access to an advanced AI-powered interface specifically designed for interview preparation. Through simulated discussions and interactions, our AI interface creates a realistic interview experience, allowing participants to practice and refine their responses. This feature ensures that individuals are well-prepared and equipped to handle any interview situation with confidence and poise.
  <br />
  <br />
  <b class="text-xl">What You Will Gain from the Program:</b><br />
  Enrolling in our Personality Management Bootcamp provides a range of benefits designed to enhance your interview performance:
  <br />
  <br />
  
  <b class="text-md">1. AI-Curated Interview and DAF Analysis:</b> Gain valuable insights into potential interview questions and receive detailed analysis of your Detailed Application Form (DAF). This analysis equips you with the knowledge and preparation necessary to answer interview questions effectively and impress prospective employers.
  <br />
  <br />
  
  <b class="text-md">2. AI-Curated Discussions:</b> Engage in AI-curated discussions that focus on relevant interview questions specific to your field. These discussions simulate real interview scenarios, allowing you to practice your responses, develop critical thinking skills, and improve your overall interview performance.
  <br />
  <br />
  
  <b class="text-md">3. Personalized Bootcamp:</b> Participate in a personalized bootcamp tailored to your specific needs. Our expert mentors guide you through interactive sessions, providing valuable feedback and strategies to enhance your personality, communication skills, and interview techniques. This personalized approach ensures that you receive individualized attention and maximize your learning potential.
  <br />
  <br />
  
  <b class="text-md">4. Group Discussions:</b> Join group discussions with like-minded individuals to explore relevant topics related to your interview. These group sessions foster collaboration and enable you to gain insights from different perspectives, expand your knowledge, and develop well-rounded opinions.
  <br />
  <br />
  
  <b class="text-md">5. Interview Score Tracker:</b> Keep track of your progress with our interview score tracker. This tool evaluates your performance based on various parameters, providing valuable feedback and helping you identify areas for improvement. By monitoring your progress, you can continuously refine your interview skills and strive for excellence.
  <br />
  <br />
  
  <b class="text-md">6. Real-Time Mock Interviews:</b> Connect with real mentors for real-time mock interviews, replicating the actual interview experience. These mock interviews allow you to practice under realistic conditions, receive personalized feedback, and build confidence in your abilities. By simulating real interview scenarios, you can identify and address any weaknesses, ensuring that you are fully prepared for your actual interviews.
  <br />
  <br />
  <b class="text-xl">Register Now and Master the Art of Acing Interviews: </b><br />
  Ready to take your interview skills to the next level? Register for the Personality Management Bootcamp today and embark on a transformative journey to master the art of acing interviews. Visit www.aikoach.com for more information and start your path to interview success with Aikoach.
      `,
        video_link: ""
    }
];

colors = [
    "linear-gradient(142deg, #A762FF 13.17%, #8ED1ED 82.88%)",
    "linear-gradient(141deg, #D563FD 11.92%, #F2A839 94.96%)",
    "linear-gradient(142deg, #4679FD 0%, #BA23EF 100%)"
]

let saveData = null
let lastRefreshedTime = null;
const cacheExpirationTime = 1 * 60 * 1000;
let currentCourse = "General Studies";

app.get('/', async function (req, res) {
    let response;
    if (saveData === null || lastRefreshedTime === null || Date.now() - lastRefreshedTime > cacheExpirationTime) {
        response = await Client.get('course-categories')
        saveData = response.data
        lastRefreshedTime = Date.now();
        // console.log("🚀 ~ file: index.js:161 ~ saveData:", saveData)
    }
    console.log("🚀 ~ file: index.js:162 ~ req.query:", req.query);
    if (req.query.course && Object.keys(saveData).filter(i => i == req.query.course).length > 0) {
        currentCourse = req.query.course;
    }
    req.session.data = saveData[currentCourse]
    // Set the initial currentCourse value
    res.render('index.ejs', { menu: menu, url: req.url, courses: saveData, currentCourse, colors: colors, positions: positions, testimonials: testimonials });
});

app.get('/course_detail/:course/:id', async (req, res) => {
    if (saveData === null || lastRefreshedTime === null || Date.now() - lastRefreshedTime > cacheExpirationTime) {
        response = await Client.get('course-categories')
        saveData = response.data
        lastRefreshedTime = Date.now();
        // console.log("🚀 ~ file: index.js:161 ~ saveData:", saveData)
    }
    // const parser = new edjsParser();
    console.log("🚀 ~ file: index.js:190 ~ app.get ~ req.params.course:", req.params, req.query)
    // console.log("🚀 ~ file: index.js:191 ~ app.get ~ saveData:", saveData)
    // console.log("🚀 ~ file: index.js:190 ~ app.get ~ data:", saveData)
    let data = saveData[req.params.course].filter(i => i.id == req.query.id)[0]
    console.log("🚀 ~ file: index.js:143 ~ app.get ~ data:", data)
    let syllabusData = data.Syllabus.weeks
    let StudyMaterial = data?.StudyMaterial != undefined && editorJsParse(data.StudyMaterial)
    let CourseOutline = data?.CourseOutline != undefined && editorJsParse(data.CourseOutline)
    let Assignments = data?.AIAssessmentsAndAssignments != undefined && editorJsParse(data.AIAssessmentsAndAssignments)
    let mentorship = data?.Mentorship != undefined && editorJsParse(data.Mentorship)
    let extras = data?.Extras != undefined && editorJsParse(data.Extras)
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
    if (saveData == null) {
        const response = await Client.get('course-categories')
        saveData = response.data
        console.log(saveData)
        // console.log("🚀 ~ file: index.js:161 ~ saveData:", saveData)
    }
    res.render('course.ejs', { menu: menu, url: req.url, courses: saveData });
});


app.get('/clearcache', async (req, res) => {
    saveData = null;
    res.redirect('/')
})


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

app.get("/features/:featureName", function (req, res) {
    const filteredFeatures = features.filter(
        (feature) => feature.name === req.params.featureName
    );
    res.render("features.ejs", {
        menu: menu,
        url: req.url,
        filteredFeatures: filteredFeatures[0],
    });
});

app.get("/valueProposition", (req, res) => {
    res.render("valueProp.ejs", {
        menu: menu,
        url: req.url
    });
})

app.get("/privacy-policy", (req, res) => {
    res.render("termsAndonditions/privacy_policy.ejs", {
        menu: menu,
        url: req.url
    });
})
app.get("/terms-and-Conditions", (req, res) => {
    res.render("termsAndonditions/term_conditions.ejs", {
        menu: menu,
        url: req.url
    });
})
app.get("/Refund-Cancellation", (req, res) => {
    res.render("termsAndonditions/refund_cancellation.ejs", {
        menu: menu,
        url: req.url
    });
})
app.get("/Shipping-policy", (req, res) => {
    res.render("termsAndonditions/shipping_policy.ejs", {
        menu: menu,
        url: req.url
    });
})



const port = process.env.PORT
app.listen(port || 8000, () => { console.log(`server is running on the port ${port}`) })