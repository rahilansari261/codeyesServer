import express from "express"
import UserController from "../controller/UserController.js"
import ContactUsController from "../controller/ContactUsController.js"
import BlogTagsController from "../controller/BlogTagsController.js"
import BlogCategoryController from "../controller/BlogCategoryController.js"
import BlogController from "../controller/BlogController.js"
import { multipleProductUploads } from "./multerRoutesSetting.js"
import NewsController from "../controller/NewsColntroller.js"
import checkUserAuth from "../middlweware/admin-auth-middleware.js"

const router = express.Router()


router.post("/register", UserController.RegisterUser)
router.post("/login", UserController.LoginUser)
router.get("/get-user",checkUserAuth,UserController.GetUserProfile)


router.get("/get-contact-us", ContactUsController.GetAllContactUs)
router.get("/get-contact-us/:id", ContactUsController.GetContactUsById)


router.post("/add-blog-tag", BlogTagsController.AddBlogTagsController)
router.get("/get-blog-tag", BlogTagsController.GetAllBlogTagsController)
router.get("/get-blog-tag/:id", BlogTagsController.GetSingleBlogTagController)
router.put("/edit-blog-tag/:id", BlogTagsController.UpdateBlogTagsController)
router.delete("/delete-blog-tag/:id", BlogTagsController.DeleteBlogTagsController)


router.get("/get-blog-category", BlogCategoryController.GetAllBlogCategoriesController)
router.post("/add-blog-category", BlogCategoryController.AddBlogCategoryController)
router.get("/get-blog-category/:id", BlogCategoryController.GetSingleBlogCategoryController)
router.put("/edit-blog-category/:id", BlogCategoryController.UpdateBlogCategoryController)
router.delete("/delete-blog-category/:id", BlogCategoryController.DeleteBlogCategoryController)


router.get("/get-blog", BlogController.GetAllBlogs)
router.post("/add-blog", multipleProductUploads, BlogController.AddBlog)
router.get("/get-blog/:id", BlogController.GetBlogById)
router.put("/edit-blog/:id", multipleProductUploads, BlogController.UpdateBlog)
router.delete("/delete-blog/:id", BlogController.DeleteBlog)



router.get("/all-news", NewsController.getAllNews)
router.post("/add-news",multipleProductUploads, NewsController.Addnews)
router.get("/get-news/:id", NewsController.getNewsById)
router.put("/edit-news/:id",multipleProductUploads, NewsController.updateNews)
router.delete("/delete-news/:id", NewsController.deleteNews)




export default router