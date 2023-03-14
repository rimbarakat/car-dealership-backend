var userModel = require('../models/userModel');
var key = '1a2b3c4d5e6f7g8h9i';
var encryptor = require('simple-encryptor')(key);

module.exports.registerUserService = async (userDetails) => {
    const { firstname, lastname, email, phonenumber, password } = userDetails;
    const userExists = await userModel.findOne({email}, {maxTimeMS: 30000});
    if (userExists) {
        throw {status: 409, message: 'Email already registered'};
    }

    const encrypted = encryptor.encrypt(password);
    const newUser = new userModel({
        firstname,
        lastname,
        email,
        phonenumber,
        password: encrypted
    });

    try {
        const savedUser = await newUser.save();
        return { status: 201, message: 'User registered successfully', data: savedUser };
    } catch (err) {
        throw { status: 500, message: 'Internal server error' };
    }
}
module.exports.loginUserService = (userDetails)=>
{
    ////////// hekmat code
}