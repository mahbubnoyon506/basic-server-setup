const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// Helper function to generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });
};

exports.signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ email, password: hashedPassword })
        res.status(201).json({ message: "User created successfully", token: generateToken(user.id) })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } })
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Invalid credentials" })
        }
        res.json({ message: "Login successful", token: generateToken(user.id) })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}