import mongoose from "mongoose";

import moment from "moment";
import SequenceModel from "./Sequence.js";

const BlogTagsSchema = mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
        },
        deleted_at: {
            type: Date,
            default: null,
        }
    },
    { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);
BlogTagsSchema.path("createdAt").get(function (value) {
    return value ? moment(value).format("DD-MM-YYYY") : null;
});
BlogTagsSchema.path("updatedAt").get(function (value) {
    return value ? moment(value).format("DD-MM-YYYY") : null;
});

BlogTagsSchema.pre("save", async function (next) {
    if (!this.id) {
        this.id = await getNextSequenceValue("BlogTags");
    }
    next();
});

async function getNextSequenceValue(modelName) {
    let sequence = await SequenceModel.findOneAndUpdate(
        { modelName: modelName },
        { $inc: { sequenceValue: 1 } },
        { upsert: true, new: true }
    );
    return sequence.sequenceValue;
}

const BlogTags = mongoose.model("BlogTags", BlogTagsSchema);

export default BlogTags;
