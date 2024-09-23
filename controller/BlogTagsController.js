import BlogTags from "../src/models/BlogTags.js";
import handleResponse from "../config/http-response.js";

class BlogTagsController {
    // Add Blog Tag
    static AddBlogTagsController = async (req, resp) => {
        try {
            const { name } = req.body;

            if (!name) {
                return handleResponse(400, "Blog tag name is required", {}, resp);
            }

            const newBlogTags = new BlogTags({
                name: name
            });

            await newBlogTags.save();

            return handleResponse(201, "Blog tag created successfully", newBlogTags, resp);

        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    }

    // Get all Blog Tags
    static GetAllBlogTagsController = async (req, resp) => {
        try {
            const blogTags = await BlogTags.find({ deleted_at: null });
            return handleResponse(200, "Blog tags fetched successfully", blogTags, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    }

    // Get single Blog Tag by ID
    static GetSingleBlogTagController = async (req, resp) => {
        try {
            const { id } = req.params;

            const blogTag = await BlogTags.findOne({ id });

            if (!blogTag) {
                return handleResponse(404, "Blog tag not found", {}, resp);
            }

            return handleResponse(200, "Blog tag fetched successfully", blogTag, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    }

    // Update Blog Tag
    static UpdateBlogTagsController = async (req, resp) => {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return handleResponse(400, "Blog tag name is required", {}, resp);
            }

            const updatedBlogTag = await BlogTags.findOne({ id: id });


            if (!updatedBlogTag) {
                return handleResponse(404, "Blog tag not found", {}, resp);
            }

            updatedBlogTag.name = name;
            await updatedBlogTag.save()

            return handleResponse(200, "Blog tag updated successfully", updatedBlogTag, resp);

        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    }

    // Delete Blog Tag
    static DeleteBlogTagsController = async (req, resp) => {
        try {
            const { id } = req.params;

            const deletedBlogTag = await BlogTags.findOne({ id });

            if (!deletedBlogTag) {
                return handleResponse(404, "Blog tag not found", {}, resp);
            }


            deletedBlogTag.deleted_at = new Date()
            await deletedBlogTag.save()

            return handleResponse(200, "Blog tag deleted successfully", deletedBlogTag, resp);
        } catch (err) {
            return handleResponse(500, err.message, {}, resp);
        }
    }
}

export default BlogTagsController;
