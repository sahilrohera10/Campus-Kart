const { Users } = require("../models");

// FUNCTION TO GET ALL DATA FROM MODEL "Users"

// const getUsers = async (req, res) => {
//   try {
//     const users = await Users.find();
//    return res.status(200).json({users});
//   } catch (error) {
//     return res.status(400).json({ message: error });
//   }
// };

// FUNCTION TO POST DATA TO MODEL "Users"

// const registerUser = async (req, res) => {
//   try {
//     const data = await Users.create({
//       Name: req.body.Name,
//       Email: req.body.Email,
//       Password: req.body.Password,
//     });
//     console.log(req.body);

//     res.send("User Added");
//   } catch (error) {
//     console.log("error => ", error);
//     res.status(400).send(error);
//   }
// };

//  exports

// module.exports = {
//   getUsers,
//   registerUser,
// };
