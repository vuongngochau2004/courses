const mongoose = require("mongoose");
async function connect() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/demo_nodejs");
    console.log("Connect success!!");
    
  } catch (error) {
    console.log("Connect failure!!");
  }
}
module.exports = { connect };
