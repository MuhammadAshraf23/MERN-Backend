import bcrypt from "bcrypt";
import User from "../models/userSchema.js";

// Signup function
export const userSignup = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber } = req.body;

  if (!firstName || !lastName || !email || !password || !phoneNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }
    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
      phoneNumber,
    });

    // Save the user in the database
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Login function
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  try {
    console.log("req", req.body);
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    // Authentication successful
    res.status(200).json({ message: "User logged in successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};
