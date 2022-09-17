import { createSelector } from 'reselect';
//initial selector:
const selectCategoryReducer = (state) => state.categories; //get entire redux state & want category's slice fo the redux store 
//create a memory selector: called selectCateories
export const selectCategories =  createSelector(
    [selectCategoryReducer],
    (categoriesSlice) =>categoriesSlice.categories
);
//selectCategories: give us back the categoriesArray that live on the category slice of redux state
//createSelector method: creates a selector and it takes two arguments:first is an array of input selectors and the second is 
// going to be the output selector.

export const selectCategoriesMap = createSelector(
 [selectCategories],        
 (categories) => {
    console.log('selector fired');
    return categories.reduce((acc, category) => {
        const { title, items } = category;
        // console.log(title, items);
        acc[title.toLowerCase()] = items;
        // console.log(acc);
        return acc;
    }, {});
}
); 

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log('isLoading Selector  ' + categoriesSlice.isLoading);
        return categoriesSlice.isLoading;
    }
);

//     (state) =>
//   state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     // console.log(title, items);
//     acc[title.toLowerCase()] = items;
//     // console.log(acc);
//     return acc;
//   }, {});
