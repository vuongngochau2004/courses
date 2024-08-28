const userModel = require('../models/user.model'); 

module.exports = {
    getAllUser: async (req, res) => {
        const users = await userModel.find();
        return res.status(200).json(users);
    }, 
}