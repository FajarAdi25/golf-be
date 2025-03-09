import { ControlllerResponseInterface } from "../api/controller_response";
import { UploadMultipleField } from "../config/upload_file";
import { ToControllerResponse } from "../helper/to_controller_response";
import { ResponseAPI } from "../interface/response_api_interface";

// export const uploadFileRoboCreate = (req,res,next) => {
//
//     UploadImageRobo(req,res, function(err) {
//         let response : ControlllerResponseInterface = {
//             code : null,
//             message : null,
//             data : null,
//         }
//
//         if(err) {
//             response.code = 400
//             response.message = err.message
//             response = ToControllerResponse(response)
//             return res.status(response.code).json(response);
//         }
//         next()
//     })
// }
// export const uploadFileRoboUpdate = (req,res,next) => {
//
//     UploadImageRobo(req,res, function(err) {
//         console.log(req.body)
//         let response : ControlllerResponseInterface = {
//             code : null,
//             message : null,
//             data : null,
//         }
//
//         if(err) {
//             response.code = 400
//             response.message = err.message
//             response = ToControllerResponse(response)
//             return res.status(response.code).json(response);
//         }
//         next()
//     })
// }

export const UploadImageMultipleField = (req, res, next) => {
  UploadMultipleField(req, res, function (err) {
    // let user = req?.data?.user
    // req.user_authenticated = user;
    // console.log(req.files);

    if (err) {
      let response: ResponseAPI = {
        code: 401,
        status: "BAD REQUEST",
        data: null,
        error: err?.message,
      };
      //   console.log(err);
      return res.status(response.code).json(response);
    }
    // console.log(req.file);
    // if (req.file == undefined) {
    //   let response: ResponseAPI = {
    //     code: 400,
    //     status: "BAD REQUEST",
    //     data: null,
    //     error: err,
    //   };
    //   return res.status(response.code).json(response);
    // }
    next();
  });
};
// export const UploadImageNodin1 = (req, res, next) => {
//   UploadImageNodin(req, res, function (err) {
//     // let user = req?.data?.user
//     // req.user_authenticated = user;
//     // console.log(err);

//     if (err) {
//       let response: ResponseAPI = {
//         code: 401,
//         status: "BAD REQUEST",
//         data: null,
//         error: err?.message,
//       };
//       //   console.log(err);
//       return res.status(response.code).json(response);
//     }
//     // console.log(req.file);
//     // if (req.file == undefined) {
//     //   let response: ResponseAPI = {
//     //     code: 400,
//     //     status: "BAD REQUEST",
//     //     data: null,
//     //     error: err,
//     //   };
//     //   return res.status(response.code).json(response);
//     // }
//     next();
//   });
// };

// export const UploadSoundFile2 = (req,res,next) => {

//     UploadSound2(req,res, function(err) {

//         if(err) {
//             let response : ResponseAPI = {
//                 code : 400,
//                 status:null,
//                 data : null,
//                 error : err.message,
//             }
//             return res.status(response.code).json(response);
//         }
//         next()
//     })
// }
