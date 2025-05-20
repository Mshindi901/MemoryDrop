import multer  from 'multer';
import fs from 'fs';

const uploadPath = 'uploads/';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath); // where files are saved
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // e.g., 162342-snapshot.png
  }
});
const upload = multer({storage});
export default upload;