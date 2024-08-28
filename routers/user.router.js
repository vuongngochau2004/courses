const express = require("express");
const router = express.Router();
const { getAllUser } = require('../controllers/user.controller');

const asyncMiddleware = require('../middlewares/async.middleware');
const authMiddelware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.route('/').get(
    asyncMiddleware(authMiddelware),
    roleMiddleware(['admin']),
    asyncMiddleware(getAllUser)
);

module.exports = router;