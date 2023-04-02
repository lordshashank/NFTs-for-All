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
    try {
      const response = await addNewProfile(
        "/" + newFileName,
        name,
        description,
        userAccount
      );
      if (response.error) {
        return res.status(400).json({
          error: response.error,
        });
      }
      file.mv("src/uploads/" + newFileName, (err) => {
        res.status(200).json({ message: "Upload Successful!" });
      });
    } catch (err) {
      res.status(400).json({
        error: err,
      });
    }
  },
};
