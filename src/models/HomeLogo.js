import mongoose from "mongoose";
import moment from "moment";
import SequenceModel from "./Sequence.js";

const HomeLogoModal = mongoose.Schema(
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

    deleted_at: {
      type: Date,
      default: null,
    },
    organizationId: {
      type: String,
      enum: ["everything_globel", "codeyes_media", "codeyes_infotech"],
      default: "everything_globel",
    },
  },
  { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);

HomeLogoModal.path("createdAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});
HomeLogoModal.path("updatedAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});

HomeLogoModal.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextSequenceValue("HomeLogo");
  }
  next();
});

async function getNextSequenceValue(modelName) {
  let sequence = await SequenceModel.findOneAndUpdate({ modelName: modelName }, { $inc: { sequenceValue: 1 } }, { upsert: true, new: true });
  return sequence.sequenceValue;
}

const HomeLogo = mongoose.model("HomeLogo", HomeLogoModal);
export default HomeLogo;
