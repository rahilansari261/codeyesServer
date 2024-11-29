import mongoose from "mongoose";
import moment from "moment";
import SequenceModel from "./Sequence.js";

const TestimonialTextModal = mongoose.Schema(
  {
    id: Number,
    title: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
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

TestimonialTextModal.path("createdAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});
TestimonialTextModal.path("updatedAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});

TestimonialTextModal.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextSequenceValue("TestimonialText");
  }
  next();
});

async function getNextSequenceValue(modelName) {
  let sequence = await SequenceModel.findOneAndUpdate({ modelName: modelName }, { $inc: { sequenceValue: 1 } }, { upsert: true, new: true });
  return sequence.sequenceValue;
}

const TestimonialText = mongoose.model("TestimonialText", TestimonialTextModal);
export default TestimonialText;
