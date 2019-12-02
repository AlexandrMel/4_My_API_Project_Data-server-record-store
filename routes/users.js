
const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser, getUser, putUser } = require('../controllers/userControllers');
const {userValidationRules,
    userValidationErrorHandling} = require('../validators/validator')
router
.route('/')
.get(getUsers)
.post(userValidationRules(),
    userValidationErrorHandling, addUser);


router
.route('/:id')
.get(getUser)
.delete(deleteUser)
.put(userValidationRules(),
    userValidationErrorHandling, putUser)

/**
 * GET all records
 */
// router.get('/', getUsers);

// /**
// * POST a record
//  */
// router.post('/', addUser);
// /**
// * DELETE a record
//  */
// router.delete('/', deleteUser);

module.exports = router;
