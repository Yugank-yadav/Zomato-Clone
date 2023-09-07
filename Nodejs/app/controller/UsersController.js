const UsersModel = require("../model/UsersModel");
const UsersController = {
  userSignUp: async (req, res) => {
    let data = req.body;
    let password = data.password;
    let saltRound = 10;
    // insert user
    try {
      let salt = await bcrypt.genSalt(saltRound);
      let hashPassword = await bcrypt.hash(password, salt);
      const newUser = new UsersModel({
        email: data.email,
        password: hashPassword,
        firstname: data.firstname ? data.firstname : undefined,
        lastname: data.lastname ? data.lastname : undefined,
      });

      let result = await UsersModel.findOne({ email: data.email });
      // check already exist email
      if (result) {
        res.status(200).send({
          status: false,
          message: "Email id is already exist, user other email id",
        });
      } else {
        let saveResult = await newUser.save();
        res.status(200).send({
          status: true,
          result: saveResult,
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
  userLogin: async (req, res) => {
    let data = req.body;
    try {
      let result = await UsersModel.findOne({
        email: data.email,
      });
      if (result) {
        let isPasswordMatch = await bcrypt.compare(
          data.password,
          result.password
        );
        if (isPasswordMatch) {
          let { _id, email, firstname, lastname } = result;
          res.status(200).send({
            status: true,
            result: {
              _id,
              email,
              firstname,
              lastname,
            },
            message: "Login successfully !!!",
          });
        } else {
          res.status(200).send({
            status: false,
            message: "Password is wrong.",
          });
        }
      } else {
        res.status(200).send({
          status: false,
          message: "Username is wrong.",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "server error",
        error,
      });
    }
  },
};

module.exports = UsersController;
