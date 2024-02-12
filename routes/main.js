const express = require('express');
const mainController = require('../controller/main');
const authorization = require('../auth/auth');

const router = express.Router();

router.route('/login').post(mainController.login);

router.route('/dashboard').get(authorization, mainController.dashboard);

module.exports = router;
