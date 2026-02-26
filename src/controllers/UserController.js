const userService = require('../services/UserService');
const { validationResult } = require('express-validator');
const asyncHandler = require('../middlewares/asyncHandler');

class UserController {

    getAllUsers = asyncHandler(async (req, res) => {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    });

    getUserById = asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        const user = await userService.getUserById(id);

        if (!user) {
            const error = new Error(`User not found with id: ${id}`);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(user);
    });

    getUserByUsername = asyncHandler(async (req, res) => {
        const username = req.params.username;
        const user = await userService.getUserByUsername(username);

        if (!user) {
            const error = new Error(`User not found with username: ${username}`);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(user);
    });

    getUserByEmail = asyncHandler(async (req, res) => {
        const email = req.params.email;
        const user = await userService.getUserByEmail(email);

        if (!user) {
            const error = new Error(`User not found with email: ${email}`);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(user);
    });

    createUser = asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 400;
            error.details = errors.array();
            throw error;
        }

        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    });

    updateUser = asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed');
            error.statusCode = 400;
            error.details = errors.array();
            throw error;
        }

        const id = parseInt(req.params.id);
        const user = await userService.updateUser(id, req.body);

        if (!user) {
            const error = new Error(`User not found with id: ${id}`);
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json(user);
    });

    deleteUser = asyncHandler(async (req, res) => {
        const id = parseInt(req.params.id);
        await userService.deleteUser(id);
        res.status(200).json({ message: 'User deleted successfully' });
    });
}

module.exports = new UserController();