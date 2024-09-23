import mongoose from "mongoose";

import moment from "moment";
import SequenceModel from "./Sequence.js";

const ContactUsSchema = mongoose.Schema(
    {
        id: Number,
        name: {
            type: String,
            default: null,
        },
        message: {
            type: String,
            default: null
        },
        email: {
            type: String,
            default: null
        }
    },
    { timestamps: {}, toJSON: { getters: true }, toObject: { getters: true } }
);
ContactUsSchema.path("createdAt").get(function (value) {
    return value ? moment(value).format("DD-MM-YYYY") : null;
});
ContactUsSchema.path("updatedAt").get(function (value) {
    return value ? moment(value).format("DD-MM-YYYY") : null;
});

ContactUsSchema.pre("save", async function (next) {
    if (!this.id) {
        this.id = await getNextSequenceValue("ContactUs");
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

const ContactUs = mongoose.model("ContactUs", ContactUsSchema);

export default ContactUs;
