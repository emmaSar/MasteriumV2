import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { CategoryTypes, LoginTypes, MainTypes } from '../constants';
import Auth from "../../services/api/auth"
import Main from "../../services/api/main"

import { setCategoryList, setSubCategoryList } from '../actions/categoryActions';
import { setAddresses, getAddresses, setMyMasters, setHelp, setFriends, setLoading, setPopularSubCategory, setExecutor, getMyMasters, setCreditCards, setErrorMessage, setChatUserId, setUnseen, setNotifications, setNextNotifications, setUplodFile, setAdminPhone } from '../actions/mainActions';
import { setUserInfo } from '../actions/loginActions';
import moment from 'moment';
import { chooseLanguageIndex } from '../../utils/config';




function* upload(image: any) {
	try {	//@ts-ignore

		const url = yield Main.uploadTaskImage(image.payload.img,false);

		//yield put(setCategoryList(list))


	} catch (ex) {
		console.log(ex);
	}
}

function* downloadFile(data: any) {
	try {
		//@ts-ignore
		const url = yield Main.downloadFile(data.payload);
		console.log(url,"urlurlurlurlurlurlurlurl");
		
		//yield put(setCategoryList(list))


	} catch (ex) {
		console.log(ex);
	}
}
function* uploadFile(data: any) {
	try {
			//@ts-ignore

		const url = yield Main.uploadTaskImage(data.payload,true);
		yield put(setUplodFile(url.url))
		yield put(setLoading(false))

		// console.log("---------url",url);
		
		//yield put(setCategoryList(list))


	} catch (ex) {
		console.log(ex);
	}
}
function* getDatas() {
	try {
			//@ts-ignore

		const data_list = yield Main.getAddresses();

		yield put(setAddresses(data_list))


	} catch (ex) {
		console.log(ex);
	}
}
function* setPrimaryAddress({ payload }: any) {
	try {
			//@ts-ignore

		const data_list = yield Main.setPrimaryAddress(payload.id);



	} catch (ex) {
		console.log(ex);
	}
}
function* addAddress(data: any) {
	try {
			//@ts-ignore

		const info = yield Main.addAddress(data.payload);
		yield put(getAddresses())
	} catch (ex) {
		console.log(ex);
	}
}
const languageIndex=chooseLanguageIndex()

function* getMyMastersSaga() {
	try {
			//@ts-ignore

		const data = yield Main.getMyMasters();
		let list = []
		for (let i = 0; i < data.length; i++) {
			let array = data[i].master.executor_specializations
			let specializations = []
			for (let ind = 0; ind < array.length; ind++) {
				specializations.push({ title: array[ind].specialization[languageIndex].value })
			}
			list.push({
				id: data[i].master.user_id,
				first_name: data[i].master.first_name,
				last_name: data[i].master.last_name,
				phone_number: data[i].master.phone_number,
				rating: data[i].master.rating,
				specializations: specializations,
				image: data[i].master.image
			})
		}
		yield put(setMyMasters(list))


	} catch (ex) {
		console.log(ex);
	}
}

function* deleteMyMasterById({ payload }: any) {
	try {	//@ts-ignore

		const data = yield Main.deleteMyMasterById(payload);
		if (data.message == "OK") {
			yield put(setLoading(true))
			yield put(getMyMasters())
		}
	} catch (ex) {
		console.log(ex);
	}
}

