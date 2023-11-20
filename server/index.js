import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose"
import morgan from "morgan"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import path from "path"
import { fileURLToPath } from "url"
import auth from "./Routes/Auth.js"
import user from "./Routes/User.js"
import post from "./Routes/Post.js"
import { register } from "./Controller/Auth.js"

const PORT = 5000;

/* CONFIGURATIONS */ 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(morgan("common"))
app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}))
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}))
app.use(cors())
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* FILE STORAGE */
const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, "public/assets")
    },
    filename:function(req,file,cb){
        cb(null, file.originalname)
    }
});
const upload = ({storage});
 
/* MONGOODB SETUP */
mongoose
  .connect(
    "mongodb+srv://denipamungkas:BMSBGDTG@cluster0.3j65gfo.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("terhubung ke database");
  })
  .catch((err) => {
    console.log("gagal terhubung ke database", err.message);
  });
app.listen(PORT, () => {
  console.log("server telah berjalan di port "+PORT);
}); 

app.use("/api", auth);
app.use("/api/user", user);
app.use("/api/post", post);
