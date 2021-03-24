import { ProductTypes, ServicesTypes, SpareTypes } from "../constants"

export const getServiceList = (payload:number) => {
    return {
        type:ServicesTypes.GET_SERVICE_LIST ,
        payload
        
    };
};
export const setServiceList = (payload:Array<any>) => {
    return {
        type:ServicesTypes.SET_SERVICE_LIST ,
        payload
    };
};

export const setLoading = (payload:boolean) => {
    return {
        type:ServicesTypes.SET_LOADING ,
        payload
    };
};

