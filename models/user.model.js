const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
      },
    fullname: {
      type: String,
      required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
    },
    {
      versionKey:false, 
      timestamps: true
    }
);

userSchema.pre('save', function (next) {
  const user = this;
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }
  next();
});

userSchema.pre('findOneAndUpdate', function (next) {
  const user = this.getUpdate();
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }

  this.setUpdate(user);
  next();
});

userSchema.pre('findByIdAndUpdate', function (next) {
  const user = this.getUpdate();
  if (user.password) {
    user.password = bcryptjs.hashSync(user.password, 10);
  }

  this.setUpdate(user);
  next();
});

userSchema.set("toJSON", {
  transform: function(doc, ret, options) {
    delete ret.password;
  }
})

module.exports = mongoose.model('user', userSchema)