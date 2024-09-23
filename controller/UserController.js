import User from "../src/models/UserModel.js";
import handleResponse from "../config/http-response.js";
import bcrypt from "bcrypt"
import { watch } from "fs";
import jwt from "jsonwebtoken"


class UserController {
    //register
    static RegisterUser = async (req, resp) => {
        try {
            const { name, email, password, conf_password } = req.body;

            if (!name || !email || !password || !conf_password) {
                return handleResponse(400, "All fields are required", {}, resp)
            }

            if (password !== conf_password) {
                return handleResponse(400, "Passwords do not match", {}, resp)
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)


            const registerAdmin = new User({
                name: name,
                email: email,
                password: hashedPassword,
                role: "admin"
            })

            await registerAdmin.save()

            return handleResponse(201, "User registered successfully", {}, resp)
        } catch (err) {
            return handleResponse(500, err.message, {}, resp)
        }
    }


    static LoginUser = async (req, resp) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email: email })
            if (!user) {
                return handleResponse(404, "User not found", {}, resp)
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return handleResponse(401, "Invalid credentials", {}, resp)
            }


            const token = jwt.sign(
                {
                    userID: user._id,
                    role: user.role,
                },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2d" }
            );


            handleResponse(200, "Login Success", token, resp);

        } catch (err) {
            console.log("err", err);
            return handleResponse(500, err.message, {}, resp)
        }
    }


    static GetUserProfile = async (req, resp) => {
        try {
            const user = req.user;
            console.log("user",user);
            

            const userData = await User.findOne({ id: user.id })
            if (!userData) {
                return handleResponse(404, "User not found", {}, resp)
            }
            return handleResponse(200, "User data", userData, resp)
        } catch (err) {
            return handleResponse(500, err.message, {}, resp)
        }
    }

    static changePassword = async (req, resp) => {
        try {

            const user = req.user;

            const userData = await User.findOne({ id: user.id })

            if (!userData) {
                return handleResponse(404, "User not found", {}, resp)
            }

            const { oldPassword, newPassword, conf_password } = req.body;

            if (!oldPassword || !newPassword || !conf_password) {
                return handleResponse(400, "all fields are required", {}, resp)
            }

            if (newPassword !== conf_password) {
                return handleResponse(400, "Passwords do not match", {}, resp)
            }


            const isMatch = await bcrypt.compare(oldPassword, userData.password)

            if (!isMatch) {
                return handleResponse(401, "Invalid credentials", {}, resp)
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(newPassword, salt)

            userData.password = hashedPassword;
            await userData.save()
            return handleResponse(200, "Password changed successfully", {}, resp)

        } catch (err) {
            return handleResponse(500, err.message, {}, resp)
        }
    }
}

export default UserController;