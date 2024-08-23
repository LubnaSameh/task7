const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/.test(v);
            },
            message: props => `${props.value} is not a strong enough password.`
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
    },
    age: {
        type: Number,
        default: 18
    },
    city: {
        type: String,
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

// Hash the password before saving the user
userSchema.pre("save", async function () {
    const user = this;
    if (user.isModified("password")) {
        user.password = await bcryptjs.hash(user.password, 8);
    }
});



// Find user by credentials
userSchema.statics.findByCredentials = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Unable to login');
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Unable to login');
    }
    return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
