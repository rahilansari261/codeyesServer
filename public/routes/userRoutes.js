import express from "express"
import ContactUsController from "../controller/ContactUsController.js"
import BlogController from "../controller/BlogController.js"
import NewsController from "../controller/NewsColntroller.js"

const router = express.Router()

router.post("/contact-us", ContactUsController.AddContactUs)
router.get("/get-blogs", BlogController.GetAllBlogs)
router.get("/get-blog/:id", BlogController.GetBlogById)
router.get("/get-news", NewsController.getAllNews)

export default router