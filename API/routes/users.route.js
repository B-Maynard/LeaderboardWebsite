const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users.controller');

// GETS
router.get('/test', users_controller.test);
router.get('/getall', users_controller.user_getall);

// POSTS
router.post('/create', users_controller.user_create);
router.post('/findbyid', users_controller.user_findbyid);
router.post('/updatepasswordbyid', users_controller.user_updatePasswordById);
router.post('/updatepermissionlevelbyid', users_controller.user_updatePermissionLevelById);
router.post('/deletebyid', users_controller.user_deletebyid);

module.exports = router;