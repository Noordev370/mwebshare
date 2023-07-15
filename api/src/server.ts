import express, { Request, Response } from "express";
import multer from "multer";
import cors from "cors"; 
import path from "path";
import process from "process";
import utils from "./utils";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.1.105:5173"],
  })
);
const upload = multer({ dest: "../Uploaded" });
app.get("/", (_req: Request, res: Response) => {
  // use path.resolve to convert the relative path to absolute path & pass it to sendfile
  res.sendFile(path.resolve("./build/static/html/index.html"));
});

app.get("/api/geturls", async (_req: Request, res: Response) => {
  const result = await utils.getFiles();
  res.json(result);
});

app.get("/api/download/:filename", (req: Request, res: Response) => {
  try {
    const fileName = req.params.filename;
    res.download(`../ToShare/${fileName}`);
  } catch (error) {
    throw new Error(`Something wrong while downloading file:  ${error}`);
  }
});

app.post(
  "/api/upload",
  upload.single("myfile"),
  (req: Request, res: Response) => {
    console.log(req.file);
    res.send("uploaded");
  },
);

app.listen(8000, () =>
  console.log(process.cwd(), `started at http://localhost:8000/`),
);
