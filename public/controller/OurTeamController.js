import handleResponse from "../config/http-response.js";
import OurTeam from "../src/models/OurTeam.js";

class OurTeamController {
  // Add a new blog
  static AddOurTeam = async (req, resp) => {
    try {
      const base_url = `${req.protocol}://${req.get("host")}`;
      const { name, position, twitter_link, facebook_link, linkedin_link, instagram_link } = req.body;

      const image = req.files;
      console.log("image", image);

      if (!name || !position) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      const newOurTeam = new OurTeam({
        name,
        position,
        twitter_link,
        facebook_link,
        linkedin_link,
        instagram_link,
        organizationId: req.query.organizationId,
      });

      if (image && image.banner_image) {
        newOurTeam.image_url = `${base_url}/${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await newOurTeam.save();

      return handleResponse(201, "OurTeam created successfully", newOurTeam, resp);
    } catch (err) {
      console.log("err", err);
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get all blogs
  static GetAllOurTeams = async (req, resp) => {
    try {
      const blogs = await OurTeam.find({ deleted_at: null, organizationId: req.query.organizationId }).lean().sort({ createdAt: -1 });

      return handleResponse(200, "OurTeams fetched successfully", blogs, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Get a single blog by ID
  static GetOurTeamById = async (req, resp) => {
    try {
      const { id } = req.params;

      const blog = await OurTeam.findOne({ id: id }).lean();

      if (!blog) {
        return handleResponse(404, "OurTeam not found", {}, resp);
      }

      return handleResponse(200, "OurTeam fetched successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Update a blog
  static UpdateOurTeam = async (req, resp) => {
    try {
      const { id } = req.params;
      const { name, position, twitter_link, facebook_link, linkedin_link, instagram_link } = req.body;
      const image = req.files;

      if (!title || !category || !content) {
        return handleResponse(400, "All required fields must be filled", {}, resp);
      }

      let blog = await OurTeam.findOne({ id: id });
      if (!blog) {
        return handleResponse(404, "OurTeam not found", {}, resp);
      }

      blog.name = name;
      blog.position = position;
      blog.twitter_link = twitter_link;
      blog.facebook_link = facebook_link;
      blog.linkedin_link = linkedin_link;
      blog.instagram_link = instagram_link;

      if (image && image.banner_image) {
        blog.image_url = `${req.protocol}://${req.get("host")}/${image.banner_image[0].path.replace(/\\/g, "/")}`;
      }

      await blog.save();

      return handleResponse(200, "OurTeam updated successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Soft delete a blog (set deleted_at)
  static DeleteOurTeam = async (req, resp) => {
    try {
      const { id } = req.params;

      const deletedOurTeam = await OurTeam.findOneAndUpdate({ id: id }, { deleted_at: new Date() }, { new: true });

      if (!deletedOurTeam) {
        return handleResponse(404, "OurTeam not found", {}, resp);
      }

      return handleResponse(200, "OurTeam deleted successfully", deletedOurTeam, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default OurTeamController;