function* getHelp() {
	try {	//@ts-ignore

		const data = yield Main.getHelp();
		yield put(setHelp(data))
	} catch (ex) {
		console.log(ex);
	}
}
function* getFriends() {
	try {
			//@ts-ignore

		const data = yield Main.getFriends();
		yield put(setFriends(data))
	} catch (ex) {
		console.log(ex);
	}
}
function* addFriend({ payload }: any) {
	try {
			//@ts-ignore

		const data = yield Main.addFriend(payload.phone_number);
		yield put(setLoading(false))
	} catch (ex) {
		console.log(ex);
	}
}
function* getMe() {
	try {
			//@ts-ignore

		const data = yield Main.getMe();

		yield put(setUserInfo(data))
	} catch (ex) {
		console.log(ex);
	}
}
function* getPopularSubCategory() {
	try {
			//@ts-ignore

		const data = yield Main.getPopularSubCategory();
		yield put(setPopularSubCategory(data))
	} catch (ex) {
		console.log(ex);
	}
}
function* getExecutorById({ payload }: any) {
	try {
			//@ts-ignore

		const result = yield Main.getExecutorById(payload.id);
			//@ts-ignore

		const review = yield Main.getUserReviewById(payload.id)
		console.log(result,"-------");
		
		yield put(setExecutor({ ...result, ...review }))
		yield put(setLoading(false))
	} catch (ex) {
		console.log(ex);
	}
}
function* addExecutor({ payload }: any) {
	try {
		//	console.log(payload,"getSuborderDetails---");
			//@ts-ignore

		const result = yield Main.addExecutor(payload.id);
		yield put(setLoading(false))

	} catch (ex) {
		console.log(ex);
	}
}
function* addCreditCards({ payload }: any) {
	try {	//@ts-ignore

		const result = yield Main.addCreditCard(payload.user, payload.number, payload.month, payload.year, payload.cvc);
			//@ts-ignore

		const res = yield Main.sendCodeToMe()
		yield put(setLoading(false))
	} catch (ex) {
		console.log(ex);
	}
}
function* checkCode({ payload }: any) {
	try {
			//@ts-ignore

		const result = yield Main.checkCode(payload.code);
		if (result.message !== "OK") {
			yield put(setErrorMessage(true))
		}
		else {
			yield put(setErrorMessage(false))

		}

		yield put(setLoading(false))
	} catch (ex) {
		console.log(ex);
	}
}
function* getCreditCards({ payload }: any) {
	try {
			//@ts-ignore

		const result = yield Main.getCreditCards(payload.id);
		yield put(setCreditCards(result))
		yield put(setLoading(false))
	} catch (ex) {
		console.log(ex);
	}
}
function* getRoomForUser({ payload }: any) {
	try {
			//@ts-ignore

		const result = yield Main.getRoomForUser(payload.user_id, payload.is_with_admin);
		yield put(setChatUserId(result.id))
	} catch (ex) {
		console.log(ex);
	}
}
function* getUnseenMessageCount() {
	try {	//@ts-ignore

		const message = yield Main.getUnseenMessageCount();
			//@ts-ignore

		const notification = yield Main.getUnseenNotificationCount();
		yield put(setUnseen({ unseenMessage: message.unseen_message_room_count, unseenNotification: notification.count }))
	} catch (ex) {
		console.log(ex);
	}
}
function* getMyNotifictation() {
	try {
			//@ts-ignore

		const notifiaction = yield Main.getMyNotification();
		let nots = { ...notifiaction }
		let array = [...notifiaction.results]
		let list = []
		for (let i = 0; i < array.length; i++) {
			let t=languageIndex==0?array[i].notification_type_details.text_ru:languageIndex==1?array[i].notification_type_details.text_en:array[i].notification_type_details.text_ge
			let text = t.replace("{{NUMBER}}", array[i].salary_or_disput)
			text = text.replace("{{ORDERNUMBER}}", array[i].order_number)
			text = text.replace("{{USERFULLNAME}}", array[i].user_name)
			text = array[i].order_status_name !== null ? text.replace("{{ORDERSTATUS}}", array[i].order_status_name[0].title.value) : text
			text = array[i].order_status_name !== null ? text.replace("{{DISPUTSTATUS}}", array[i].disput_status_name[0].title.value) : text
			list.push({
				date: moment.utc(array[i].created_at).format("D.MM.Y"),
				text: text
			})
			//moment.utc( t[i].start_date).format("D.MM.Y")
		}
		nots = { ...nots, results: list }
		yield put(setNotifications(nots))
		yield put(setLoading(false))

	} catch (ex) {
		console.log(ex);
	}
}
function* getNextNotifications({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
	//@ts-ignore
		const notifiaction = yield Main.getNextNotifications(payload.body);
		let nots = { ...notifiaction }
		let array = [...notifiaction.results]
		let list = []
		for (let i = 0; i < array.length; i++) {
			let t=languageIndex==0?array[i].notification_type_details.text_ru:languageIndex==1?array[i].notification_type_details.text_en:array[i].notification_type_details.text_ge
			let text = t.replace("{{NUMBER}}", array[i].salary_or_disput)
			text = text.replace("{{ORDERNUMBER}}", array[i].order_number)
			text = text.replace("{{USERFULLNAME}}", array[i].user_name)
			text = array[i].order_status_name !== null ? text.replace("{{ORDERSTATUS}}", array[i].order_status_name[0].title.value) : text
			text = array[i].order_status_name !== null ? text.replace("{{DISPUTSTATUS}}", array[i].disput_status_name[0].title.value) : text
			list.push({
				date: moment.utc(array[i].created_at).format("D.MM.Y"),
				text: text
			})
			//moment.utc( t[i].start_date).format("D.MM.Y")
		}
		nots = { ...nots, results: list }
	 yield put (setNextNotifications(nots))		
	yield put (setLoading(false))		

		
	} catch (ex) {
		console.log(ex);
	}
}
function* setMessageSeeen({ payload }: any) {
	try {
		//@ts-ignore
		const seen = yield Main.setMessageSeeen(payload.id)

	} catch (ex) {
		console.log(ex);
	}
}
	function* getAdminPhone() {
		try {
			//@ts-ignore
			const data = yield Main.getAdminPhone()
			yield put(setAdminPhone(data.results[0].phone_for_client))
		} catch (ex) {
			console.log(ex);
		}
	}
