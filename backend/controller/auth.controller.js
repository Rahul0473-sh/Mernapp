import generateTokenandSetcookie from "../utils/generateToken.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      res.json({error:"Password must be match"})
    }
    
    const user = await User.findOne({ username });
    if (user) { 
      res.json({ error: "User already exist" });
    }
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const profilePic=(gender === "male") ? boyProfilePic : girlProfilePic
  
    const newuser = new User({
      username,
      fullName,
      password,
      gender,
      profilePic,
    })
    await newuser.save();
    // generate cookies here 
    console.log(newuser._id);

generateTokenandSetcookie(newuser._id, res);

    res.status(200).json({ 
      message: "success",
      _id:newuser._id,
      fullName: newuser.fullName,
      username: newuser.username,
      profilePic:newuser.profilePic, 
     });
  } catch (error) {
    console.log(`Error in authcontroller ${error.message}`);
  }
};


export const login = async (req, res) => {
  try {
    console.log("hello");
  } catch (error) {
    console.log("Error in login", error.message);
  }
}
export const logout = (req, res) => {
  res.send("logout");      
};

