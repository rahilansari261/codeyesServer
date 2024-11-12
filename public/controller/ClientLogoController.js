import handleResponse from "../config/http-response.js";
import ClientLogo from "../src/models/ClientLogo.js";
class ClientLogoController {
  // Create news
  static addLogo = async (req, resp) => {
    try {
      const { title } = req.body;
      const files = req.files;

      const base_url = `https://everythinge.nexprism.in/`;

      if (!title) {
        return handleResponse(404, "All fields are required", {}, resp);
      }
      if (!files || !files.banner_image) {
        return handleResponse(404, "Banner image is required", {}, resp);
      }

      const newNews = new ClientLogo({
        title: title,
        organizationId: req.query.organizationId,
      });

      if (files.banner_image) {
        newNews.banner_image = `${base_url}/${files.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await newNews.save();
      return handleResponse(201, "Logo created successfully", newNews, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read all news
  static getAllLogos = async (req, resp) => {
    try {
      const news = await ClientLogo.find({ deleted_at: null, organizationId: req.query.organizationId });
      return handleResponse(200, "All Logo fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read news by ID
  static getLogoById = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await ClientLogo.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "Logo not found", {}, resp);
      }
      return handleResponse(200, "NeLogows fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update news by ID
  static updateLogo = async (req, resp) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const files = req.files;

      const base_url = `https://everythinge.nexprism.in/`;

      const news = await ClientLogo.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "News not found", {}, resp);
      }

      news.title = title || news.title;

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
  static deleteLogo = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await ClientLogo.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "Logo not found", {}, resp);
      }

      news.deleted_at = new Date();

      await news.save();
      return handleResponse(200, "Logo deleted successfully", {}, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default ClientLogoController;
