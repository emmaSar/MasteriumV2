import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { LoginTypes } from '../constants';
import Auth from "../../services/api/auth"

// import {loginAction} from "../actions/loginActions"
// import { WorkExperienceEP, AnalyticsEP } from '../../services/api/routes';
// import { setUserWorkExperiences } from '../actions/workExperience';
// import { IWorkExperience, IAction, GetAnalyticsProps } from '../../types/interfaces';
// import { GetAnalytics } from '../../types/enums';
// import { setAnalytics } from '../actions/analyticsActions';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationScreenProp } from 'react-navigation';
import { error, setMessage, setUserData, setUserInfo } from '../actions/loginActions';
import { setMasteriumApiAuthorizationHeader } from '../../services/api/authInstance';
import Main from "../../services/api/main"
import { setCompanyType, setLoading } from '../actions/mainActions';

interface ILoginPayload {
	payload: {
		login: string;

	};
}

function replaceAll(string: string, search: string, replace: string) {
	return string.split(search).join(replace);
}

function* loginSaga(data: any) {
	try {

		let a = replaceAll(data.payload, '-', '')
		let phone = '+995' + replaceAll(a, ' ', '')
		const user_data = yield Auth.login(
			phone,
		);

		yield put(setUserData(user_data))


	} catch (ex) {
		console.log(ex);
	}
}
function* verification({ payload }: any) {
	try {
		const user_data = yield Auth.verification(
			payload.phone_number,
			payload.code,
		);


		if (user_data.error == undefined) {
			
			AsyncStorage.setItem('token', JSON.stringify(user_data.token))
			if (user_data.user.first_name == '') {
				const types = yield Main.getCompanyType(user_data.token)
				let array: any
				array = []
				for (let i = 0; i < types.length; i++) {

					array = [...array, { id: types[i].company_type.id, value: types[i].title[0]?.value }]
				}
				yield put(setCompanyType(array))
			}
			else{
				
				setMasteriumApiAuthorizationHeader(user_data.token)
			}
			yield put(setUserInfo(user_data.user))
		}

		else {
			yield put(setUserInfo(user_data))
		}

	} catch (ex) {
		console.log(ex);
	}
}

function* setName({ payload }: any) {
	try {
		const t = yield AsyncStorage.getItem('token')
		const token=JSON.parse(t)
		const user_data = yield Auth.setName(
			payload.first_name,
			payload.last_name,
			token,
			payload.is_cooperative_user,
			payload.company_name,
			payload.company_type,
			payload.company_id,
			payload.email,
			//payload.credit_card_number
		
		);

		// const user_data= yield Auth.verification(
		// 	payload.phone_number,
		// 	payload.code,
		// );
		 yield put(setUserInfo(user_data.user_details))	


	} catch (ex) {
		console.log(ex);
	}
}
function* setCity({ payload }: any) {
	try {
		
		// const t = yield AsyncStorage.getItem('token')
		// const token=JSON.parse(t)
		const user_data = yield Auth.setCity(
		payload
		
		);
		let data={...user_data.user_details}
		data.company_type=user_data.company_type.length>0? user_data.company_type[0]?.value:null
		 yield put(setUserInfo(data))	


	} catch (ex) {
		console.log(ex);
	}
}
function* editInfo({ payload }: any) {
	try {
		console.log(payload,"payload");
		// if(payload.image){

		// }
		
		if(payload.image==!null && typeof(payload.image)!=='string'){
			
			const d = yield Main.uploadTaskImage(payload.image);
			payload={...payload,image:d.url}
		}
		const user_data = yield Auth.editInfo(payload);
		if(user_data!=="Error"){
			let data={...user_data.user_details}
			 data.company_type=user_data.company_type.length>0? user_data.company_type[0]?.value:""
		 yield put(setUserInfo(data))	
		 yield put(error(false))
		 yield put(setLoading(false))
		}
		else{
			yield put(error(true))
		}


	} catch (ex) {
		console.log(ex);
	}
}
function* changePhone(data: any) {
	try {

		let a = replaceAll(data.payload, '-', '')
		let phone = '+995' + replaceAll(a, ' ', '')
		const user_data = yield Auth.changePhone(
			phone,
		);
			if(user_data.message==undefined){
				yield put(setUserData(user_data))
			}
			else{
				yield put(error(true))
			}
	


	} catch (ex) {
		console.log(ex);
	}
}
function* checkCode(payload: any) {
	try {		
		const data = yield Auth.checkCode(
			payload.payload.phone_number,
			payload.payload.code,
		);
			yield put(setMessage(data.message))
		// yield put(setUserInfo(user_data.user))


	} catch (ex) {
		console.log(ex);
	}
}

export function* watchLogin() {
	yield takeEvery(
		LoginTypes.LOGIN as any,
		loginSaga
	),
		yield takeEvery(
			LoginTypes.VERIFICATION as any,
			verification
		),
		yield takeEvery(
			LoginTypes.SET_NAME as any,
			setName
		),
		yield takeEvery(
			LoginTypes.SET_CITY as any,
			setCity
		)
		yield takeEvery(
			LoginTypes.EDIT_INFO as any,
			editInfo
		)
		yield takeEvery(
			LoginTypes.SEND_CHANGE_PHONE as any,
			changePhone
		)
		yield takeEvery(
			LoginTypes.CHECK_CODE as any,
			checkCode
		)
}
