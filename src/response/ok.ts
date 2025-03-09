import { Response } from "node-fetch"
import { ControlllerResponseInterface } from "../api/controller_response"
import { ToControllerResponse } from "../helper/to_controller_response"

export const StatusOK = (data : any) => {
     let response = {
          code : 200,
          error : null,
          data : data
     }

     return response
}