export function* watchMain() {
	yield takeEvery(
		MainTypes.DOWNLOAD_FILE as any,
		downloadFile
	)
	yield takeEvery(
		MainTypes.UPLOAD_FILE as any,
		uploadFile
	)
	yield takeEvery(
		MainTypes.GET_URL as any,
		upload
	)
	yield takeEvery(
		MainTypes.GET_COMPANY_TYPE as any,
		upload
	)
	yield takeEvery(
		MainTypes.GET_MY_NOTIFICATION as any,
		getMyNotifictation
	)
	yield takeEvery(
		MainTypes.GET_UNSEEN_MESSAGE_COUNT as any,
		getUnseenMessageCount
	)
	yield takeEvery(
		MainTypes.GET_ADDRESSES as any,
		getDatas
	)
	yield takeEvery(
		MainTypes.ADD_ADDRESS as any,
		addAddress
	)
	yield takeEvery(
		MainTypes.GET_MY_MASTERS as any,
		getMyMastersSaga
	)
	yield takeEvery(
		MainTypes.DELETE_MY_MASTER_BY_ID as any,
		deleteMyMasterById
	)
	yield takeEvery(
		MainTypes.GET_HELP as any,
		getHelp
	)
	yield takeEvery(
		MainTypes.GET_FRIENDS as any,
		getFriends
	)
	yield takeEvery(
		MainTypes.ADD_FRIEND as any,
		addFriend
	)
	yield takeEvery(
		MainTypes.GET_ME as any,
		getMe
	)
	yield takeEvery(
		MainTypes.GET_POPULAR_SUB_CATEGORY as any,
		getPopularSubCategory
	)
	yield takeEvery(
		MainTypes.GET_EXECUTOR_BY_ID as any,
		getExecutorById
	)
	yield takeEvery(
		MainTypes.ADD_EXECUTOR as any,
		addExecutor
	)
	yield takeEvery(
		MainTypes.ADD_CREDIT_CARD as any,
		addCreditCards
	)
	yield takeEvery(
		MainTypes.CHECK_CODE as any,
		checkCode
	)
	yield takeEvery(
		MainTypes.GET_CREDIT_CARDS as any,
		getCreditCards
	)
	yield takeEvery(
		MainTypes.GET_ROOM_FOR_USER as any,
		getRoomForUser
	)
	yield takeEvery(
		MainTypes.GET_NEXT_NOTIFICATIONS as any,
		getNextNotifications
	)
	yield takeEvery(
		MainTypes.SET_MESSAGE_SEEN as any,
		setMessageSeeen
	)
	yield takeEvery(
		MainTypes.GET_ADMIN_PHONE as any,
		getAdminPhone
	)
	yield takeEvery(
		MainTypes.SET_PRIMARY_ADDRESS as any,
		setPrimaryAddress
	)
}
