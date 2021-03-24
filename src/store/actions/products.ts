import { ProductTypes, SpareTypes } from "../constants"

export const getProductList = () => {
    return {
        type:ProductTypes.GET_PRODUCT_LIST ,
    };
};

export const setProductCategoryList= (payload:Array<any>) => {
    return{
        type:ProductTypes.SET_PRODUCT_LIST,
        payload
    }
}
export const setLoading= (payload:boolean) => {
    return{
        type:ProductTypes.SET_LOADING,
        payload
    }
}
export const getProductSubCategoryList = (payload:number) => {
    return {
        type:ProductTypes.GET_PRODUCT_SUB_CATEGORY_LIST ,
        payload
    };
};

export const setProductSubCategoryList= (payload:Array<any>) => {
    return{
        type:ProductTypes.SET_PRODUCT_SUB_CATEGORY_LIST,
        payload
    }
}
export const getProductListBySub = (payload:number) => {
    return {
        type:ProductTypes.GET_PRODUCT_LIST_BY_SUB ,
        payload
    };
};

export const setProductListBySub= (payload:any) => {
    return{
        type:ProductTypes.SET_PRODUCT_LIST_BY_SUB,
        payload
    }
}
export const getStocks= () => {
    return{
        type:ProductTypes.GET_STOCKS,
    }
}
export const  setStocks= (payload:any) => {
    return{
        type:ProductTypes.SET_STOCKS,
        payload
    }
}
export const  getNextProductsList= (payload:any) => {
    return{
        type:ProductTypes.GET_NEXT_PRODUCT_LIST,
        payload
    }
}
export const  setNextProductsList= (payload:any) => {
    return{
        type:ProductTypes.SET_NEXT_PRODUCT_LIST,
        payload
    }
}
