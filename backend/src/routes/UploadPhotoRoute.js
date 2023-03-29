import { extname } from "path";
import { v4 as uuid } from "uuid";
import { addNewProfile } from "../database/addNewProfile";

export const uploadPhotoRoute = {
  method: "post",
  path: "/upload",
  handler: async (req, res) => {
    const { name, description, userAccount } = req.body;
    const { file } = req.files;
    const fileExtension = extname(file.name);
    const newFileName = uuid() + fileExtension;
    await addNewProfile("/" + newFileName, name, description, userAccount);
    file.mv("src/uploads/" + newFileName, (err) => {
      res.status(200).json({ message: "Upload Successful!" });
    });
  },
};
