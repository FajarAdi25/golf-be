import { Response } from "node-fetch";
import { ControlllerResponseInterface } from "../helper/controller_response";
import { ToControllerResponse } from "../helper/to_controller_response";

export const StatusMessageRespon = (message: any) => {
  let response = {
    code: 200,
    error: null,
    status: "OK",
    message: message,
    data: null,
  };

  return response;
};
