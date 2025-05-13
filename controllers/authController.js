import User from "../models/User.js";
import Otp from "../models/Otp.js";
import bcrypt from "bcryptjs";
import sendEmail from "../utils/sendEmail.js";
import generateToken from "../utils/generateToken.js";

// Send OTP to email
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await Otp.create({ email, otp });
    await sendEmail(email, "OTP for Registration", `Your OTP is: ${otp}`);

    res.json({ message: "OTP sent to email" });
  } catch (error) {
    console.error("Send OTP Error:", error.message);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ error: "Email and OTP are required" });

    const record = await Otp.findOne({ email, otp });
    if (!record)
      return res.status(400).json({ error: "Invalid or expired OTP" });

    await User.findOneAndUpdate({ email }, { isVerified: true });

    res.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verify OTP Error:", error.message);
    res.status(500).json({ error: "OTP verification failed" });
  }
};

// Register new user
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hash });

    res.json({ message: "User registered. OTP sent to your email." });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ error: "Registration failed" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.isVerified)
      return res.status(400).json({ error: "Invalid email or not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = generateToken(user._id, user.role);
    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error.message);
    res.status(500).json({ error: "Login failed" });
  }
};

// import User from "../models/User.js";
// import Otp from "../models/Otp.js";
// import bcrypt from "bcryptjs";
// import sendEmail from "../utils/sendEmail";
// import generateToken from "../utils/generateToken";

// exports.sendOtp = async (req, res) => {
//   const { email } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000).toString();

//   await Otp.create({ email, otp });
//   await sendEmail(email, "OTP for Registration", `Your OTP is: ${otp}`);

//   res.json({ message: "OTP sent to email" });
// };

// exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;
//   const record = await Otp.findOne({ email, otp });

//   if (!record) return res.status(400).json({ error: "Invalid or expired OTP" });

//   const user = await User.findOneAndUpdate({ email }, { isVerified: true });
//   res.json({ message: "Email verified" });
// };

// exports.register = async (req, res) => {
//   const { name, email, password } = req.body;
//   const existing = await User.findOne({ email });

//   if (existing) return res.status(400).json({ error: "Email already exists" });
//   const hash = await bcrypt.hash(password, 10);

//   await User.create({ name, email, password: hash });
//   res.json({ message: "User registered. Please verify OTP sent to email." });
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user || !user.isVerified)
//     return res.status(400).json({ error: "Invalid email or not verified" });

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

//   const token = generateToken(user._id, user.role);
//   res.json({
//     token,
//     user: { name: user.name, email: user.email, role: user.role },
//   });
// };
