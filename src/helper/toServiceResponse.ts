import { RepositoryResponseInterface } from "../api/repository_response"
import { ServiceResponseInterface } from "../api/service_response"

export const ToServiceResponse =  (repositoryResponse : RepositoryResponseInterface) : ServiceResponseInterface =>{
    const serviceResponse : ServiceResponseInterface = {
        code : repositoryResponse.code,
        error : repositoryResponse.error,
        data : repositoryResponse.data
    }
    return serviceResponse
}
