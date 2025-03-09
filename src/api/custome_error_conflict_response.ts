import { ResponseAPI } from "../interface/response_api_interface"
import {Request, Response} from "express"

export const CustomErrorConflictHandlerResponse = async (err : string,data: any , res: Response) : Promise<Response> => {

    const response : ResponseAPI = {
        code : 409,
        status : "CONFLICT",
        data : data ?? null,
        error : err
    }
    return res.status(response.code).send(response)

}