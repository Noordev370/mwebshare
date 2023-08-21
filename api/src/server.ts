import express from "express";
import multer from "multer";
import cors from "cors";
import utils from "./utils";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.105:5173"],
  }),
);
const upload = multer({ dest: "../Uploaded" });

app.get("/api/geturls", async (_req, res) => {
  const result = await utils.getFiles();
  res.json(result);
});

app.get("/api/download/:filename", (req, res) => {
  try {
    const fileName = req.params.filename;
    res.download(`../ToShare/${fileName}`);
  } catch (error) {
    throw new Error(`Something wrong while downloading file:  ${error}`);
  }
});

app.post("/api/upload", upload.single("myfile"), (req, res) => {
  console.log(req.file);
  res.send("uploaded");
});

app.listen(8000, () => console.log(`started at http://localhost:8000/`));
