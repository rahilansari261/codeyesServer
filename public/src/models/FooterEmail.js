import mongoose from "mongoose";
import moment from "moment";
import SequenceModel from "./Sequence.js";

const FooterEmailModal = mongoose.Schema(
  {
    id: Number,
    title: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    deleted_at: {
      type: Date,
      default: null,
    },
    organizationId: {
      type: String,
      enum: ["everything_globel", "codeyes_media", "codeyes_infotech"], // Define allowed values here
      default: "everything_globel", // Set default value
    },
  },
  { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);

FooterEmailModal.path("createdAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});
FooterEmailModal.path("updatedAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});

FooterEmailModal.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextSequenceValue("FooterEmail");
  }
  next();
});

async function getNextSequenceValue(modelName) {
  let sequence = await SequenceModel.findOneAndUpdate({ modelName: modelName }, { $inc: { sequenceValue: 1 } }, { upsert: true, new: true });
  return sequence.sequenceValue;
}

const FooterEmail = mongoose.model("FooterEmail", FooterEmailModal);
export default FooterEmail;
