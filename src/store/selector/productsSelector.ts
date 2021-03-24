import {  IProducts} from '../reducers/products';



export const productsListSelector = ({ products: { productsList } }: { products: IProducts }) => productsList;
export const loadingSelector = ({ products: { loading } }: { products: IProducts }) => loading;
export const subCategorySelector = ({ products: { product_sub_category_list } }: { products: IProducts }) => product_sub_category_list;
export const productSelector = ({ products: { list } }: { products: IProducts }) => list;
export const stocksSelector = ({ products: { stocks } }: { products: IProducts }) => stocks;




