import handleResponse from "../config/http-response.js";
import FooterEmail from "../src/models/FooterEmail.js";
class FooterEmailController {
  // Create news
  static addFooterEmail = async (req, resp) => {
    try {
      const { email, organizationId, title } = req.body;

      if (!email) {
        return handleResponse(404, "All fields are required", {}, resp);
      }

      const newNews = new FooterEmail({
        email,
        title,
        organizationId: organizationId,
      });

      await newNews.save();
      return handleResponse(201, "FooterEmail created successfully", newNews, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read all news
  static getAllFooterEmails = async (req, resp) => {
    try {
      const news = await FooterEmail.find({ deleted_at: null, organizationId: req.query.organizationId });
      return handleResponse(200, "All FooterEmail fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read news by ID
  static getFooterEmailById = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await FooterEmail.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "FooterEmail not found", {}, resp);
      }
      return handleResponse(200, "NeFooterEmailws fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update news by ID
  static updateFooterEmail = async (req, resp) => {
    try {
      const { id } = req.params;
      const { email, title } = req.body;

      const news = await FooterEmail.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "News not found", {}, resp);
      }

      news.email = email || news.email;
      news.email = email || news.email;
      news.title = title || news.title;


      await news.save();
      return handleResponse(200, "FooterEmail updated successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Delete news by ID
  static deleteFooterEmail = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await FooterEmail.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "FooterEmail not found", {}, resp);
      }

      news.deleted_at = new Date();

      await news.save();
      return handleResponse(200, "FooterEmail deleted successfully", {}, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default FooterEmailController;
