import React from "react";
import { useStateValue } from "../../StateProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import * as Data from "../../Data";

const productsBySelectedBrands = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.brand == filters.brand) {
        if (selectedProducts.includes(prods)) {
        } else {
          selectedProducts.push(prods);
        }
      }
    });
  } else {
    selectedProducts = [];
  }
  return selectedProducts;
};

export const GetSelectedFilters = (props) => {
  const [{ basket, sFilters }, dispatch] = useStateValue();
  let storedFilters;
  let filters = reactLocalStorage.getObject("storedFilters");

  const removeCategyFilters = (
    slectedFilters,
    term,
    value,
    history,
    isHistory
  ) => {
    let index;
    if (
      term == "brand" ||
      term == "color" ||
      term == "size" ||
      term == "priceRange"
    ) {
      index = slectedFilters[term].indexOf(value);
      slectedFilters[term].splice(index, index + 1);
      if (slectedFilters[term].length == 0) {
        delete slectedFilters[term];
      }
    } else {
      delete slectedFilters[term];
      delete slectedFilters[value];
    }

    //reactLocalStorage.clear('storedFilters')

    dispatch({
      type: "ADD_FILTERS",
      filterItems: {
        ...slectedFilters,
      },
    });
    filters = reactLocalStorage.setObject("storedFilters", slectedFilters);
    if (slectedFilters.subTyp_3_Url) {
      history.push("/category/" + slectedFilters.subTyp_3_Url);
    } else if (slectedFilters.subTyp_2_Url) {
      history.push("/category/" + slectedFilters.subTyp_2_Url);
    } else if (slectedFilters.subTyp_1_Url) {
      history.push("/category/" + slectedFilters.subTyp_1_Url);
    } else if (slectedFilters.typ_Url) {
      history.push("/category/" + slectedFilters.typ_Url);
    } else if (slectedFilters.dept_Url) {
      history.push("/category/" + slectedFilters.dept_Url);
    } else {
      history.push("/category/all-products");
    }
  };

  const removeFilter = (slectedFilters, term, value) => {
    let index;
    if (
      term == "brand" ||
      term == "color" ||
      term == "size" ||
      term == "priceRange"
    ) {
      index = slectedFilters[term].indexOf(value);
      slectedFilters[term].splice(index, index + 1);
      if (slectedFilters[term].length == 0) {
        delete slectedFilters[term];
      }
    } else {
      delete slectedFilters[term];
    }

    // reactLocalStorage.clear('storedFilters')

    dispatch({
      type: "ADD_FILTERS",
      filterItems: {
        ...slectedFilters,
      },
    });
    filters = reactLocalStorage.setObject("storedFilters", slectedFilters);
  };
  let history = useHistory();

  return (
    <>
      {props.filters.dept && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "dept",
                "dept_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.dept}
        </span>
      )}

      {props.filters.typ && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "typ",
                "typ_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.typ}
        </span>
      )}

      {props.filters.subTyp_1 && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "subTyp_1",
                "subTyp_1_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.subTyp_1}
        </span>
      )}
      {props.filters.selectedsubTyp_2 && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeCategyFilters(
                props.filters,
                "subTyp_2",
                "subTyp_2_Url",
                history,
                "yes"
              );
            }}
          ></i>
          {props.filters.selectedsubTyp_2}
        </span>
      )}

      {props.filters.selectedsubTyp_3 && (
        <span className="d-block mb-2">
          <i
            className="fa fa-times pr-2"
            onClick={() => {
              removeFilter(props.filters, "subTyp_3", productsBySelectedBrands);
            }}
          ></i>
          {props.filters.selectedsubTyp_3}
        </span>
      )}

      {props.filters.color
        ? props.filters.color.map((seleted_Color) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "color", seleted_Color);
                  }}
                ></i>
                {seleted_Color}
              </span>
            );
          })
        : ""}

      {props.filters.brand
        ? props.filters.brand.map((seleted_Brand) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "brand", seleted_Brand);
                  }}
                ></i>
                {seleted_Brand}
              </span>
            );
          })
        : ""}

      {props.filters.size
        ? props.filters.size.map((slected_Sizes) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "size", slected_Sizes);
                  }}
                ></i>
                {slected_Sizes}
              </span>
            );
          })
        : ""}

      {props.filters.priceRange
        ? props.filters.priceRange.map((slected_price) => {
            return (
              <span className="d-block mb-2">
                <i
                  className="fa fa-times pr-2"
                  onClick={() => {
                    removeFilter(props.filters, "priceRange", slected_price);
                  }}
                ></i>
                {slected_price}
              </span>
            );
          })
        : ""}
    </>
  );
};

