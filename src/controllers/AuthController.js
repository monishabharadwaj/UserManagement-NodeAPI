const bcrypt = require('bcryptjs');
const userService = require('../services/UserService');
const { generateToken } = require('../utils/jwt');

class AuthController {

    // 🔐 REGISTER
    async register(req, res) {
        try {
            const { password } = req.body;

            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

            if (!passwordRegex.test(password)) {
                return res.status(400).json({
                    message:
                        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
                });
            }

            const user = await userService.createUser(req.body);

            const token = generateToken(user);

            res.status(201).json({
                message: "User registered successfully",
                token,
                user
            });

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    // 🔐 LOGIN
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ message: "Email and password are required" });
            }

            const user = await userService.getUserWithPasswordByEmail(email);

            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            // 🔐 Remove password
            delete user.password;

            // 🔐 Generate token
            const token = generateToken(user);

            res.json({
                message: "Login successful",
                token,
                user
            });

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new AuthController();