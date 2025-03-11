import { Response } from "node-fetch";
import { ControlllerResponseInterface } from "../helper/controller_response";
import { ToControllerResponse } from "../helper/to_controller_response";

export const StatusInternalServerError = (error: any) => {
  let response = {
    code: 500,
    error: error,
    data: null,
  };

  return response;
};
