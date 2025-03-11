import { RepositoryResponseInterface } from "../helper/repository_response";
import { ServiceResponseInterface } from "../helper/service_response";

export const ToServiceResponse = (
  repositoryResponse: RepositoryResponseInterface
): ServiceResponseInterface => {
  const serviceResponse: ServiceResponseInterface = {
    code: repositoryResponse.code,
    error: repositoryResponse.error,
    data: repositoryResponse.data,
  };
  return serviceResponse;
};
