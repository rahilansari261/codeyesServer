import handleResponse from "../config/http-response.js";
import Service from "../src/models/Service.js";
class ServiceController {
  // Create news
  static addService = async (req, resp) => {
    try {
      const { service } = req.body;

      if (!service) {
        return handleResponse(404, "All fields are required", {}, resp);
      }

      const newNews = new Service({
        service,
        organizationId: req.query.organizationId,
      });

      await newNews.save();
      return handleResponse(201, "Service created successfully", newNews, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read all news
  static getAllServices = async (req, resp) => {
    try {
      const news = await Service.find({ deleted_at: null, organizationId: req.query.organizationId });
      return handleResponse(200, "All Service fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read news by ID
  static getServiceById = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await Service.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "Service not found", {}, resp);
      }
      return handleResponse(200, "NeServicews fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update news by ID
  static updateService = async (req, resp) => {
    try {
      const { id } = req.params;
      const { service } = req.body;

      const news = await Service.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "News not found", {}, resp);
      }

      news.service = service || news.service;

      await news.save();
      return handleResponse(200, "Service updated successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Delete news by ID
  static deleteService = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await Service.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "Service not found", {}, resp);
      }

      news.deleted_at = new Date();

      await news.save();
      return handleResponse(200, "Service deleted successfully", {}, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default ServiceController;
