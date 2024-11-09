import jwt from "jsonwebtoken";
import User from "../src/models/UserModel.js";
import handleResponse from "../config/http-response.js";

const checkUserAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (authorization && authorization.startsWith("Bearer")) {
        try {
            // Extract token from header
            const token = authorization.split(" ")[1];



            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


            const user = await User.findById({ _id: decoded.userID }).select("-password");



            if (!user) {
                return handleResponse(404, "User not found", {}, res);
            }

            // Check if user is an admin
            if (user.role !== "admin") {
                return handleResponse(403, "Access denied. Admins only.", {}, res);
            }

            // Attach user to request object
            req.user = user;
            next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                console.log("Token expired");
                return handleResponse(401, "Token expired. Please login again.", {}, res);
            } else {
                console.log("Error decoding token:", error);
                return handleResponse(401, "Invalid or unauthorized token", {}, res);
            }
        }
    } else {
        return handleResponse(401, "No token provided. Unauthorized access.", {}, res);
    }
};

export default checkUserAuth;
