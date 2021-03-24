import { LoginTypes, MainTypes } from '../constants';
import { useReducer } from 'react';
interface IReduxAction<T> {
    type: T;
    payload: any;
}

export interface IMainState {
    isOpenDrawerMenu: boolean,
    day: string,
    index: number | undefined,
    bottomSelectIndex: number,
    isOpen: number,
    carts: Array<string>,
    companyTypes: Array<any>,
    addresses: Array<any>,
    masters: Array<any>,
    helps: Array<any>,
    friends: Array<any>,
    loading: boolean,
    popularProducts: Array<any>,
    executor: any,
    credit_cards: any,
    errorMesaage: boolean,
    chatUserId: number | null,
    element: IElement,
    unseenMessage: number,
    unseenNotification: number,
    notifications: any,
    language: number,
    file: string,
    admin_phone: string

}
interface IElement {
    name: string,
    image: string,
    room_id: null | number,

}

export const initialState: IMainState = {
    isOpenDrawerMenu: false,
    day: "",
    index: undefined,
    bottomSelectIndex: 0,
    isOpen: 0,
    carts: [],
    companyTypes: [],
    addresses: [],
    masters: [],
    helps: [],
    friends: [],
    loading: false,
    popularProducts: [],
    executor: {},
    credit_cards: {},
    errorMesaage: false,
    chatUserId: null,
    element: {
        name: "",
        image: "",
        room_id: null
    },
    unseenMessage: 0,
    unseenNotification: 0,
    notifications: {},
    language: 0,
    file: "",
    admin_phone: ""
}
const mainReducer = (state = initialState, action: IReduxAction<MainTypes>) => {
    switch (action.type) {
        case MainTypes.SET_DRAWER_VISIBLE:
            return {
                ...state,
                isOpenDrawerMenu: action.payload
            }
        case MainTypes.SET_UPLOAD_FILE:
            return {
                ...state,
                file: action.payload
            }
        case MainTypes.SET_EXECUTOR:
            return {
                ...state,
                executor: action.payload
            }
        case MainTypes.SET_LANGUAGE:
            return {
                ...state,
                language: action.payload
            }
        case MainTypes.SET_ADMIN_PHONE:
            return {
                ...state,
                admin_phone: action.payload
            }
        case MainTypes.SET_NEXT_NOTIFICATIONS:
            let result = [...state.notifications.results, ...action.payload.results]
            let n = action.payload.next
            let p = action.payload.previous

            return {
                ...state,
                notifications: { ...state.notifications, results: result, next: n, previous: p }
            }
        case MainTypes.SET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case MainTypes.SET_UNSEEN:
            return {
                ...state,
                unseenMessage: action.payload.unseenMessage,
                unseenNotification: action.payload.unseenNotification
            }
        case MainTypes.SET_ELEMENT:
            return {
                ...state,
                element: action.payload
            }
        case MainTypes.SET_NEXT_REVIEWS:
            let results = [...state.executor.results.reviews, ...action.payload.results.reviews]
            let next = action.payload.next
            let previous = action.payload.previous

            return {
                ...state,
                executor: { ...state.executor, results: { ...state.executor.results, reviews: results }, next: next, previous: previous }
            }

        case MainTypes.SET_ERROR_MESSAGE:
            return {
                ...state,
                errorMesaage: action.payload
            }
        case MainTypes.SET_CREDIT_CARDS:
            return {
                ...state,
                credit_cards: action.payload
            }
        case MainTypes.SET_OPEN:
            return {
                ...state,
                isOpen: action.payload
            }
        case MainTypes.SET_DAY:
            return {
                ...state,
                day: action.payload
            }
        case MainTypes.SET_INDEX:
            return {
                ...state,
                index: action.payload
            }
        case MainTypes.SET_CHAT_USER_ID:
            return {
                ...state,
                chatUserId: action.payload
            }
        case MainTypes.SET_BOTTOM_INDEX:
            return {
                ...state,
                bottomSelectIndex: action.payload
            }
        case MainTypes.SET_COMPANY_TYPE:
            return {
                ...state,
                companyTypes: action.payload
            }
        case MainTypes.SET_MY_MASTERS:
            return {
                ...state,
                masters: action.payload,
                loading: false
            }
        case MainTypes.SET_ADDRESSES:

            return {
                ...state,
                addresses: action.payload
            }
        case MainTypes.SET_HELP:

            return {
                ...state,
                helps: action.payload
            }
        case MainTypes.SET_FRIENDS:

            return {
                ...state,
                friends: action.payload,
                loading: false
            }
        case MainTypes.SET_LOADING:

            return {
                ...state,
                loading: action.payload
            }
        case MainTypes.SET_POPULAR_SUB_CATEGORY:
            return {
                ...state,
                popularProducts: action.payload,
                loading: false
            }

        default:
            return state;
    }
}
export default mainReducer;