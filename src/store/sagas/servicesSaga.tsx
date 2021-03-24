import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { CategoryTypes, LoginTypes, MainTypes, ServicesTypes } from '../constants';
import Services from "../../services/api/services"
import { setServiceList } from '../actions/serviceAction';
import { chooseLanguageIndex } from '../../utils/config';




function* getServices(index:any) {
	const languageIndex=chooseLanguageIndex()

	try {	
			//@ts-ignore
		const services = yield Services.getServices(index.payload);
		let list=[]
		for(let i=0;i<services.length;i++){
			let obj={}
			console.log(services[i].service.title[languageIndex],"services[i].service.title",languageIndex);
			
			obj={
				title:services[i].service.title[languageIndex].value,
				description:services[i].service.description[languageIndex].value,
				icon:services[i].service.icon,
				has_discount:services[i].has_discount,
				subservices:services[i].subservices
			}
			list.push(obj)
		}
		 yield put(setServiceList(list))


	} catch (ex) {
		console.log(ex);
	}
}

export function* watchServices() {
	yield takeEvery(
		ServicesTypes.GET_SERVICE_LIST  as any,
		getServices
	)


}
