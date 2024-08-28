require('dotenv').config();
const userModel = require('./../models/user.model')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mailSender = require('../helpers/mail.sender');

const ErrorResponse = require('../helpers/ErrorResponse');

module.exports = {
    renderLoginPage: (req, res) =>{
        res.render('auth/login');
    },

    renderRegisterPage: (req, res) =>{
        res.render('auth/register');
    },

    register: async (req, res) => {
        const body = req.body;
        console.log(body);
        const newUser = await userModel.create(body);

        mailSender({
            email: body.email,
            subject: 'Chúc mừng bạn đã đăng kí thành công !', 
            html: '<h2 style="color: red;"> Anh Hậu đẹp trai đây !! </h2> ',

        });

        return res.status(201).json(newUser);
    }, 
    login: async (req, res) => {
        const { username, password } = req.body; 
        const user = await userModel.findOne( {username: username} );

        if(!user){
            throw new ErrorResponse(401, "Tài khoản không tồn tại!!");
        }

        const checkPass = bcryptjs.compareSync(password, user.password); 
        if(!checkPass){
            throw new ErrorResponse(401, "Tài khoản không tồn tại!!");
        }
        // jwt
        const payload = {
            _id: user._id,
            username: user.username,
            role: user.role,
        };
        const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(200).json({
            statusCode: 200,
            message: 'Đăng nhập thành công',
            data: user,
            jwt: token,
        });
    }
}