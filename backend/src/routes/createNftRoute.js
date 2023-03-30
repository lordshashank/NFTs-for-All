import createNftUri from "../pinata/createNftUri.js";
import formidable from "formidable";
const path = require("path");
const fs = require("fs");

export const createNftRoute = {
  method: "post",
  path: "/create-nft-uri",
  handler: async (req, res) => {
    const { file } = req.files;
    file.mv("src/nftFiles/" + file.name, (err) => {
      console.log("Upload Successful!");
    });
    const formData = {};
    formData.name = req.body.name;
    formData.description = req.body.description;
    formData.traits = req.body.traits;
    formData.filename = file.originalname;

    console.log(
      `NFT created: Name: ${formData.name}, Description: ${formData.description}, Traits: ${formData.traits}`
    );

<<<<<<< HEAD
      const response = await createNftUri(formData);
      // const response = [
      //   "ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ",
      // ];
=======
    // const response = await createNftUri(formData);
    const response = ["ipfs://QmUttGTuPbQkuroyGqrX3gS2b9SPdtYvyXLtxZjLHhgGuZ"];
>>>>>>> a83f483e0440e428b632b0aad41bc44189b99c2a

    console.log("here");
    console.log(response);

    res
      .status(200)
      .json({ message: "NFT created successfully", Uri: response });
  },
};
