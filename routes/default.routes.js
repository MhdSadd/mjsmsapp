const router = require('express').Router()
const {Index, Contact, Blog, LoginGet} = require('../controllers/default_controller')



router.get('/', Index)
router.get('/contact', Contact)
router.get('/blog', Blog)
router.get('/login', LoginGet)



module.exports = router