// user.controller.js

const db = require("../models"); // Assuming you are using some ORM like Sequelize
const User = db.user;

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, roles ,fullname, phone} = req.body;
    const user = await User.create({ username, email, password , fullname, phone});

    if (roles) {
      const rolesFound = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles
          }
        }
      });
      await user.setRoles([1]);
    } else {
      await user.setRoles([2]); // default role: user
    }

    res.status(201).send({ message: "User was registered successfully!" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password,  fullname, phone,roles } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.fullname = fullname || user.fullname;
    user.phone = phone || user.phone;
    await user.save();

    if (roles) {
      const rolesFound = await Role.findAll({
        where: {
          name: {
            [Op.or]: roles
          }
        }
      });
      await user.setRoles(rolesFound);
    }

    res.send({ message: "User was updated successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    await user.destroy();
    res.send({ message: "User was deleted successfully." });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
