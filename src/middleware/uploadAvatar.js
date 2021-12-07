import multer from 'multer';
import path  from 'path';
import fs from 'fs';
const __dirname = path.resolve();
const uploadFile = path.join(__dirname, 'public/upload');//./public/upload
console.log("2001",uploadFile);
console.log("2002",__dirname);


if (!fs.existsSync(uploadFile)) {
    fs.mkdirSync(uploadFile, { recursive: true });
  }
  const storage = multer.diskStorage({ 
    destination: function(req,file,cb){
      cb(null,uploadFile);
    },
    filename: function(req,file,cb){
      cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname);
    }
  })
  export {storage}