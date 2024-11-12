import News from "../src/models/NewsModal.js";
import handleResponse from "../config/http-response.js";

class NewsController {
  // Create news
  static Addnews = async (req, resp) => {
    try {
      const { title, category, content } = req.body;
      const files = req.files;

      const base_url = `https://everythinge.nexprism.in/`;

      if (!title || !category || !content) {
        return handleResponse(404, "All fields are required", {}, resp);
      }
      if (!files || !files.banner_image) {
        return handleResponse(404, "Banner image is required", {}, resp);
      }

      const newNews = new News({
        title: title,
        category: category,
        content: content,
        organizationId: req.query.organizationId,
      });

      if (files.banner_image) {
        newNews.banner_image = `${base_url}/${files.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await newNews.save();
      return handleResponse(201, "News created successfully", newNews, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read all news
  static getAllNews = async (req, resp) => {
    try {
      const news = await News.find({ deleted_at: null, organizationId: req.query.organizationId });
      return handleResponse(200, "All news fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read news by ID
  static getNewsById = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await News.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "News not found", {}, resp);
      }
      return handleResponse(200, "News fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update news by ID
  static updateNews = async (req, resp) => {
    try {
      const { id } = req.params;
      const { title, category, content } = req.body;
      const files = req.files;

      const base_url = `https://everythinge.nexprism.in/`;

      const news = await News.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "News not found", {}, resp);
      }

      news.title = title || news.title;
      news.category = category || news.category;
      news.content = content || news.content;

      if (files && files.banner_image) {
        news.banner_image = `${base_url}/${files.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await news.save();
      return handleResponse(200, "News updated successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Delete news by ID
  static deleteNews = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await News.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "News not found", {}, resp);
      }

      news.deleted_at = new Date();

      await news.save();
      return handleResponse(200, "News deleted successfully", {}, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default NewsController;
