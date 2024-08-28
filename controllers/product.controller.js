
const productModel = require('../models/product.model')

const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = {
    createProduct: async (req, res) => {
        const body = req.body; 
        const newProduct = await productModel.create(body);
        return res.status(201).json(newProduct);
    }, 
    getProducts: async (req, res) => {
        const page = req.query.page || 1;
        const per_page = 10;

        const products = await productModel
        .find()
        .populate('category_id')
        .sort({ createdAt: -1 })
        .skip(page * per_page - per_page)
        .limit(per_page)
        .exec();

        const count = await productModel.countDocuments();

        return res.status(200).json({
        current_page: +page,
        total_page: Math.ceil(count / per_page),
        count: count,
        data: products,
        });
    }, 
    updateProduct: async (req, res) => {
       const id = req.params.id;
       const body = req.body;
       const updatedProduct = await productModel.findByIdAndUpdate(id, body, {new : true});
       return res.status(200).json(updatedProduct);
    }, 
    deleteProduct: async (req, res) => {
        const id = req.params.id;
       const updatedProduct = await productModel.findByIdAndDelete(id);
       return res.status(200).json(updatedProduct);
    },
    findProductById: async (req, res) => {
        const id = req.params.id; 
        const product = await productModel.findById(id);
        return res.status(200).json(product); 
    },
    findProductsByCategooryId: async (req, res) => {
        const category_id = req.params.category_id;
        const body_query = {category_id};
        const page = req.query.page || 1;
        const per_page = 10;

        const products = await productModel
        .find(body_query)
        .populate('category_id')
        .sort({ createdAt: -1 })
        .skip(page * per_page - per_page)
        .limit(per_page)
        .exec();

        const count = await productModel.countDocuments(body_query);

        return res.status(200).json({
        current_page: +page,
        total_page: Math.ceil(count / per_page),
        count: count,
        data: products,
        });
    }
}