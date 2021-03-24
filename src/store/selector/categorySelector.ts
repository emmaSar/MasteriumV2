import { ICategoryState } from '../reducers/category';
export const resultSelector = ({ category: { results } }: { category: ICategoryState }) => results;
export const categoryListSelector = ({ category: { category_list } }: { category: ICategoryState }) => category_list;
export const subCategoryListSelector = ({ category: { sub_category_list } }: { category: ICategoryState }) => sub_category_list;
export const LoadingSelector = ({ category: { loading } }: { category: ICategoryState }) => loading;



