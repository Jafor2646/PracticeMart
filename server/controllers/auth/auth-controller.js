const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

const User = require('../../models/User');
//register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    // Validate request payload
    if (!userName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required.",
        });
    }

    try {
        // Check if the username or email is already taken
        const existingUser = await User.findOne({ $or: [{ userName }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Username or email is already in use.",
            });
        }

        // Hash the password and create a new user
        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({ userName, email, password: hashPassword });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "Registration successful.",
        });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error.",
        });
    }
};

//login

const login = async(req, res) => {
    try {
    } catch (error) {
        console.log(e);
        res.status(500).json({
            success: false, 
            message: 'some error occurse' 
        });
    }
};







//logout


//auth middleware





module.exports = { registerUser };