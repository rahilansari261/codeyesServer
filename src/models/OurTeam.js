import mongoose from "mongoose";
import moment from "moment";
import SequenceModel from "./Sequence.js";

const OurTeamModal = mongoose.Schema(
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
    position: {
      type: String,
      required: true,
    },
    twitter_link: {
      type: String,
    },
    facebook_link: {
      type: String,
    },
    linkedin_link: {
      type: String,
    },
    instagram_link: {
      type: String,
    },

    deleted_at: {
      type: Date,
      default: null,
    },
    organizationId: {
      type: String,
      enum: ["everything_globel", "codeyes_media", "codeyes_infotech"], // Define allowed values here
      // default: "everything_globel", // Set default value
    },
  },
  { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);

OurTeamModal.path("createdAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});
OurTeamModal.path("updatedAt").get(function (value) {
  return value ? moment(value).format("DD-MM-YYYY") : null;
});

OurTeamModal.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getNextSequenceValue("OurTeam");
  }
  next();
});

async function getNextSequenceValue(modelName) {
  let sequence = await SequenceModel.findOneAndUpdate({ modelName: modelName }, { $inc: { sequenceValue: 1 } }, { upsert: true, new: true });
  return sequence.sequenceValue;
}

const OurTeam = mongoose.model("OurTeam", OurTeamModal);
export default OurTeam;
