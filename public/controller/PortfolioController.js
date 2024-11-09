import handleResponse from "../config/http-response.js";
import BlogCategory from "../src/models/BlogCategories.js";
import Portfolio from "../src/models/PortfolioModal.js";

class PortfolioController {
  // Add a new blog
  static AddPortfolio = async (req, resp) => {
    try {
      const base_url = `${req.protocol}://${req.get("host")}`;
      const { title, tags, category, content, sub_title, client } = req.body;

      const image = req.files;
      console.log("image", image);

      if (!title || !category || !content || !client || !sub_title) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      const newPortfolio = new Portfolio({
        title,
        // banner_image,
        tags: tags || [],
        sub_title,
        client,
        category,
        content,
        organizationId: req.query.organizationId,
      });

      if (image && image.banner_image) {
        newPortfolio.banner_image = `${base_url}/${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await newPortfolio.save();

      return handleResponse(201, "Portfolio created successfully", newPortfolio, resp);
    } catch (err) {
      console.log("err", err);
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get all blogs
  static GetAllPortfolios = async (req, resp) => {
    try {
      const blogs = await Portfolio.find({ deleted_at: null, organizationId: req.query.organizationId }).lean().sort({ createdAt: -1 });

      for (const key of blogs) {
        if (key.category) {
          key.category = await BlogCategory.findOne({ id: key.category });
        }
      }

      return handleResponse(200, "Portfolios fetched successfully", blogs, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get a single blog by ID
  static GetPortfolioById = async (req, resp) => {
    try {
      const { id } = req.params;

      const blog = await Portfolio.findOne({ id: id }).lean();

      if (!blog) {
        return handleResponse(404, "Portfolio not found", {}, resp);
      }

      if (blog.category) {
        blog.category = await BlogCategory.findOne({ id: blog.category });
      }

      return handleResponse(200, "Portfolio fetched successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update a blog
  static UpdatePortfolio = async (req, resp) => {
    try {
      const { id } = req.params;
      const { title, tags, category, content, client, sub_title } = req.body;
      const image = req.files;

      if (!title || !category || !content) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      let blog = await Portfolio.findOne({ id: id });
      if (!blog) {
        return handleResponse(404, "Portfolio not found", {}, resp);
      }

      blog.title = title;
      blog.tags = tags || [];
      blog.category = category;
      blog.content = content;
      blog.sub_title = sub_title;
      blog.client = client;

      if (image && image.banner_image) {
        blog.banner_image = `${req.protocol}://${req.get("host")}/${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await blog.save();

      return handleResponse(200, "Portfolio updated successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Soft delete a blog (set deleted_at)
  static DeletePortfolio = async (req, resp) => {
    try {
      const { id } = req.params;

      const deletedPortfolio = await Portfolio.findOneAndUpdate({ id: id }, { deleted_at: new Date() }, { new: true });

      if (!deletedPortfolio) {
        return handleResponse(404, "Portfolio not found", {}, resp);
      }

      return handleResponse(200, "Portfolio deleted successfully", deletedPortfolio, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default PortfolioController;
