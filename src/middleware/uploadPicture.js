import multer from 'multer';
import path  from 'path';
import fs from 'fs';
const __dirname = path.resolve();
const uploadFile = path.join(__dirname, 'public/upload');

if (!fs.existsSync(uploadFile)) {
    fs.mkdirSync(uploadFile, { recursive: true });
  }

const storage = multer.diskStorage({
    destination: (req,file, cb) =>{
        cb(null,uploadFile);
    },
    filename: (req, file, cb) =>{
        // cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname);
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + "-" + uniqueSuffix + ".jpg");
    }
});

const uploadMulter = multer({
    storage: storage,
    limits:{
        fileSize: 0.8 * 1024 * 1024,
        file: 6
    },
    fileFilter(req, file, cb ){
        if(file.mimetype != "image/png" && file.mimetype != "image/jpg" && file.mimetype != "image/jpeg"){
            return cb(new Error("chỉ Được Chọn hình ảnh có định dạng png,jpg,jpeg"),false);
        }
        cb(null,true);
    }
}).array("picture",6);

export const uploadPicture = (req, res, next) => {
    try {
        uploadMulter(req,res, (err) =>{
            if(err instanceof multer.MulterError){
                res.status(400).json({message:err.message});
            }else if(err){
                res.status(400).json({message:err.message});
            }else{
                next();
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
        })
    }
}