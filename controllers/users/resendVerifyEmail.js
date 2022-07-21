const { User } = require("../../models/user");

const { createError, sendMail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if(!user) {
        throw createError(404);
    }
    if(user.verify) {
        throw createError(400, "Verification has already been passed");
    }
    const mail = {
        to: email,
        subject: "Registration confirm",
        html: `<a target="_blank" href="http://127.0.0.1:3000/api/users/verify/${user.verificationToken}">Click to confirm email</a>`
    };
    await sendMail(mail);
    res.json({
        message: "Verification email sent"
    });
};

module.exports = resendVerifyEmail;