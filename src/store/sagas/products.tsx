import { put, all, takeLatest, select, call, take, takeEvery } from 'redux-saga/effects';
import { CategoryTypes, LoginTypes, MainTypes, ProductTypes } from '../constants';
import Product from "../../services/api/products"
import { setNextProductsList, setProductCategoryList, setProductListBySub, setProductSubCategoryList, setStocks } from '../actions/products';
import { chooseLanguageIndex } from '../../utils/config';
import { setLoading } from '../actions/mainActions';


const languageIndex=chooseLanguageIndex()

function* getProductList(payload:any) {
	try {        
    //@ts-ignore
		const category = yield Product.getProductCategory();
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
		 yield put(setProductCategoryList(list))   
       
        
	} catch (ex) {
		console.log(ex);
	}
}
function* productSubCategoryList({ payload }: any) {
	try {
        //@ts-ignore
	
		const sublist = yield Product.getProductSubCategoryByCategory(payload);
		let list=[]
		for(let i=0;i<sublist.length;i++){
			let obj={}
			obj={image:sublist[i].subcategory.icon,title:sublist[i].title[languageIndex].value,id:sublist[i].subcategory.id}
			list.push(obj)
		}
		// let id=payload-1
		 yield put(setProductSubCategoryList(list))
	} catch (ex) {
		console.log(ex);
	}
}
function* getNextProductList({ payload }: any) {
	try {        
    //@ts-ignore
        const data = yield Product.getNextProducts(payload.body);
		let products=data.results
        let list=[]
        for(let i=0;i<products.length;i++){
            let primaryImage=""
            for(let a=0;a<products[i].images.length;a++){
              if(  products[i].images[a].is_primary==true){
                primaryImage= products[i].images[a].image_url
              }
            }
            list.push({price:products[i].product.price,
                title:products[i].title[languageIndex].value,
                discounted_price:products[i].discounted_price,
                minimal_count:products[i].product.minimum_count_for_order,
                description:products[i].description[languageIndex].value,
                images:products[i].images,
                quantity:products[i].product.maximum_count_for_order,
                primaryImage:primaryImage,
                category_id:products[i].product.category_id,
                id:products[i].product.id
            })
        }        
       
        
		 yield put(setNextProductsList({...data,results:list}))
	} catch (ex) {
		console.log(ex);
	}
}
function* getProductListBySub(payload:any) {
	try {        
    //@ts-ignore
        let data = yield Product.getProducts(payload.payload);
		let products=data.results
        let list=[]
        for(let i=0;i<products.length;i++){
            let primaryImage=""
            for(let a=0;a<products[i].images.length;a++){
              if(  products[i].images[a].is_primary==true){
                primaryImage= products[i].images[a].image_url
              }
            }
            list.push({price:products[i].product.price,
                title:products[i].title[languageIndex].value,
                discounted_price:products[i].discounted_price,
                minimal_count:products[i].product.minimum_count_for_order,
                description:products[i].description[languageIndex].value,
                images:products[i].images,
                quantity:products[i].product.maximum_count_for_order,
                primaryImage:primaryImage,
                category_id:products[i].product.category_id,
                id:products[i].product.id
            })
        }        
       
        
		
		yield put(setProductListBySub({...data,results:list}))
	} catch (ex) {
		console.log(ex);
	}
}

function* getStocks() {
	try {
		//@ts-ignore
		const stocks = yield Product.getStocks();
		let list=[]
		for(let i=0;i<stocks.length;i++){
			list.push({image:stocks[i].images[languageIndex].image})
		}
		yield put (setStocks(list))
		yield put(setLoading(false))
		
	
	} catch (ex) {
		console.log(ex);
	}
}
export function* watchProduct() {
	yield takeEvery(
		ProductTypes.GET_PRODUCT_LIST as any,
		getProductList
	)
	yield takeEvery(
		ProductTypes.GET_PRODUCT_SUB_CATEGORY_LIST as any,
		productSubCategoryList
	)
	yield takeEvery(
		ProductTypes.GET_PRODUCT_LIST_BY_SUB as any,
		getProductListBySub
	)
	yield takeEvery(
		ProductTypes.GET_STOCKS as any,
		getStocks
	)
	yield takeEvery(
		ProductTypes.GET_NEXT_PRODUCT_LIST as any,
		getNextProductList
	)
	
}
