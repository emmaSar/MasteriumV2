import Orders from '../../screens/bottoms/Orders';
import { OrdersTypes, ProductTypes, SpareTypes } from '../constants';
interface IReduxAction<T> {
    type: T;
    payload: any;
}
export interface IOrders {
    ordersList: Array<any>,
    neworder: string,
    orders: Array<any>,
    statusList: Array<any>,
    suborderDetails: Array<any>,
    disputStatusList: Array<any>,
    orderDetails: Object,
    suborders: Object,
    disputs: any,
    transaction: any
}

export const initialState: IOrders = {
    ordersList: [],
    neworder: "",
    orders: [],
    statusList: [{ label: 'Все', value: null }],
    suborderDetails: [],
    disputStatusList: [{ label: 'Все', value: null }],
    orderDetails: {},
    suborders: {},
    disputs: {},
    transaction: {}
}

const orderReducer = (state = initialState, action: IReduxAction<OrdersTypes>) => {
    switch (action.type) {
        case OrdersTypes.ADD_ORDER:
            let list = [...state.ordersList]
            let isnpect = false

            for (let i = 0; i < list.length; i++) {
                if (list[i].id == action.payload.id && list[i].type == action.payload.type) {
                    list[i].count = list[i].count + action.payload.count
                    isnpect = true
                }
            }
            if (!isnpect) {
                list.push(action.payload)
            }
            return {
                ...state,
                ordersList: list
            }
        case OrdersTypes.SET_SUB_ORDERS:
            return {
                ...state,
                suborders: action.payload
            }
        case OrdersTypes.SET_MY_TRANSACTION:
            return {
                ...state,
                transaction: action.payload
            }
            case OrdersTypes.SET_NEXT_TRANSACTION:
                let result = [...state.transaction.results, ...action.payload.results]
                let next=action.payload.next
                let previous=action.payload.previous
                
                return {
                    ...state,
                    transaction: {...state.transaction,results:result,next:next,previous:previous}
                }
        case OrdersTypes.SET_NEXT_DISPUTS:
            let results = [...state.disputs.results, ...action.payload.results]
            let new_disput = { ...action.payload }
            new_disput.results = results
            return {
                ...state,
                disputs: new_disput
            }

        case OrdersTypes.SET_DISPUTS:
            return {
                ...state,
                disputs: action.payload
            }
        case OrdersTypes.SET_ORDER_LIST:
            return {
                ...state,
                ordersList: action.payload
            }
        case OrdersTypes.SET_SUBORDER_DETAILS:
            return {
                ...state,
                suborderDetails: action.payload
            }
        case OrdersTypes.SET_NEW_ORDER:

            return {
                ...state,
                neworder: action.payload
            }
        case OrdersTypes.DETETE_ORDER:
            let l = [...state.ordersList]
            l.splice(action.payload, 1)
            return {
                ...state,
                ordersList: l
            }
        case OrdersTypes.SET_ORDERS:
            let array = []

            array = action.payload.status ? [...state.orders, ...action.payload.list] : action.payload.list

            return {
                ...state,
                orders: array
            }
        case OrdersTypes.SET_DISPUT_STATUS:
            return {
                ...state,
                disputStatusList: [...state.disputStatusList, ...action.payload]
            }
        case OrdersTypes.SET_ORDER_STATUS:
            return {
                ...state,
                statusList: [...state.statusList, ...action.payload]
            }
        case OrdersTypes.DETETE_ORDER_BY_ID:
            let _array = [...state.orders]
            for (let i = 0; i < _array.length; i++) {
                if (_array[i].order_id === action.payload.id) {
                    _array.splice(i, 1)
                    break
                }
            }
            return {
                ...state,
                orders: _array
            }
        case OrdersTypes.SET_ORDER_DETAILS:
            let a = { ...action.payload }
            if (a.workers !== undefined) {
                for (let i = 0; i < a.workers.length; i++) {
                    if (a.workers[i].is_overman == false) {
                        a.workers.splice(i, 0)
                    }
                }
            }
            return {
                ...state,
                orderDetails: a
            }
        default:
            return state;
    }
}
export default orderReducer;