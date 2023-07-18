const UserEnquiry = require('../models/userEnquiry.Model'); // Assuming the schema model is in a "models" directory

// Controller for handling the form submission
const createUser = async (req, res) => {
    // try {
    const { name, email, contactNumber, subject, message } = req.body;
    console.log("🚀 ~ file: enquiry.Controller.js:7 ~ createUser ~ name, email, contactNumber, subject, message:", name, email, contactNumber, subject, message)

    // Create a new user object
    const newEnquiry = new UserEnquiry({
        name,
        email,
        contactNumber,
        subject,
        message
    });

    // Save the user object to the database
    const savedUser = await newEnquiry.save();

    res.status(200).json(savedUser);
    // } catch (error) {
    //     console.log("🚀 ~ file: enquiry.Controller.js:23 ~ createUser ~ error:", error)
    //     res.status(500).json({ error: error });
    // }
};

module.exports = {
    createUser
};
