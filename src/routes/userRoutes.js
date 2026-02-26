/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { body } = require('express-validator');
const protect = require('../middlewares/authMiddleware');
const authorize = require('../middlewares/roleMiddleware');

// Validation rules
const userValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('username').notEmpty().withMessage('Username is required'),
    body('email').isEmail().withMessage('Email should be valid').notEmpty().withMessage('Email is required')
];

// Routes
// Any logged-in user can list all users
/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users (auth required)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized (no or bad token)
 */
router.get('/', protect, userController.getAllUsers.bind(userController));

// Allow admin or owner to view profile
router.get('/:id', protect, (req, res, next) => {
    if (req.user && (req.user.role === 'admin' || req.user.id == req.params.id)) {
        return userController.getUserById.bind(userController)(req, res, next);
    }

    return res.status(403).json({ message: 'Access denied' });
});

router.get('/username/:username', userController.getUserByUsername.bind(userController));
router.get('/email/:email', userController.getUserByEmail.bind(userController));
router.post('/', userValidation, userController.createUser.bind(userController));
router.put('/:id', userValidation, userController.updateUser.bind(userController));

// Only admin can delete users
router.delete('/:id', protect, authorize('admin'), userController.deleteUser.bind(userController));

module.exports = router;
