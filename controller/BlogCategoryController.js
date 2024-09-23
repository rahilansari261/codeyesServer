import handleResponse from "../config/http-response.js";
import BlogCategory from "../src/models/BlogCategories.js";

class BlogCategoryController {
    // Create Blog Category
    static AddBlogCategoryController = async (req, resp) => {
        try {
            const { name, description } = req.body;

            if (!name) {
                return handleResponse(400, "Blog category name is required", {}, resp);
            }

            const newBlogCategory = new BlogCategory({
                name,
                description: description || null
            });

            await newBlogCategory.save();

            return handleResponse(201, "Blog category created successfully", newBlogCategory, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };

    // Get all Blog Categories
    static GetAllBlogCategoriesController = async (req, resp) => {
        try {
            const blogCategories = await BlogCategory.find({ deleted_at: null })
            return handleResponse(200, "Blog categories fetched successfully", blogCategories, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };

    // Get single Blog Category by ID
    static GetSingleBlogCategoryController = async (req, resp) => {
        try {
            const { id } = req.params;

            const blogCategory = await BlogCategory.findOne({ id })

            if (!blogCategory) {
                return handleResponse(404, "Blog category not found", {}, resp);
            }

            return handleResponse(200, "Blog category fetched successfully", blogCategory, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };

    // Update Blog Category
    static UpdateBlogCategoryController = async (req, resp) => {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            if (!name) {
                return handleResponse(400, "Blog category name is required", {}, resp);
            }

            const updatedBlogCategory = await BlogCategory.findOne(
                { id: id, deleted_at: null },
            );

            updatedBlogCategory.name = name
            updatedBlogCategory.description = description

            if (!updatedBlogCategory) {
                return handleResponse(404, "Blog category not found", {}, resp);
            }

            await updatedBlogCategory.save();

            return handleResponse(200, "Blog category updated successfully", updatedBlogCategory, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };

    // Delete Blog Category (soft delete)
    static DeleteBlogCategoryController = async (req, resp) => {
        try {
            const { id } = req.params;

            const deletedBlogCategory = await BlogCategory.findOneAndUpdate(
                { id: id },
                { deleted_at: new Date() },
                { new: true }
            );

            if (!deletedBlogCategory) {
                return handleResponse(404, "Blog category not found", {}, resp);
            }

            return handleResponse(200, "Blog category deleted successfully", deletedBlogCategory, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    };
}

export default BlogCategoryController;
