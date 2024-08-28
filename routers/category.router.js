const express = require("express");
const router = express.Router();
const multer = require('multer');
const {
    createCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory  
} = require('../controllers/category.controller');
const authMiddleware = require("../middlewares/auth.middleware");

const asyncMiddleware = require('./../middlewares/async.middleware');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
});
  
const upload = multer({ storage: storage });
router.route('/')
    .post(asyncMiddleware(authMiddleware), upload.single('img'), asyncMiddleware(createCategory))
    .get(asyncMiddleware(getCategories));
router.route('/:id')
    .patch(asyncMiddleware(updateCategory))
    .delete(asyncMiddleware(deleteCategory));

module.exports = router;