import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { CategoryTypes, LoginTypes, MainTypes, OrdersTypes, ServicesTypes } from '../constants';
import Order from "../../services/api/order"
import { setDisputs, setDisputStatus, setMyTransactions, setNewOrder, setNextDisputs, setNextTransaction, setOrderDetails, setOrders, setOrderStatus, setSuborderDetails, setSubOrders } from '../actions/orderAction';
import Main from "../../services/api/main"
import { setLoading, setNextReviews } from '../actions/mainActions';
import moment from 'moment';
import { log } from 'react-native-reanimated';
import { chooseLanguageIndex } from '../../utils/config';







function* createOrder(data: any) {
	try {
		let images = []
		for (let i = 0; i < data.payload.image.length; i++) {
			const d = yield Main.uploadTaskImage(data.payload.image[i]);
			images.push({ image_url: d.url })
		}

		const order = yield Order.createOrder(
			data.payload.description,
			images,
			data.payload.start_date,
			data.payload.address_id,
			data.payload.subservice,
			data.payload.product
		);

		yield put(setNewOrder(order.order_number))


	} catch (ex) {
		console.log(ex);
	}
}
const languageIndex=chooseLanguageIndex()

function* getOrders({ payload }: any) {
	try {


		const orders = yield Order.getOrders(payload.start_index, payload.status_id,payload.limit);
		
		let list = []
		for (let index = 0; index < orders.length; index++) {
			
			let date =moment.utc(orders[index].date).format("D MMM HH:mm")

			
			list.push({
				order_number: orders[index].order_number,
				description: orders[index].description,
				order_id:orders[index].order_id,
				suborder_id:orders[index].suborder_id,
				image: orders[index].image,
				date: date.toString(),
				status: orders[index].status[languageIndex].value,
				guarantee_date: orders[index].guarantee_date,
				is_active: orders[index].is_active,
				price: orders[index].price,
				status_key: orders[index].status_key
			})
		}
		yield put(setOrders({list:list,status:payload.load}))
		yield put(setLoading(false))


	} catch (ex) {
		console.log(ex);
	}
}
function* deleteOrderById({ payload }: any) {
	try {
		//console.log(data.payload.image,"dataaaaaaaaaaaa---");


		const order = yield Order.deleteOrderById(payload.id);
		const orders = yield Order.getOrders(payload.start_index, payload.status_id,payload.limit);
		
		getOrders({start_index:payload.start_index,status_id:payload.status_id,limit:payload.limit})
		let list = []
		for (let index = 0; index < orders.length; index++) {
			let date =moment.utc(orders[index].date).format("D MMM HH:mm")

			list.push({
				order_number: orders[index].order_number,
				description: orders[index].description,
				order_id:orders[index].order_id,
				suborder_id:orders[index].suborder_id,
				image: orders[index].image,
				date: date.toString(),
				status: orders[index].status[languageIndex].value,
				guarantee_date: orders[index].guarantee_date,
				is_active: orders[index].is_active,
				price: orders[index].price,
				status_key: orders[index].status_key
			})
		}
		yield put(setOrders({list:list,status:payload.load}))


	} catch (ex) {
		console.log(ex);
	}
}
function* getOrderStatus() {
	try {
		const statuses = yield Order.getOrderStatus();
		let list=[]		
		for(var index=0;index<statuses.length;index++){
			list.push({label:statuses[index].title[languageIndex].value,value:statuses[index].order_status.id})
		}
			yield put(setOrderStatus(list))


	} catch (ex) {
		console.log(ex);
	}
}

