import handleResponse from "../config/http-response.js";
import TestimonialText from "../src/models/TestimonialText.js";

class TestimonialTextController {
  // Add a new blog
  static AddTestimonialText = async (req, resp) => {
    try {
      const base_url = `https://everythinge.nexprism.in/`;
      const { name, description } = req.body;

      const image = req.files;
      console.log("image", image);

      if (!name || !description) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      const newTestimonialText = new TestimonialText({
        name,
        description,
        organizationId: req.query.organizationId,
      });

      if (image && image.banner_image) {
        newTestimonialText.image_url = `${base_url}/${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await newTestimonialText.save();

      return handleResponse(201, "TestimonialText created successfully", newTestimonialText, resp);
    } catch (err) {
      console.log("err", err);
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get all blogs
  static GetAllTestimonialTexts = async (req, resp) => {
    try {
      const blogs = await TestimonialText.find({ deleted_at: null, organizationId: req.query.organizationId }).lean().sort({ createdAt: -1 });

      return handleResponse(200, "TestimonialTexts fetched successfully", blogs, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get a single blog by ID
  static GetTestimonialTextById = async (req, resp) => {
    try {
      const { id } = req.params;

      const blog = await TestimonialText.findOne({ id: id }).lean();

      if (!blog) {
        return handleResponse(404, "TestimonialText not found", {}, resp);
      }

      return handleResponse(200, "TestimonialText fetched successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update a blog
  static UpdateTestimonialText = async (req, resp) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const image = req.files;

      if (!title || !category || !content) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      let blog = await TestimonialText.findOne({ id: id });
      if (!blog) {
        return handleResponse(404, "TestimonialText not found", {}, resp);
      }

      blog.name = name;
      blog.description = description;

      if (image && image.banner_image) {
        blog.image_url = `https://everythinge.nexprism.in//${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await blog.save();

      return handleResponse(200, "TestimonialText updated successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Soft delete a blog (set deleted_at)
  static DeleteTestimonialText = async (req, resp) => {
    try {
      const { id } = req.params;

      const deletedTestimonialText = await TestimonialText.findOneAndUpdate({ id: id }, { deleted_at: new Date() }, { new: true });

      if (!deletedTestimonialText) {
        return handleResponse(404, "TestimonialText not found", {}, resp);
      }

      return handleResponse(200, "TestimonialText deleted successfully", deletedTestimonialText, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default TestimonialTextController;
