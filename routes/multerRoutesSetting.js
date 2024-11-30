import fileUpload from "../config/fileuploads.js";
import multer from "multer";
import path from "path";

const Productupdate = fileUpload("public/blog/images");
const multipleProductUploads = Productupdate.fields([{ name: "banner_image" },{ name: "authorProfile"}]);
// const multipleProductUploads2 = Productupdate.fields([{ name: "authorProfile" }]);

const multiplePortfolioUploads = Productupdate.fields([
  { name: "banner_image", maxCount: 1 },
  { name: "authorProfile", maxCount: 1 },
  { name: "pictures", maxCount: 10 },
]);


const testimonialUploads = fileUpload("public/blog/images");
const testimonialImageUploads = testimonialUploads.fields([
  { name: "image_url" },
]);

export {
  multipleProductUploads,
  testimonialImageUploads,
  multiplePortfolioUploads,
};
