const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const idGenerate = require("bson-objectid");

const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const register = async(req, res)=> {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(user) {
        throw createError(409, "Email in use");
    };
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url.apply(email);
    const verificationToken = idGenerate();
    const result = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken
    });
    const mail = {
        to: email,
        subject: "Registration confirm",
        html: `<a target="_blank" href="http://127.0.0.1:3000/api/users/verify/${verificationToken}">Click to confirm email</a>`
    };
    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
        }
    })
    await sendMail(mail);
};

module.exports = register;