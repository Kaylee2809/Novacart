const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d"
    }
  );
};

exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;

    const existing =
      await User.findOne({ email });

    if (existing) {

      return res.status(400).json({
        message: "User already exists"
      });

    }

    const hashed =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        name,
        email,
        password: hashed
      });

    res.status(201).json({
      token: createToken(user),
      user
    });

  } catch (error) {

    res.status(500).json(error);

  }
};

exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

    const valid =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!valid) {

      return res.status(400).json({
        message: "Invalid credentials"
      });

    }

   res.json({
  token: createToken(user),
  user: {
    id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin
  }
});

  } catch (error) {

    res.status(500).json(error);

  }
};
