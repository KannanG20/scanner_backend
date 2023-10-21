const router = require("express").Router();

const dataController = require("../controllers/Data")

router.post('/qrcodes', dataController.post_data)
router.get('/qrcodes', dataController.get_data)
router.delete('/qrcodes/:id', dataController.delete_data)

module.exports = router