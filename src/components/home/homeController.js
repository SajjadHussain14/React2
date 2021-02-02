import * as Data from "../../Data";
import { productColorsStyle } from "../../settings";
import { reactLocalStorage } from "reactjs-localstorage";

export const getFeaturedProducts = () => {
  let featuredProducts = [];
  featuredProducts = Data.allProducts.filter(
    (product) => product.featured == "yes"
  );
  return featuredProducts;
};

export const getRecentlyViewed = () => {
  let rViewedProducts = [];
  rViewedProducts = reactLocalStorage.getObject("recentlyViewed");
  if (rViewedProducts && rViewedProducts.length > 0) {
  } else {
    rViewedProducts = [];
  }

  return rViewedProducts;
};
