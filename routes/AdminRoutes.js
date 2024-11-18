import express from "express";
import UserController from "../controller/UserController.js";
import ContactUsController from "../controller/ContactUsController.js";
import BlogTagsController from "../controller/BlogTagsController.js";
import BlogCategoryController from "../controller/BlogCategoryController.js";
import BlogController from "../controller/BlogController.js";
import { multiplePortfolioUploads, multipleProductUploads, testimonialImageUploads } from "./multerRoutesSetting.js";
import NewsController from "../controller/NewsColntroller.js";
import checkUserAuth from "../middlweware/admin-auth-middleware.js";
import ServiceController from "../controller/ServiceController.js";
import PortfolioController from "../controller/PortfolioController.js";
import TestimonialTextController from "../controller/TestimonialTextController.js";
import OurTeamController from "../controller/OurTeamController.js";
import FooterEmailController from "../controller/FooterEmailController.js";
import ClientLogoController from "../controller/ClientLogoController.js";
import HomeLogoController from "../controller/HomeLogoController.js";
import TestimonialVideoController from "../controller/TestimonialVideoController.js";
const router = express.Router();

router.post("/register", UserController.RegisterUser);
router.post("/login", UserController.LoginUser);
router.get("/get-user", checkUserAuth, UserController.GetUserProfile);

router.get("/get-all-contact-us", ContactUsController.GetAllContactUs);
router.get("/get-contact-us/:id", ContactUsController.GetContactUsById);
router.post("/add-contact-us", ContactUsController.AddContactUs);

router.post("/add-blog-tag", BlogTagsController.AddBlogTagsController);
router.get("/get-blog-tag", BlogTagsController.GetAllBlogTagsController);
router.get("/get-blog-tag/:id", BlogTagsController.GetSingleBlogTagController);
router.put("/edit-blog-tag/:id", BlogTagsController.UpdateBlogTagsController);
router.delete("/delete-blog-tag/:id", BlogTagsController.DeleteBlogTagsController);

router.get("/get-blog-category", BlogCategoryController.GetAllBlogCategoriesController);
router.post("/add-blog-category", BlogCategoryController.AddBlogCategoryController);
router.get("/get-blog-category/:id", BlogCategoryController.GetSingleBlogCategoryController);
router.put("/edit-blog-category/:id", BlogCategoryController.UpdateBlogCategoryController);
router.delete("/delete-blog-category/:id", BlogCategoryController.DeleteBlogCategoryController);

router.get("/get-blog", BlogController.GetAllBlogs);
router.get("/get-hot-blog", BlogController.GetAllHotBlogs);
router.get("/get-famous-blog", BlogController.GetAllFamousBlogs);
router.post("/add-blog", multipleProductUploads, BlogController.AddBlog);
router.get("/get-blog/:id", BlogController.GetBlogById);
router.put("/edit-blog/:id", multipleProductUploads, BlogController.UpdateBlog);
router.delete("/delete-blog/:id", BlogController.DeleteBlog);

router.post("/blogs/:id/comments", BlogController.addComment);
router.post("/blogs/:id/comments/:commentId/replies", BlogController.addReply);

router.get("/all-news", NewsController.getAllNews);
router.post("/add-news", multipleProductUploads, NewsController.Addnews);
router.get("/get-news/:id", NewsController.getNewsById);
router.put("/edit-news/:id", multipleProductUploads, NewsController.updateNews);
router.delete("/delete-news/:id", NewsController.deleteNews);

router.get("/all-client-logo", ClientLogoController.getAllLogos);
router.post("/add-client-logo", multipleProductUploads, ClientLogoController.addLogo);
router.get("/get-client-logo/:id", ClientLogoController.getLogoById);
router.put("/edit-client-logo/:id", multipleProductUploads, ClientLogoController.updateLogo);
router.delete("/delete-client-logo/:id", ClientLogoController.deleteLogo);

router.get("/all-home-logo", HomeLogoController.getAllLogos);
router.post("/add-home-logo", multipleProductUploads, HomeLogoController.addLogo);
router.get("/get-home-logo/:id", HomeLogoController.getLogoById);
router.put("/edit-home-logo/:id", multipleProductUploads, HomeLogoController.updateLogo);
router.delete("/delete-home-logo/:id", HomeLogoController.deleteLogo);

router.get("/all-services", ServiceController.getAllServices);
router.post("/add-service", ServiceController.addService);
router.get("/get-service/:id", ServiceController.getServiceById);
router.put("/edit-service/:id", ServiceController.updateService);
router.delete("/delete-service/:id", ServiceController.deleteService);

router.get("/all-portfolio", PortfolioController.GetAllPortfolios);
router.post("/add-portfolio", multiplePortfolioUploads, PortfolioController.AddPortfolio);
router.get("/get-portfolio/:id", PortfolioController.GetPortfolioById);
router.put("/edit-portfolio/:id", multiplePortfolioUploads, PortfolioController.UpdatePortfolio);
router.delete("/delete-portfolio/:id", PortfolioController.DeletePortfolio);

router.get("/all-testimonial-video", TestimonialVideoController.getAllTestimonialVideos);
router.post("/add-testimonial-video", TestimonialVideoController.addTestimonialVideo);
router.get("/get-testimonial-video/:id", TestimonialVideoController.getTestimonialVideoById);
router.put("/edit-testimonial-video/:id", TestimonialVideoController.updateTestimonialVideo);
router.delete("/delete-testimonial-video/:id", TestimonialVideoController.deleteTestimonialVideo);

router.get("/all-testimonial-text", TestimonialTextController.GetAllTestimonialTexts);
router.post("/add-testimonial-text", testimonialImageUploads, TestimonialTextController.AddTestimonialText);
router.get("/get-testimonial-text/:id", TestimonialTextController.GetTestimonialTextById);
router.put("/edit-testimonial-text/:id", testimonialImageUploads, TestimonialTextController.UpdateTestimonialText);
router.delete("/delete-testimonial-text/:id", TestimonialTextController.DeleteTestimonialText);

router.get("/all-our-team", OurTeamController.GetAllOurTeams);
router.post("/add-our-team", testimonialImageUploads, OurTeamController.AddOurTeam);
router.get("/get-our-team/:id", OurTeamController.GetOurTeamById);
router.put("/edit-our-team/:id", testimonialImageUploads, OurTeamController.UpdateOurTeam);
router.delete("/delete-our-team/:id", OurTeamController.DeleteOurTeam);

router.get("/all-footer-email", FooterEmailController.getAllFooterEmails);
router.post("/add-footer-email", FooterEmailController.addFooterEmail);
router.get("/get-footer-email/:id", FooterEmailController.getFooterEmailById);
router.put("/edit-footer-email/:id", FooterEmailController.updateFooterEmail);
router.delete("/delete-footer-email/:id", FooterEmailController.deleteFooterEmail);
router.get("/hello/rahil", (req, res) => {
    res.send("Hello Rahil");
});
export default router;
