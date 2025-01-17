import mongoose from "mongoose";
import moment from "moment";
import SequenceModel from "./Sequence.js";

const BlogSchema = mongoose.Schema(
  {
    id: Number,
    title: {
      type: String,
      required: true,
    },
    banner_image: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: null,
    },
    category: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
    blogType: {
      type: String,
      default: "default", // hot, famous, default
    },
    organizationId: {
      type: String,
      enum: ["everything_globel", "codeyes_media", "codeyes_infotech"], // Define allowed values here
      default: "everything_globel", // Set default value
    },
  },
  { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);

BlogSchema.path("createdAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});
BlogSchema.path("updatedAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});

BlogSchema.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextSequenceValue("Blog");
  }
  next();
});

async function getNextSequenceValue(modelName) {
  let sequence = await SequenceModel.findOneAndUpdate({ modelName: modelName }, { $inc: { sequenceValue: 1 } }, { upsert: true, new: true });
  return sequence.sequenceValue;
}

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
