import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const imageRoute = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

imageRoute.get("/:main/:folder/:subfolder/:filename", (req, resp) => {
  const { main, folder, subfolder, filename } = req.params;
  const imagePath = path.join(__dirname, main, folder, subfolder, filename);

  console.log("imagepath", imagePath);


  fs.access(imagePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error('File does not exist:', imagePath);
      return resp.status(404).send("Image not found");
    }

    resp.sendFile(imagePath, (err) => {
      if (err) {
        resp.status(404).send("Image not found");
      }
    });
  });
});

export default imageRoute;
