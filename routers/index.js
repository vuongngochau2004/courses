const authRouter = require('./auth.router');
const userRouter = require('./user.router');
const categoryRouter = require('./category.router');
const productRouter = require('./product.router');
module.exports = (app)=>{
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter); 
    app.use('/api/categories', categoryRouter); 
    app.use('/api/products', productRouter); 
}