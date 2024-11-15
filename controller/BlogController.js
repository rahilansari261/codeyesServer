import handleResponse from "../config/http-response.js";
import BlogCategory from "../src/models/BlogCategories.js";
import Blog from "../src/models/BlogModal.js";

class BlogController {
  // Add a new blog
  static AddBlog = async (req, resp) => {
    try {
      const base_url = `https://everythinge.nexprism.in/`;
      const { title, tags, category, content } = req.body;

      const image = req.files;
      console.log("image", image);

      if (!title || !category || !content) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      const newBlog = new Blog({
        title,
        // banner_image,
        tags: tags || [],
        category,
        content,
        organizationId: req.query.organizationId,
      });

      if (image && image.banner_image) {
        newBlog.banner_image = `${base_url}/${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await newBlog.save();

      return handleResponse(201, "Blog created successfully", newBlog, resp);
    } catch (err) {
      console.log("err", err);
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get all blogs
  static GetAllBlogs = async (req, resp) => {
    try {
      const blogs = await Blog.find({ deleted_at: null, organizationId: req.query.organizationId }).lean().sort({ createdAt: -1 });

      for (const key of blogs) {
        if (key.category) {
          key.category = await BlogCategory.findOne({ id: key.category });
        }
      }

      return handleResponse(200, "Blogs fetched successfully", blogs, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  static GetAllHotBlogs = async (req, resp) => {
    try {
      const blogs = await Blog.find({ deleted_at: null, organizationId: req.query.organizationId, blogType: "hot" }).lean().sort({ createdAt: -1 });

      for (const key of blogs) {
        if (key.category) {
          key.category = await BlogCategory.findOne({ id: key.category });
        }
      }

      return handleResponse(200, "Blogs fetched successfully", blogs, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  static GetAllFamousBlogs = async (req, resp) => {
    try {
      const blogs = await Blog.find({ deleted_at: null, organizationId: req.query.organizationId, blogType: "famous" }).lean().sort({ createdAt: -1 });

      for (const key of blogs) {
        if (key.category) {
          key.category = await BlogCategory.findOne({ id: key.category });
        }
      }

      return handleResponse(200, "Blogs fetched successfully", blogs, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get a single blog by ID
  static GetBlogById = async (req, resp) => {
    try {
      const { id } = req.params;

      const blog = await Blog.findOne({ id: id }).lean();

      if (!blog) {
        return handleResponse(404, "Blog not found", {}, resp);
      }

      if (blog.category) {
        blog.category = await BlogCategory.findOne({ id: blog.category });
      }

      return handleResponse(200, "Blog fetched successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update a blog
  static UpdateBlog = async (req, resp) => {
    try {
      const { id } = req.params;
      const { title, tags, category, content } = req.body;
      const image = req.files;

      if (!title || !category || !content) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      let blog = await Blog.findOne({ id: id });
      if (!blog) {
        return handleResponse(404, "Blog not found", {}, resp);
      }

      blog.title = title;
      blog.tags = tags || [];
      blog.category = category;
      blog.content = content;

      if (image && image.banner_image) {
        blog.banner_image = `https://everythinge.nexprism.in//${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await blog.save();

      return handleResponse(200, "Blog updated successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Soft delete a blog (set deleted_at)
  static DeleteBlog = async (req, resp) => {
    try {
      const { id } = req.params;

      const deletedBlog = await Blog.findOneAndUpdate({ id: id }, { deleted_at: new Date() }, { new: true });

      if (!deletedBlog) {
        return handleResponse(404, "Blog not found", {}, resp);
      }

      return handleResponse(200, "Blog deleted successfully", deletedBlog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  static addComment = async (req, res) => {
    const { id } = req.params;
    const { user, content } = req.body;

    try {
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      blog.comments.push({ user, content });
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  static addReply = async (req, res) => {
    const { id, commentId } = req.params;
    const { user, content } = req.body;

    try {
      const blog = await Blog.findById(id);
      if (!blog) return res.status(404).json({ message: "Blog not found" });

      const comment = blog.comments.id(commentId);
      if (!comment) return res.status(404).json({ message: "Comment not found" });

      comment.replies.push({ user, content });
      await blog.save();
      res.status(200).json(blog);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

export default BlogController;
