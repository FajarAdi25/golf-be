import { Response } from "node-fetch"
import { ControlllerResponseInterface } from "../api/controller_response"
import { ToControllerResponse } from "../helper/to_controller_response"

export const StatusNotFoundError = (error : any) => {
     let response = {
          code : 404,
          error : error,
          data : null
     }

     return response


}