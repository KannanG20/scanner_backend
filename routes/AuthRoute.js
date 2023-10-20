const router = require("express").Router();

const authController = require("../controllers/Login")

router.post('/login', authController.login)

module.exports = router