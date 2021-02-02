export const initialState = {
  basket: [],
  user: null,
  sFilters: {},
  products: [],
  sortby: "default",
};

// Selector
export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...action.item],
      };

    case "ADD_FILTERS":
      return {
        ...state,
        sFilters: action.filterItems,
      };

    case "ADD_PRODUCTS":
      return {
        ...state,
        products: action.productsItems,
      };

    case "SORT_BY":
      return {
        ...state,
        sortby: action.sortText,
      };

    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }

      return {
        ...state,
        basket: newBasket,
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return state;
  }
};

export default reducer;
