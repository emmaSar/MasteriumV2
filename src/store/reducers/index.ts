import { combineReducers } from 'redux';

import loginReducer from './login'
import mainReducer from './main'
import spareReducer from './spare'
import spareserviceReducer from './spareservice'
import categoryReducer from './category'
import productsReducer from './products';
import orderReducer from './order';
import serviceReducer from './service';



export default combineReducers({
    spare:spareReducer,
    login:loginReducer,
    main:mainReducer,
    spareservice:spareserviceReducer,
    category:categoryReducer,
    products:productsReducer,
    order:orderReducer,
    service:serviceReducer
});