function* getSuborderDetails({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const details = yield Order.getSuborderDetails(payload.suborder_id,payload.order_id);
		let list=details.items
		console.log("listlistlist",list);
		
		let array=[]
		
		for(let i=0;i<list.length;i++){
			array.push({
				name:list[i].name[languageIndex].value,
				price:list[i].price,
				image:list[i].image,
				description:list[i].description[languageIndex].value
			})
		}		
		yield put(setSuborderDetails(array))
	} catch (ex) {
		console.log(ex);
	}
}
function* getDisputStatus({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const details = yield Order.getDisputStatus();
		console.log(details);
		let array=[]
		for (let i=0;i<details.length;i++){
			array.push({label:details[i].title[languageIndex].value,value:details[i].disput_status.id})
		}	
		yield put( setDisputStatus(array))	
	} catch (ex) {
		console.log(ex);
	}
}
function* getDisputs({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const result = yield Order.getDisputs(payload.user_id,payload.status_id);
		yield put (setDisputs(result))
		yield put (setLoading(false))
		
		
	} catch (ex) {
		console.log(ex);
	}
}
function* getNextDisputs({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const result = yield Order.getNextDisputs(payload.body);
	yield put (setNextDisputs(result))		
	yield put (setLoading(false))		

		
	} catch (ex) {
		console.log(ex);
	}
}
function* getNextTransaction({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const result = yield Order.getNextTransaction(payload.body);
	yield put (setNextTransaction(result))		
	yield put (setLoading(false))		

		
	} catch (ex) {
		console.log(ex);
	}
}
function* getNextReviews({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const result = yield Order.getNextReviews(payload.body);
	yield put (setNextReviews(result))		
	yield put (setLoading(false))		

		
	} catch (ex) {
		console.log(ex);
	}
}
function* checkOrderSubOrders({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const data = yield Order.checkOrderSubOrders(payload.id);
	 let result={};
		let res_has_suborder={}
	if(data.has_suborder==false){
		result=yield Order.getOrderDetails(payload.id)
	}
	else {
		if(data.has_one_suborder==true){
			console.log("data.has_one_suborder");
			
			result=yield Order.getSubOrderDetailsById(data.one_suborder_id)
		}
		else{
			console.log();
			
			res_has_suborder=yield Order.getOrderSubOrders(payload.id)
			console.log("res_has_suborder",res_has_suborder);
			
		}
	}
	 yield put(setOrderDetails(result))
	yield put(setSubOrders(res_has_suborder))	
	} catch (ex) {
		console.log(ex);
	}
}
function* getSubOrderDetailsById({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const result = yield Order.getSubOrderDetailsById(payload.id);
		yield put(setOrderDetails(result))

		
	} catch (ex) {
		console.log(ex);
	}
}
function* addReview({ payload }: any) {
	try {
	//	console.log(payload,"getSuborderDetails---");
		const result = yield Order.addReview(payload.to_user,payload.review,payload.rating,payload.for_suborder,payload.tip);

		
	} catch (ex) {
		console.log(ex);
	}
}
function* createDisput({ payload }: any) {
	try {
		let images = []
		for (let i = 0; i < payload.images.length; i++) {
			const d = yield Main.uploadTaskImage(payload.images[i]);
			images.push({ image_url: d.url })
		}
		const result = yield Order.createDisput(payload.id,payload.description,images);
		yield put (setLoading(false))
		console.log("resultresultresultresultresult",result);
		
	} catch (ex) {
		console.log(ex);
	}
}
function* getMyTransactions() {
	try {
		console.log("getMyTransactions");
		
		const result = yield Order.getMyTransactions();
		console.log("resultresultresultresultresult",result);
		yield put(setMyTransactions(result))
		yield put (setLoading(false))
		
		
	} catch (ex) {
		console.log(ex);
	}
}

export function* watchOrder() {
	yield takeEvery(
		OrdersTypes.CREATE_ORDER as any,
		createOrder
	),
		yield takeEvery(
			OrdersTypes.GET_ORDERS as any,
			getOrders
		),
		yield takeEvery(
			OrdersTypes.GET_ORDER_STATUS as any,
			getOrderStatus
		),
		yield takeEvery(
			OrdersTypes.DETETE_ORDER_BY_ID as any,
			deleteOrderById
		),
		yield takeEvery(
			OrdersTypes.GET_SUBORDER_DETAILS as any,
			getSuborderDetails
		)
		yield takeEvery(
			OrdersTypes.GET_DISPUT_STATUS as any,
			getDisputStatus
		)
		yield takeEvery(
			OrdersTypes.GET_DISPUTS as any,
			getDisputs
		)
		yield takeEvery(
			OrdersTypes.CHECK_ORDER_SUB_ORDERS as any,
			checkOrderSubOrders
		)
		yield takeEvery(
			OrdersTypes.GET_SUBORDER_DETAILS_BY_ID as any,
			getSubOrderDetailsById
		)
		yield takeEvery(
			OrdersTypes.ADD_REVIEWE as any,
			addReview
		)
		yield takeEvery(
			OrdersTypes.CREATE_DISPUT as any,
			createDisput
		)
		yield takeEvery(
			OrdersTypes.GET_NEXT_DISPUTS as any,
			getNextDisputs
		)
		yield takeEvery(
			OrdersTypes.GET_NEXT_REVIEWS as any,
			getNextReviews
		)
		yield takeEvery(
			OrdersTypes.GET_MY_TRANSACTION as any,
			getMyTransactions
		)
}
