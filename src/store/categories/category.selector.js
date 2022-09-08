export const selectCategoriesMap = (state) =>
  state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    // console.log(title, items);
    acc[title.toLowerCase()] = items;
    // console.log(acc);
    return acc;
  }, {});
