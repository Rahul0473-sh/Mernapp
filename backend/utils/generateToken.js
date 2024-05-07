import jwt from "jsonwebtoken"
const generateTokenandSetcookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        secure:process.env.NODE_ENV!=="devlopment",
    })
}
export default generateTokenandSetcookie;