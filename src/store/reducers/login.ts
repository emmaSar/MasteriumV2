import { LoginTypes } from '../constants';
import { useReducer } from 'react';
interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface ILoginState {
    user: IUserData,
    info: IInfo
    userinfo: any,
    day: string,
    error: boolean | null,
    message: string
}

interface IUserData {
    phone: string,
    code: string,
    image: string,



}
interface IInfo {
    id: number | null,
    created_at: string
    phone_number: string

}

export const initialState: ILoginState = {
    user: {
        phone: '',
        image: '',
        code: ''
    },
    day: "",
    userinfo: {},
    info: { id: null, created_at: '', phone_number: '' },
    error: null,
    message: ""
}
const loginReducer = (state = initialState, action: IReduxAction<LoginTypes>) => {
    switch (action.type) {
        case LoginTypes.CHANGE_PHONE:
            return {
                ...state,
                user: { ...state.user, phone: action.payload }
            };
        case LoginTypes.SET_IMAGE:
            return {
                ...state,
                user: { ...state.user, image: action.payload }
            };
        case LoginTypes.SET_USER:
            return {
                ...state,
                user: {
                    phone: '',
                    image: '',
                    code: ''
                }
            };
        case LoginTypes.SET_USER_DATA:
            return {
                ...state,
                info: { id: action.payload.id, created_at: action.payload.created_at, phone_number: action.payload.phone_number }
            }
        case LoginTypes.CHANGE_PHONE_NUMBER:
            const phone_number = "+995" + action.payload
            return {
                ...state,
                info: { ...state.info, phone_number: phone_number },
                userinfo: { ...state.userinfo, phone_number: phone_number }
            }
        case LoginTypes.SET_USER_INFO:

            return {
                ...state,
                userinfo: action.payload
            }

        case LoginTypes.SET_DAY:
            return {
                ...state,
                day: action.payload
            }
        case LoginTypes.ERROR:
            return {
                ...state,
                error: action.payload
            }
        case LoginTypes.SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            }
        default:
            return state;
    }
}
export default loginReducer;