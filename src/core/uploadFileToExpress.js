import { v4 as uuid } from "uuid";
import { extname } from "path";
import fs from "fs";
import sharp from "sharp";

export const uploadFileToExpress = async (file, folder) => {
  const { createReadStream, filename, mimetype } = file;
  try {
    const stream = createReadStream();
    const key = `${folder}${uuid()}`;
    const storedFileUrl = `./uploads/${key}.jpg`;

    await new Promise((resolve, reject) => {
      const pipeline = sharp().resize(1080, 1080).rotate().toFormat("jpeg");

      const writeStream = fs.createWriteStream(storedFileUrl);

      writeStream.on("finish", resolve);

      writeStream.on("error", (error) => {
        fs.unlink(storedFileUrl, () => {
          reject(error);
        });
      });

      stream.on("error", (error) => writeStream.destroy(error));

      stream.pipe(pipeline).pipe(writeStream);
    });

    return {
      key,
    };
  } catch (error) {
    console.warn(error);
  }
};
