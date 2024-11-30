import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { File as MulterFile } from 'multer';
import sharp from 'sharp';

/**
 * Configuration options for Multer file uploads.
 */
export const multerOptions = {
  storage: diskStorage({
    // Directory where files will be stored
    destination: (
      req: any,
      file: any,
      callback: (arg0: null, arg1: string) => void,
    ) => {
      const uploadDir = './uploads';
      console.log('Working directory:', process.cwd()); // Zjistí aktuální pracovní adresář
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true }); // Ensure directory exists
        console.log(`Directory created: ${uploadDir}`);
      }
      callback(null, uploadDir);
    },

    // Generate a unique filename for each uploaded file
    filename: (
      req: any,
      file: { originalname: string; fieldname: any },
      callback: (arg0: null, arg1: string) => void,
    ) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = extname(file.originalname);
      callback(null, `${file.fieldname}-${uniqueSuffix}${extension}`);
    },
  }),
  fileFilter: (
    req: Request,
    file: MulterFile,
    callback: (error: Error | null, acceptFile: boolean) => void,
  ) => {
    // Allow only image files
    if (!file.mimetype.startsWith('image/')) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  },
  limits: {
    // Limit the file size to 2MB
    fileSize: 2 * 1024 * 1024, // 2MB
  },
};

export const generateThumbnail = async (
  filePath: string,
  outputPath: string,
) => {
  try {
    console.log(`Generating thumbnail for: ${filePath}`);
    await sharp(filePath)
      .resize(300, 300, { fit: 'cover' }) // Resize to 300x300 px
      .toFile(outputPath);
    console.log(`Thumbnail created at: ${outputPath}`);
  } catch (error) {
    console.error('Error generating thumbnail:', error);
  }
};


// export const generateThumbnail = async (
//   filePath: string,
//   outputPath: string,
// ) => {
//   try {
//     await sharp(filePath)
//       .resize(300, 300, { fit: 'cover' }) // Resize to 300x300 px
//       .toFile(outputPath);
//   } catch (error) {
//     console.error('Error generating thumbnail:', error);
//   }
// };
