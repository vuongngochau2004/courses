const express = require("express");
const router = express.Router();

const {
    createProduct, 
    getProducts, 
    updateProduct, 
    deleteProduct,
    findProductById,
    findProductsByCategooryId
} = require('../controllers/product.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const asyncMiddleware = require('../middlewares/async.middleware');
const roleMiddleware = require("../middlewares/role.middleware");

router.route('/')
    .post(asyncMiddleware(authMiddleware), roleMiddleware(['admin']), asyncMiddleware(createProduct))
    .get(asyncMiddleware(getProducts));
router.route('/category/:category_id')
    .get(asyncMiddleware(findProductsByCategooryId))
router.route('/:id')
    .get(asyncMiddleware(findProductById))
    .patch(asyncMiddleware(updateProduct))
    .delete(asyncMiddleware(deleteProduct));
module.exports = router;