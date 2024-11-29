import handleResponse from "../config/http-response.js";

import Blog from "../src/models/BlogModal.js";

class CommentController {
  // Get all Comments
  static GetAllComments = async (req, resp) => {
    try {
      const blogs = await Blog.find({
        deleted_at: null,
      });

      return handleResponse(200, "Blogs fetched successfully", blogs, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default CommentController;
