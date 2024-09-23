import express from "express"
import ContactUsController from "../controller/ContactUsController.js"
import BlogController from "../controller/BlogController.js"

const router = express.Router()

router.post("/contact-us", ContactUsController.AddContactUs)
router.get("/get-blogs", BlogController.GetAllBlogs)
router.get("/get-blog/:id", BlogController.GetBlogById)

export default router