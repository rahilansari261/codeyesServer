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

  // Delete Comment
  static deleteComment = async (req, resp) => {
    const { commentId } = req.params;

    try {
      const blog = await Blog.findOneAndUpdate({ "comments._id": commentId }, { $pull: { comments: { _id: commentId } } }, { new: true });

      if (!blog) {
        return handleResponse(404, "Comment not found", {}, resp);
      }

      return handleResponse(200, "Comment deleted successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };

  // Delete Reply
  static deleteReply = async (req, resp) => {
    const { commentId, replyId } = req.params;

    try {
      const blog = await Blog.findOneAndUpdate({ "comments._id": commentId }, { $pull: { "comments.$.replies": { _id: replyId } } }, { new: true });

      if (!blog) {
        return handleResponse(404, "Comment or reply not found", {}, resp);
      }

      return handleResponse(200, "Reply deleted successfully", blog, resp);
    } catch (err) {
      return handleResponse(500, err.message, {}, resp);
    }
  };
}

export default CommentController;
