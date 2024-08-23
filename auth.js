const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


// Instance method to generate auth token
userSchema.methods.generateToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, 'your_jwt_secret_key'); // Replace 'your_jwt_secret_key' with your actual secret key

    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
