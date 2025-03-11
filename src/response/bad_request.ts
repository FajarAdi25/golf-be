import { Response } from "node-fetch";
import { ControlllerResponseInterface } from "../helper/controller_response";
import { ToControllerResponse } from "../helper/to_controller_response";

export const StatusBadRequestError = (error: any) => {
  let response = {
    code: 400,
    error: error,
    data: null,
  };

  return response;
};
