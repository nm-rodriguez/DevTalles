const { Router } = require('express');
const { getUser,postUser, putUser, deleteUser } = require('../controllers/userController');

const router = Router();

router.get('/', getUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/', deleteUser);


module.exports = router;