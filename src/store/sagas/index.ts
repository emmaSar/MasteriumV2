import { all } from 'redux-saga/effects';
import { watchLogin } from './loginSaga';
import { watchCategory } from './categorySaga';
import { watchMain } from './main';
import { watchProduct } from './products';
import { watchServices } from './servicesSaga';
import { watchOrder } from './orderSaga';





export default function* rootSaga() {
	yield all([
        watchLogin(),
		watchCategory(),
		watchMain(),
		watchProduct(),
		watchServices(),
		watchOrder()
	]);
}
