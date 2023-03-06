
var userService =  require('../services/authService');

const registerUser = async (req, res, next) =>
{
    const { firstname, lastname, email, phonenumber, password } = req.body;
    try
    {
        console.log(req.body);
        var status = await userService.registerUserService({
            firstname,
            lastname,
            email,
            phonenumber,
            password });
        console.log(status);

        if (status) {
            res.send({ "message": "User created successfully" });
        } else {
            res.send({ "message": "Error creating user" });
        }
    }
    catch(err)
    {
        next(err);
        console.log(err);
    }
}

const loginUser = async (req, res) => {

}

module.exports = { registerUser, loginUser };