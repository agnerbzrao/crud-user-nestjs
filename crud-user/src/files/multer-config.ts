import { diskStorage } from 'multer';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common';

const whitelist = ['image/png', 'image/jpeg', 'image/jpg'];
const multerConfig = {
  storage: diskStorage({
    destination: './src/images',
    filename: (req, file, cb) => {
      const fileName =
        path.parse(file.originalname).name.replace(/\s/g, '') + '-' + uuidv4();

      const extension = path.parse(file.originalname).ext;
      cb(null, `${fileName}${extension}`);
    },
  }),
  limits: { fileSize: 1250000 },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      return cb(
        new BadRequestException(`File type ${file.mimetype} not supported`),
      );
    }

    cb(null, true);
  },
};

export default multerConfig;
