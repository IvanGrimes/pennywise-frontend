import { userApi as api, UpdateMeRequestDto } from 'shared/api';

export type StartDay = NonNullable<UpdateMeRequestDto['startDay']>;

export { api, type UpdateMeRequestDto };
