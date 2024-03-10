import User from "../models/user-model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(400, "All fields required"));
  }

  const newUser = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });

  try {
    await newUser.save();
    res.json("Sign Up Successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password || email === "" || password === "") {
    next(errorHandler("All fields required!"));
  }
  try {
    const vaildUser = await User.findOne({ email });
    if (vaildUser === null) {
      return next(errorHandler(400, "Error Signin Data!"));
    }
    const vaildPass = bcryptjs.compareSync(password, vaildUser.password);
    if (!vaildPass) {
      return next(errorHandler(400, "Error Signin Data!"));
    }
    const token = jwt.sign({ id: vaildUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = vaildUser._doc;
    res
      .status(200)
      .cookie("access token", token, { httpOnly: true })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
