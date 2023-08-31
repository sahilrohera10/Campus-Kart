const userModel = require("../Models/Users");

module.exports = {
  register,
  getuser,
};

async function getuser(req, res) {
  try {
    const id = req.params.id;
    const user = await userModel.findOne({ _id: id });
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.statu(400).json({ error: error });
  }
}

async function register(req, res) {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email: email });
    if (user) {
      return res
        .status(200)
        .json({ message: "user already registed", data: user });
    }

    const newUser = await userModel.create(req.body);

    return res
      .status(200)
      .json({ message: "new user registered succussfully", data: newUser });
  } catch (error) {
    return res.status(400).json({ error: error });
  }
}
