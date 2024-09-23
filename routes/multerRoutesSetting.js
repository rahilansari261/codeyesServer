import fileUpload from "../config/fileuploads.js";
import multer from "multer";
import path from "path"

const Productupdate = fileUpload("public/blog/images");
const multipleProductUploads = Productupdate.fields([
    { name: "banner_image" }
]);


export { multipleProductUploads }