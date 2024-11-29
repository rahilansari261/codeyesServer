import mongoose from "mongoose";
import moment from "moment";
import SequenceModel from "./Sequence.js";

const PortfolioSchema = mongoose.Schema(
  {
    id: Number,
    title: {
      type: String,
      required: true,
    },
    sub_title: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    banner_image: {
      type: Array,
      required: true,
    },
    pictures: [
      {
        type: String,
        required: true,
      },
    ],
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

    organizationId: {
      type: String,
      enum: ["everything_globel", "codeyes_media", "codeyes_infotech"],
      // default: "everything_globel",
    },
  },
  { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);

PortfolioSchema.path("createdAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});
PortfolioSchema.path("updatedAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});

PortfolioSchema.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextSequenceValue("Portfolio");
  }
  next();
});

async function getNextSequenceValue(modelName) {
  let sequence = await SequenceModel.findOneAndUpdate({ modelName: modelName }, { $inc: { sequenceValue: 1 } }, { upsert: true, new: true });
  return sequence.sequenceValue;
}

const Portfolio = mongoose.model("Portfolio", PortfolioSchema);
export default Portfolio;
