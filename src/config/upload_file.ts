import { ResponseAPI } from "../interface/response_api_interface";
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
const whitelistExtensionFileSound = ["audio/wave", "audio/wav"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log(req.body);
    cb(null, __dirname + "/../../resources/images/");
  },

  filename: function (req, file, cb) {
    // console.log(req.body);
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    let extArray = file.mimetype.split("/");
    let extension = extArray[extArray.length - 1];
    // console.log("type:::::::::::::::::::::", extension);
    cb(null, "test_images_" + uniqueSuffix + "." + extension);
  },
});

// export const UploadImageNodin = multer({
//   storage: storage,
//   limits: { fileSize: maxSize },
//   fileFilter: (req, file, cb) => {
//     // console.log(req.body);
//     // console.log("::::::::::::::::::::::::::", file.mimetype);
//     if (!whitelist.includes(file.mimetype)) {
//       const error = new Error("File is not allowed!");
//       return cb(error);
//     }
//     cb(null, true);
//     // console.log("::::::::::::::::::::::::::", file.mimetype);
//   },
// }).single("nodin");

export const UploadMultipleField = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    // console.log("::::::::::::::::::::::::::", file);
    if (!whitelist.includes(file.mimetype)) {
      const error = new Error("File is not allowed!");
      return cb(error);
    }
    cb(null, true);
  },
}).fields([
  { name: "nodin", maxCount: 1 },
  { name: "design_sms", maxCount: 1 },
]);

export const UploadSound1 = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    // console.log("::::::::::::::::::::::::::",file.mimetype)
    if (!whitelistExtensionFileSound.includes(file.mimetype)) {
      const error = new Error("File is not allowed!");
      return cb(error);
    }
    cb(null, true);
  },
}).fields([
  { name: "audio1", maxCount: 1 },
  { name: "audio2", maxCount: 1 },
]);

export const UploadSound2 = multer({
  storage: storage,
  limits: { fileSize: maxSize },
  fileFilter: (req, file, cb) => {
    if (!whitelist.includes(file.mimetype)) {
      const error = new Error("File is not allowed!");
      return cb(error);
    }
    cb(null, true);
  },
}).single("audio2");
