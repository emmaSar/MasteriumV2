import { ILoginState } from '../reducers/login';

export const loginSelector = ({ login: { user } }: { login: ILoginState }) => user;
export const infoSelector = ({ login: { info } }: { login: ILoginState }) => info;
export const userInfoSelector = ({ login: { userinfo } }: { login: ILoginState }) => userinfo;
export const errorSelector = ({ login: { error } }: { login: ILoginState }) => error;
export const messageSelector = ({ login: { message} }: { login: ILoginState }) => message;




