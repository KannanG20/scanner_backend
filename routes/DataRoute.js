const router = require("express").Router();

const dataController = require("../controllers/Data")

router.post('/qrcodes', dataController.post_data)
router.get('/qrcodes', dataController.get_data)

module.exports = router