const express = require("express");
const router = express.Router();
const {
    register, 
    login
} = require('./../controllers/auth.controller');
const asyncMiddleware = require('./../middlewares/async.middleware');
router.route('/login').post(asyncMiddleware(login));
router.route('/register').post(asyncMiddleware(register));

module.exports = router;