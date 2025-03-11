import {Request, Response} from "express"
import { ResponseAPI } from "../interface/response_api_interface";

export const ErrorHandlerResponse = async (err : Error , res: Response) : Promise<Response> => {
    try{
        if (err.name == "NOT_FOUND") {
            const response : ResponseAPI = {
                code : 404,
                status : err.name,
                data : null,
                error : err.message
            }
            return res.status(response.code).send(response)
        }
        if (err.name == "BAD_REQUEST") {
            const response : ResponseAPI = {
                code : 400,
                status : err.name,
                data : null,
                error : err.message
            }
            return res.status(response.code).send(response)
        }
        if (err.name == "CONFLICT") {
            const response : ResponseAPI = {
                code : 409,
                status : err.name,
                data : null,
                error : err.message
            }
            return res.status(response.code).send(response)
        }

        const response : ResponseAPI = {
            code : 500,
            status : err.name,
            data : null,
            error : err.message
        }
        return res.status(response.code).send(response)

    }catch(err){
        const response : ResponseAPI = {
            code : 500,
            status : "INTERNAL_SERVER_ERROR",
            data : null,
            error : err.message
        }
        return res.status(response.code).send(response)
    }
}

export const BadRequestError = (errorMessage : any) : Error => {
    let error = new Error(errorMessage)
    error.name = "BAD_REQUEST"
    return error
}
export const NotFoundError = (errorMessage : string) : Error => {
    let error = new Error(errorMessage)
    error.name = "NOT_FOUND"
    return error
}
export const InternalServerError = (errorMessage : string) : Error => {
    let error = new Error(errorMessage)
    error.name = "INTERNAL_SERVER_ERROR"
    return error
}
export const Conflict = (errorMessage : any) : Error => {
    let error = new Error(errorMessage)
    error.name = "CONFLICT"
    return error
}