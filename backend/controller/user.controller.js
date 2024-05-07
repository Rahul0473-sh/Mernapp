import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import generateTokenandSetcookie from "../utils/generateToken.js";

export const getUsersForSideBar = async(req,res) => {
   try {
		const loggedInUserId = req.user._id;

		const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
}
export const login = async(req, res) => {
	try {
		const { username, password } = req.body;
		console.log(username, password);
		const user = await User.findOne({ username }); 

		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
		
		console.log(isPasswordCorrect)

		if (!user || !isPasswordCorrect) {
			 return res.status(400).json({ error: "Password or Username is invalid" });
		}
		generateTokenandSetcookie(user._id, res);
		res.status(200).json({
			_id: user.id,
			fullName: user.fullName,
			username: user.username,
			profilePic: user.profilePic,
		});
	} catch (error) {
		console.log("Error in login,user.controller", error.message);
		res.status(500).json({ error: "Internal Error" });
	}
}
export const logout = async (req, res) => {
	try {
	res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout", error.message);
		res.status(200).json({ error: error.message });
	}

}