import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import dbConnection from "./config/dbconnection.js"
import path from "path";
import { fileURLToPath } from "url";
import AdminRoutes from "./routes/AdminRoutes.js"
import UserRoutes from "./routes/userRoutes.js"

dotenv.config()


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dbConnection()

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/admin", AdminRoutes);
app.use("/api/user", UserRoutes);
app.use("/",(req,res)=>{
    res.send("Welcome")
})

app.use("", express.static(path.join(__dirname, "")));


const port = process.env.PORT


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

