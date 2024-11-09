import handleResponse from "../config/http-response.js";
import TestimonialVideo from "../src/models/TestimonialVideos.js";
class TestimonialVideoController {
  // Create news
  static addTestimonialVideo = async (req, resp) => {
    try {
      const { video_url } = req.body;

      if (!video_url) {
        return handleResponse(404, "All fields are required", {}, resp);
      }

      const newNews = new TestimonialVideo({
        video_url,
        organizationId: req.query.organizationId,
      });

      await newNews.save();
      return handleResponse(201, "TestimonialVideo created successfully", newNews, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read all news
  static getAllTestimonialVideos = async (req, resp) => {
    try {
      const news = await TestimonialVideo.find({ deleted_at: null, organizationId: req.query.organizationId });
      return handleResponse(200, "All TestimonialVideo fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Read news by ID
  static getTestimonialVideoById = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await TestimonialVideo.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "TestimonialVideo not found", {}, resp);
      }
      return handleResponse(200, "NeTestimonialVideows fetched successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update news by ID
  static updateTestimonialVideo = async (req, resp) => {
    try {
      const { id } = req.params;
      const { video_url } = req.body;

      const news = await TestimonialVideo.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "News not found", {}, resp);
      }

      news.video_url = video_url || news.video_url;

      await news.save();
      return handleResponse(200, "TestimonialVideo updated successfully", news, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Delete news by ID
  static deleteTestimonialVideo = async (req, resp) => {
    try {
      const { id } = req.params;
      const news = await TestimonialVideo.findOne({ id: id });
      if (!news) {
        return handleResponse(404, "TestimonialVideo not found", {}, resp);
      }

      news.deleted_at = new Date();

      await news.save();
      return handleResponse(200, "TestimonialVideo deleted successfully", {}, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default TestimonialVideoController;
