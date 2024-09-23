import mongoose from "mongoose";
import moment from "moment";
import SequenceModel from "./Sequence.js";

const BlogCategorymodel = mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: null,
        },
        deleted_at: {
            type: Date,
            default: null,
        },
    },
    { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);

BlogCategorymodel.path("createdAt").get(function (value) {
    return value ? moment(value).format("DD-MM-YYYY") : null;
});
BlogCategorymodel.path("updatedAt").get(function (value) {
    return value ? moment(value).format("DD-MM-YYYY") : null;
});

BlogCategorymodel.pre("save", async function (next) {
    if (!this.id) {
        this.id = await getNextSequenceValue("BlogCategory");
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

const BlogCategory = mongoose.model("BlogCategory", BlogCategorymodel);

export default BlogCategory;
