import { api } from 'shared/api';
import { createApiRequestModel } from 'shared/model';

const { $requestLoading, $requestSuccess, $requestError, requestFx } =
  createApiRequestModel({
    name: 'request',
    request: api.resetPassword.request,
    errorMessages: {},
  });

export { $requestLoading, $requestSuccess, $requestError };

export const effects = { requestFx };
