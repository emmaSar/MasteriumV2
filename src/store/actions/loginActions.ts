import { LoginTypes } from "../constants"
interface ILoginPayload {
	login?: string,
	password?: string,
}
export interface ISendFormPayload {
	login?: string,
	name?:string,
	title?:string,
	text?:string,
	contact_info?:string,
	agreement?: string
}
interface IUserData {
   id:number,
   phone_number:string,
   created_at:string
}
interface IVerification {
	phone_number:string,
	code:string,
 }
 interface IInfo {
	first_name:string,
	last_name:string,
 }
export const changePhone = (payload: string) => {
	return {
		type: LoginTypes.CHANGE_PHONE,
		payload,
	};
};
export const setImage = (payload: string) => {
	return {
		type: LoginTypes.SET_IMAGE,
		payload,
	};
};
export const setVisibleDrawer = (visible: boolean) => {
	return {
		type: LoginTypes.SET_DRAWER_VISIBLE,
		payload:visible,
	};
};
export const setDay = (payload: string) => {
	return {
		type: LoginTypes.SET_DAY,
		payload,
	};
};
export const loginAction = (payload: string) => {
	return {
		type: LoginTypes.LOGIN,
		payload,
	};
};
export const setUserData = (payload: any) => {
	return {
		type: LoginTypes.SET_USER_DATA,
		payload,
	};
};
export const setUser = () => {
	return {
		type: LoginTypes.SET_USER,
	};
};
export const setUserInfo = (payload: any) => {
	
	return {
		type: LoginTypes.SET_USER_INFO,
		payload,
	};
};
export const verification = (payload: IVerification) => {
	return {
		type: LoginTypes.VERIFICATION,
		payload,
	};
};
export const setName = (payload: any) => {
	return {
		type: LoginTypes.SET_NAME,
		payload,
	};
};
export const setCity = (payload: string) => {
	return {
		type: LoginTypes.SET_CITY,
		payload,
	};
};
export const editInfo = (payload: any) => {
	return {
		type: LoginTypes.EDIT_INFO,
		payload,
	};
};
export const error = (payload: any) => {
	return {
		type: LoginTypes.ERROR,
		payload,
	};
};
export const sendChangePhone = (payload: string) => {
	return {
		type: LoginTypes.SEND_CHANGE_PHONE,
		payload,
	};
};
export const checkCode = (payload: IVerification) => {
	return {
		type: LoginTypes.CHECK_CODE,
		payload,
	};
};
export const setMessage=(payload:string)=>{
	return {
		type:LoginTypes.SET_MESSAGE,
		payload
	}
}
export const changePhoneNumber=(payload:any)=>{
	return {
		type:LoginTypes.CHANGE_PHONE_NUMBER,
		payload
	}

}






