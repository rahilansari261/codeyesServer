import handleResponse from "../config/http-response.js";
import BlogCategory from "../src/models/BlogCategories.js";
import Portfolio from "../src/models/Portfolio.js";


class PortfolioController {
  // Add a new blog
  static AddPortfolio = async (req, resp) => {
    try {
      const base_url = `https://everythinge.nexprism.in/`;
      const { title, tags, category, content, sub_title, client, organizationId } = req.body;

      const images = req.files; // Expecting `req.files` to contain an array of images
      console.log("images", images);

      if (!title || !category || !content || !client || !sub_title) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      const newPortfolio = new Portfolio({
        title,
        tags: tags || [],
        sub_title,
        client,
        category,
        content,
        organizationId,
      });

      if (images && images.banner_image) {
        newPortfolio.banner_images = images.banner_image.map(img => `${base_url}/${img.path.replace(/\\/g, "/")}`);
      }

      console.log("newPortfolio", newPortfolio);

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
      const images = req.files;
      const base_url = `https://everythinge.nexprism.in/`;

      if (!title || !category || !content) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      let portfolio = await Portfolio.findOne({ id: id });
      if (!portfolio) {
        return handleResponse(404, "Portfolio not found", {}, resp);
      }

      portfolio.title = title;
      portfolio.tags = tags || [];
      portfolio.category = category;
      portfolio.content = content;
      portfolio.sub_title = sub_title;
      portfolio.client = client;

      // Update banner images if new images are provided
      if (images && images.banner_image) {
        portfolio.banner_image = images.banner_image.map(img => `${base_url}/${img.path.replace(/\\/g, "/")}`);
      }

      await portfolio.save();

      return handleResponse(200, "Portfolio updated successfully", portfolio, resp);
    } catch (err) {
      console.error("Error updating portfolio:", err);
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
