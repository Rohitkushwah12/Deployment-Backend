const User = require("../Models/User");
const { appErr } = require("../middlewares/appErr");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generateToken");

const loginCtrl = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // authenticate user
    const userFound = await User.findOne({ email });
    if (!userFound) return next(appErr("Invalid login credentials", 400));

    const matchedPassword = await bcrypt.compare(password, userFound.password);
    if (!matchedPassword) return next(appErr("Invalid login credentials", 400));

    res.status(200).json({
      status: "success",
      data: userFound,
      token: generateToken(userFound._id),
    });
  } catch (error) {
    return next(appErr(error, 500));
  }
};

const registerCtrl = async (req, res, next) => {
  const { username, name, email, password, phone } = req.body;
  try {
    // check if user is already exist
    const userFound = await User.findOne({ email });
    if (userFound) return next(appErr("user already exist", 400));

    // check all fields available
    if (!email || !password || !phone || !username || !name)
      return next(appErr("please provide all the fields"));

    // create salt and hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // save user to database
    const user = await User.create({
      name,
      email,
      phone,
      username,
      password: hashedPassword,
    });

    res.status(200).json({
      id: user._id,
      name: user.name,
      username: user.username,
      phone: user.phone,
    });
  } catch (error) {
    return next(appErr(error, 500));
  }
};

const getUsersCtrl = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "success",
      users,
    });
  } catch (error) {
    return next(appErr(error, 500));
  }
};

const updateUserCtrl = async (req, res, next) => {
  const id = req.params.id;
  try {
    if (req.body.email) {
      const { email } = req.body;
      const userFound = await User.findOne({ email });
      const updatedUser = await User.findById(id);

      if (!userFound._id.equals(updatedUser._id))
        return next(appErr("email is already taken", 400));
    }

    if (req.body.password) {
      const { password } = req.body;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await User.findByIdAndUpdate(
        id,
        { ...req.body, password: hashedPassword },
        { new: true, runValidators: true }
      );
      res.status(200).json({
        status: "success",
        data: user,
      });
    } else {
      const user = await User.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        status: "succcess",
        data: user,
      });
    }
  } catch (error) {
    return next(appErr(error, 500));
  }
};

const deleteUserCtrl = async (req, res, next) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({
      status: "sucesss",
      message: "Deleted successfully",
    });
  } catch (error) {
    return next(appErr(error, 500));
  }
};

module.exports = {
  loginCtrl,
  registerCtrl,
  getUsersCtrl,
  updateUserCtrl,
  deleteUserCtrl,
};
