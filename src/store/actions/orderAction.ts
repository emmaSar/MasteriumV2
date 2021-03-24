import { OrdersTypes, ProductTypes, SpareTypes } from "../constants"

export const addOrder = (payload:any) => {
    return {
        type:OrdersTypes.ADD_ORDER ,
        payload
    };
};
export const setOrderList = (payload:any) => {
    return {
        type:OrdersTypes.SET_ORDER_LIST ,
        payload
    };
};
export const deleteOrder = (payload:any) => {
    return {
        type:OrdersTypes.DETETE_ORDER ,
        payload
    };
};
export const createOrder = (payload:any) => {
    return {
        type:OrdersTypes.CREATE_ORDER ,
        payload
    };
};
export const setNewOrder = (payload:string) => {
    return {
        type:OrdersTypes.SET_NEW_ORDER ,
        payload
    };
};
export const getOrders = (payload:any) => {
    return {
        type:OrdersTypes.GET_ORDERS ,
        payload
    };
};
export const getOrderStatus = () => {
    return {
        type:OrdersTypes.GET_ORDER_STATUS ,
        
    };
};
export const setOrderStatus = (payload:any) => {
    return {
        type:OrdersTypes.SET_ORDER_STATUS ,
        payload
    };
};
export const checkOrderSubOrders = (payload:any) => {
    return {
        type:OrdersTypes.CHECK_ORDER_SUB_ORDERS ,
        payload
    };
};
export const setOrders = (payload:any) => {
    return {
        type:OrdersTypes.SET_ORDERS ,
        payload
    };
};
export const deleteOrderById = (payload:any) => {
    return {
        type:OrdersTypes.DETETE_ORDER_BY_ID ,
        payload
    };
};
export const getSuborderDetails = (payload:any) => {
    return {
        type:OrdersTypes.GET_SUBORDER_DETAILS ,
        payload
    };
};
export const setSuborderDetails = (payload:any) => {
    return {
        type:OrdersTypes.SET_SUBORDER_DETAILS ,
        payload
    };
};
export const getDisputStatus = () => {
    return {
        type:OrdersTypes.GET_DISPUT_STATUS ,
    };
};
export const getDisputs= (payload:any) => {
    return {
        type:OrdersTypes.GET_DISPUTS ,
        payload
    };
};
export const setDisputStatus = (payload:any) => {
    return {
        type:OrdersTypes.SET_DISPUT_STATUS ,
        payload
    };
};
export const setOrderDetails = (payload:any) => {
    return {
        type:OrdersTypes.SET_ORDER_DETAILS ,
        payload
    };
};
export const setSubOrders= (payload:any) => {
    return {
        type:OrdersTypes.SET_SUB_ORDERS ,
        payload
    };
};
export const getSubOrderDetailsById= (payload:any) => {
    return {
        type:OrdersTypes.GET_SUBORDER_DETAILS_BY_ID ,
        payload
    };
};
export const addReview= (payload:any) => {
    return {
        type:OrdersTypes.ADD_REVIEWE ,
        payload
    };
};
export const createDisput= (payload:any) => {
    return {
        type:OrdersTypes.CREATE_DISPUT ,
        payload
    };
};
export const setDisputs= (payload:any) => {
    return {
        type:OrdersTypes.SET_DISPUTS ,
        payload
    };
};
export const getNextDisputs= (payload:any) => {
    return {
        type:OrdersTypes.GET_NEXT_DISPUTS ,
        payload
    };
};
export const setNextDisputs= (payload:any) => {
    return {
        type:OrdersTypes.SET_NEXT_DISPUTS ,
        payload
    };
};
export const getNextReviews= (payload:any) => {
    return {
        type:OrdersTypes.GET_NEXT_REVIEWS ,
        payload
    };
};
export const getMyTransactions= () => {
    return {
        type:OrdersTypes.GET_MY_TRANSACTION ,
    };
};
export const setMyTransactions= (payload:any) => {
    return {
        type:OrdersTypes.SET_MY_TRANSACTION ,
        payload
    };
};
export const  getNextTransaction= (payload:any) => {
    return {
        type:OrdersTypes.GET_NEXT_TRANSACTION ,
        payload
    };
};
export const  setNextTransaction= (payload:any) => {
    return {
        type:OrdersTypes.SET_NEXT_TRANSACTION ,
        payload
    };
};