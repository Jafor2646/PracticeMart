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

const loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) {
            return res.json({
                success: false,
                message: 'User does not exist. Please register first.'
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!isPasswordMatch) {
            return res.json({
                success: false,
                message: 'Invalid credentials. please try again.'
            });
        }

        const token = jwt.sign({
            id: checkUser._id, role: checkUser.role, email: checkUser.email
        }, "CLIENT_SECRET_KEY", { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: false}).json({
            success: true,
            message: 'Login successful.',
            user: {
                id: checkUser._id,
                email: checkUser.email,
                role: checkUser.role
            }   
        }); 
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false, 
            message: 'some error occurse' 
        });
    }
};







//logout

const logoutUser = (req, res)=> {
    res.clearCookie('token').json({
        success: true,
        message: 'Logged out successfully.'
    });
}
//auth middleware

const authMiddleware = async(req, res, next) => {
    const token = req.cookies.token;
    if(!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized access.'
        });
    }
    try{
        const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
        req.user = decoded;
        next();
    }catch(error){
        res.status(401).json({
            success: false,
            message: 'Unauthorized access.'
        });
    }
}   



module.exports = { registerUser, loginUser, logoutUser, authMiddleware };