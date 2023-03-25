import createNftUri from "../pinata/createNftUri.js";
import formidable from "formidable";
import multer from "multer";
const path = require("path");
const fs = require("fs");

// Set up Multer storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../../nftFiles"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage }).single("image");

export const createNftRoute = {
  method: "post",
  path: "/create-nft-uri",
  handler: async (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Error uploading file" });
        return;
      }

      const formData = {};
      formData.name = req.body.name;
      formData.description = req.body.description;
      formData.traits = req.body.traits;
      formData.filename = req.file.originalname;

      console.log(
        `NFT created: Name: ${formData.name}, Description: ${formData.description}, Traits: ${formData.traits}, File path: ${req.file.path}`
      );

      // const response = await createNftUri(formData);
      const response = [
        "ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ",
      ];

      console.log("here");
      console.log(response);

      res
        .status(200)
        .json({ message: "NFT created successfully", Uri: response });
    });
  },
};
