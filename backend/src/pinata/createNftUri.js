// const multer = require("multer");
const path = require("path");
const fs = require("fs");
import { storeImages, storeTokenUriMetadata } from "./uploadToPinata.js";

const imagesLocation = path.join(__dirname, "../../nftFiles");

const metadataTemplate = {
  name: "",
  description: "",
  image: "",
  attributes: [
    {
      trait_type: "",
      value: 100,
    },
  ],
};

const createNftUri = async (formData) => {
  let tokenUris = [];
  console.log("Uploading images...");
  const { responses: imageUploadResponses, files } = await storeImages(
    imagesLocation
  );
  console.log("Images uploaded! Uploading token URIs...", imageUploadResponses);
  for (let i in imageUploadResponses) {
    let tokenUriMetadata = { ...metadataTemplate };
    tokenUriMetadata.name = formData.name;
    tokenUriMetadata.description = formData.description;
    tokenUriMetadata.attributes[0].trait_type = formData.traits;
    tokenUriMetadata.image = `ipfs://${imageUploadResponses[0].IpfsHash}`;
    console.log(tokenUriMetadata);
    console.log(`Uploading ${tokenUriMetadata.name}...`);
    const metadataUploadResponse = await storeTokenUriMetadata(
      tokenUriMetadata
    );
    tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`);
    console.log(`Uploaded ${tokenUriMetadata.name}!`);
  }
  console.log("Token URIs uploaded! They are:");
  console.log(tokenUris);
  fs.readdir(imagesLocation, (err, files) => {
    if (err) throw err;

    for (const file of files) {
      fs.unlink(path.join(imagesLocation, file), (err) => {
        if (err) throw err;
      });
    }
  });
  return tokenUris;
  // return "done";
};

export default createNftUri;
