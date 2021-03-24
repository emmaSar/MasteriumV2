import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { CategoryTypes, LoginTypes } from '../constants';
import Category from "../../services/api/category"
import { setCategoryList, setSubCategoryList } from '../actions/categoryActions';
import { chooseLanguageIndex } from '../../utils/config';


interface ILoginPayload {
	payload: {
		login: string;

	};
}

function replaceAll(string: string, search: string, replace: string) {
	return string.split(search).join(replace);
}
const languageIndex=chooseLanguageIndex()

function* categoryList() {
	try {
        
	 
		const category = yield Category.getCategory();
		let list=[]
		for(let i=0;i<category.length;i++){
			let obj={}
			obj={id:category[i].category.id,
				color_one:category[i].category.color_one,
				color_two:category[i].category.color_two,
				image:category[i].category.icon,
				title:category[i].title[languageIndex].value,
				specialists_count:category[i].specialists_count,
				workload_percent:category[i].workload_percent,
				description:category[i].description[languageIndex].value
			}
			list.push(obj)
		}

		 yield put(setCategoryList(list))


	} catch (ex) {
		console.log(ex);
	}
}
function* subCategoryList({ payload }: any) {
	try {
        
	
		const sublist = yield Category.getSubCategoryByCategory(payload);
		let list=[]
		for(let i=0;i<sublist.length;i++){
			let obj={}
			obj={image:sublist[i].subcategory.icon,title:sublist[i].title[1].value,id:sublist[i].subcategory.id}
			list.push(obj)
		}
		let id=payload-1
		yield put(setSubCategoryList({list,id:payload}))
	} catch (ex) {
		console.log(ex);
	}
}




export function* watchCategory() {
	yield takeEvery(
		CategoryTypes.GET_CATEGORY_LIST as any,
		categoryList
	)
	yield takeEvery(
		CategoryTypes.GET_SUB_CATEGORY_LIST as any,
		subCategoryList
	)


}
