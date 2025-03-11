import { ControlllerResponseInterface } from "../helper/controller_response";
import { ServiceResponseInterface } from "../helper/service_response";

export const ToControllerResponse = (
  service_response: ServiceResponseInterface
): ControlllerResponseInterface => {
  let status = null;

  if (service_response.code == 200) status = "OK";
  if (service_response.code == 400) status = "BAD_REQUEST";
  if (service_response.code == 404) status = "NOT_FOUND";
  if (service_response.code == 405) status = "METHOD_NOT_ALLOWED";
  if (service_response.code == 500) status = "INTERNAL_SERVER_ERROR";

  const controllerResponse: ControlllerResponseInterface = {
    code: service_response.code,
    status: status,
    error: service_response.error?.message ?? service_response.error ?? null,
    data: service_response.data,
  };
  return controllerResponse;
};
