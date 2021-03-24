import { CategoryTypes } from "../constants"

export const getCategoryList = () => {
	return {
		type: CategoryTypes.GET_CATEGORY_LIST,

	};
};
export const getSubCategoryList = (payload:number) => {
	return {
		type: CategoryTypes.GET_SUB_CATEGORY_LIST,
		payload
	};
};
export const setCategoryList = (payload:Array<any>) => {
	return {
		type: CategoryTypes.SET_CATEGORY_LIST,
		payload
	};
};
export const setResults = (payload:Array<any>) => {
	return {
		type: CategoryTypes.SET_RESULTS,
		payload
	};
};
export const setSubCategoryList = (payload:any) => {
	return {
		type: CategoryTypes.SET_SUB_CATEGORY_LIST,
		payload
	};
};
export const setLoading = (payload:boolean) => {
	return {
		type: CategoryTypes.SET_LOADING,
		payload
	};
};
export const cleanAll = () => {
	return {
		type: CategoryTypes.CLEAN_ALL,
		
	};
};