export const shopByPrice = () => {
  let priceRange = [];
  priceRange = [
    "below $50",
    "$51-$100",
    "$101-$150",
    "$151-$200",
    "$201 & 250",
    "above $250",
  ];
  return priceRange;
};

export const shopByBrand = (getProducts) => {
  let brandFilters = [];
  let i = -1;
  if (getProducts.length > 0) {
    getProducts.map((prods) => {
      if (brandFilters.includes(prods.brand)) {
      } else {
        brandFilters.push(prods.brand);
      }
    });
  } else {
  }
  return brandFilters;
};

export const shopBySize = (getProducts) => {
  let selectedSizes = [];
  getProducts.map((product) => {
    if (product.gener == "simple") {
      /* product.size.map((prodsize) => {
      if (selectedSizes.includes(prodsize)) {
      } else {
        selectedSizes.push(prodsize)
      }
    })*/
    } else {
      product.variants.map((vProducts) => {
        if (selectedSizes.includes(vProducts.size)) {
        } else {
          selectedSizes.push(vProducts.size);
        }
      });
    }
  });

  return selectedSizes;
};

export const shopByColor = (getProducts) => {
  let selectedColors = [];

  getProducts.map((product) => {
    if (product.gener == "simple") {
      if (product.color.length != 0) {
        /*  product.color.map((prodColor) => {
            if (selectedColors.includes(prodColor.name)) {
            } else {
              selectedColors.push(prodColor.name)
            }
          })*/
      }
    } else {
      product.variants.map((vProducts) => {
        if (vProducts.color != null) {
          vProducts.color.map((prodColor) => {
            if (selectedColors.includes(prodColor.name)) {
            } else {
              selectedColors.push(prodColor.name);
            }
          });
        }
      });
    }
  });

  return selectedColors;
};

export const taxonomyLevels = (filters) => {
  let taxonomyLetvel = 0;
  if (filters.subTyp_2 && filters.subTyp_2 != "Empty") taxonomyLetvel = 4;
  else if (filters.subTyp_1 && filters.subTyp_1 != "Empty") taxonomyLetvel = 3;
  else if (filters.typ && filters.typ != "Empty") taxonomyLetvel = 2;
  else if (filters.dept && filters.dept != "Empty") taxonomyLetvel = 1;
  else taxonomyLetvel = 0;
  return taxonomyLetvel;
};
export const shopByCategories = (currentFilters, url) => {
  let level = 0;
  let categoryData = {
    taxonomy: "",
    categories: [],
  };

  level = taxonomyLevels(currentFilters);
  if (level == 4) {
    Data.allProducts.map((product) => {
      if (product.subTyp_3) {
        if (categoryData.categories.includes(product.subTyp_3)) {
        } else {
          if (
            product.subTyp_2 == url &&
            product.subTyp_3 != "Empty" &&
            product.subTyp_4 == "Empty"
          ) {
            categoryData.categories.push(product.subTyp_3);
            categoryData.taxonomy = "subTyp_3";
          }
        }
      }
    });
  } else if (level == 3) {
    Data.allProducts.map((product) => {
      if (product.subTyp_2) {
        if (categoryData.categories.includes(product.subTyp_2)) {
        } else {
          if (
            product.subTyp_1 == url &&
            product.subTyp_2 != "Empty" &&
            product.subTyp_3 == "Empty"
          ) {
            categoryData.categories.push(product.subTyp_2);
            categoryData.taxonomy = "subTyp_2";
          }
        }
      }
    });
  } else if (level == 2) {
    Data.allProducts.map((product) => {
      if (product.subTyp_1) {
        if (categoryData.categories.includes(product.subTyp_1)) {
        } else {
          if (
            product.typ == url &&
            product.subTyp_1 != "Empty" &&
            product.subTyp_2 == "Empty"
          ) {
            categoryData.categories.push(product.subTyp_1);
            categoryData.taxonomy = "subTyp_1";
          }
        }
      }
    });
  } else if (level == 1) {
    Data.allProducts.map((product) => {
      if (product.typ) {
        if (categoryData.categories.includes(product.typ)) {
        } else {
          if (
            product.dept == url &&
            product.typ != "Empty" &&
            product.subTyp_1 == "Empty"
          ) {
            categoryData.categories.push(product.typ);
            categoryData.taxonomy = "typ";
          }
        }
      }
    });
  } else if (level == 0) {
    Data.allProducts.map((product) => {
      if (product.dept) {
        if (
          categoryData.categories.includes(product.dept) ||
          product.dept == "" ||
          product.dept == " " ||
          product.dept == "Empty"
        ) {
        } else {
          categoryData.categories.push(product.dept);
          categoryData.taxonomy = "dept";
        }
      }
    });
  } else {
  }

  return categoryData;
};
