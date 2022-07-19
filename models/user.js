const { Schema, model } = require("mongoose");
const Joi = require("joi");

const subscription = ["starter", "pro", "business"];
const emailRegexp = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;

const userSchema = Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: emailRegexp,
        unique: true,
    },
    subscription: {
        type: String,
        enum: subscription,
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
    avatarURL: {
        type: String,
        required: true,
    },
}, {versionKey: false, timestamps: true});

const User = model("user", userSchema);

const user = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().required(),
    subscription: Joi.string().valueOf(...subscription),
    token: Joi.string(),
});

const schemas = {
    user,
};

module.exports = {
    User,
    schemas,
};