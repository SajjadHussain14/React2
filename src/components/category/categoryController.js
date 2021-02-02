import * as Data from "../../Data";
import * as hC from "../header/headerController";
import { prodImagesDir } from "../../settings";
import { Link } from "react-router-dom";

export const getProducts = (
  filters,
  products,
  dispatch,
  property,
  url,
  taxonomy
) => {
  let getProducts = [];
  let selectedProducts = [];
  let allProducts = Data.allProducts;
  let i = -1;

  if (url == "all-products") {
    filters["all-products"] = "all-products";
  }

  if (taxonomy == "subTyp_2") {
    getProducts = allProducts.filter(
      (prod) =>
        prod.subTyp_2 == url &&
        prod.subTyp_3 == "Empty" &&
        prod.subTyp_2 != "Empty"
    );
  } else if (taxonomy == "subTyp_1") {
    getProducts = allProducts.filter(
      (prod) =>
        prod.subTyp_1 == url &&
        prod.subTyp_2 == "Empty" &&
        prod.subTyp_1 != "Empty"
    );
  } else if (taxonomy == "typ") {
    getProducts = allProducts.filter(
      (prod) =>
        prod.typ == url && prod.subTyp_1 == "Empty" && prod.typ != "Empty"
    );
  } else if (taxonomy == "dept") {
    getProducts = allProducts.filter(
      (prod) => prod.dept == url && prod.typ == "Empty" && prod.dept != "Empty"
    );
  } else if (url == "all-products") {
    getProducts = [];
    getProducts = allProducts;
  } else {
    getProducts = [];
  }
  if (Object.entries(filters).length !== 0) {
    //Load products by seleted color filters
    if (filters.color) {
      getProducts = productsBySelectedColors(filters, getProducts);
    }

    //Load products by seleted brand filters
    if (filters.brand) {
      getProducts = productsBySelectedBrands(filters, getProducts);
    }

    //Load products by seleted size filters
    if (filters.size) {
      getProducts = productsBySelectedSize(filters, getProducts);
    }

    //Load products by seleted price Ranges filters
    if (filters.priceRange) {
      getProducts = productsBySelectedPriceRanges(filters, getProducts);
    }
  } else {
  }

  if (property == "default") {
  } else {
    getProducts = SortProducts(property, getProducts, dispatch);
  }

  if (JSON.stringify(products) == JSON.stringify(getProducts)) {
  } else {
    dispatch({
      type: "ADD_PRODUCTS",
      productsItems: getProducts,
    });
  }
  return products;
};

const productsBySelectedColors = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.gener == "simple") {
        /* prods.color.map((clr) => {
          if (filters.color.includes(clr)) {
            if (selectedProducts.includes(prods)) {
            } else {
              selectedProducts.push(prods)
            }
          }
        })*/
      } else {
        prods.variants.map((vproduct) => {
          vproduct.color.map((clr) => {
            if (filters.color.includes(clr.name)) {
              if (selectedProducts.includes(prods)) {
              } else {
                selectedProducts.push(prods);
              }
            }
          });
        });
      }
    });
  } else {
    selectedProducts = [];
  }
  return selectedProducts;
};

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

const productsBySelectedSize = (filters, getProducts) => {
  let selectedProducts = [];

  if (getProducts) {
    getProducts.map((prods) => {
      if (prods.gener == "simple") {
        /* prods.color.map((clr) => {
           if (filters.color.includes(clr)) {
             if (selectedProducts.includes(prods)) {
             } else {
               selectedProducts.push(prods)
             }
           }
         })*/
      } else {
        prods.variants.map((vproduct) => {
          if (filters.size.includes(vproduct.size)) {
            if (selectedProducts.includes(prods)) {
            } else {
              selectedProducts.push(prods);
            }
          }
        });
      }
    });
  } else {
    selectedProducts = [];
  }
  return selectedProducts;
};

const productsBySelectedPriceRanges = (filters, getProducts) => {
  let selectedProducts = [];
  let lower;
  let upper;
  if (filters.priceRange == "below $50") {
    lower = 0;
    upper = 50;
  } else if (filters.priceRange == "$51-$100") {
    lower = 51;
    upper = 100;
  } else if (filters.priceRange == "$101-$150") {
    lower = 101;
    upper = 150;
  } else if (filters.priceRange == "$151-$200") {
    lower = 151;
    upper = 200;
  } else if (filters.priceRange == "$201-$250") {
    lower = 201;
    upper = 250;
  } else if (filters.priceRange == "above $250") {
    lower = 251;
    upper = 9999999999999;
  }

  if (filters.priceRange) {
    if (getProducts) {
      getProducts.map((prods) => {
        if (prods.gener == "simple") {
          if (prods.sales_price) {
            if (prods.sales_price >= lower && prods.sales_price <= upper) {
              if (selectedProducts.includes(prods)) {
              } else {
                selectedProducts.push(prods);
              }
            }
          } else {
            if (prods.regular_price >= lower && prods.regular_price <= upper) {
              if (selectedProducts.includes(prods)) {
              } else {
                selectedProducts.push(prods);
              }
            }
          }
        } else {
          prods.variants.map((vproduct) => {
            if (vproduct.sales_price) {
              if (
                vproduct.sales_price >= lower &&
                vproduct.sales_price <= upper
              ) {
                if (selectedProducts.includes(prods)) {
                } else {
                  selectedProducts.push(prods);
                }
              }
            } else {
              if (
                vproduct.regular_price >= lower &&
                vproduct.regular_price <= upper
              ) {
                if (selectedProducts.includes(prods)) {
                } else {
                  selectedProducts.push(prods);
                }
              }
            }
          });
        }
      });
    } else {
      selectedProducts = [];
    }
  }
  return selectedProducts;
};

export const getCategoryTitle = (props) => {
  let allproducts = "all-products";
  console.log(props);
  let categoryHeading = "";
  if (props.filters.subTyp_3) {
    categoryHeading = props.filters.subTyp_3;
  } else if (props.filters.subTyp_2) {
    categoryHeading = props.filters.subTyp_2;
  } else if (props.filters.subTyp_1) {
    categoryHeading = props.filters.subTyp_1;
  } else if (props.filters.typ) {
    categoryHeading = props.filters.typ;
  } else if (props.filters.dept) {
    categoryHeading = props.filters.dept;
  } else if (props.filters.brand) {
    categoryHeading = props.filters.brand;
  } else if (props.filters[allproducts]) {
    categoryHeading = "All Products";
  } else {
  }

  return categoryHeading;
};

export const pagination = (products, productsPerPage, activePage) => {
  let pagination = {};
  // Logic for displaying current products
  const indexOfLastProduct = activePage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentproducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  pagination.currentproducts = currentproducts;
  return pagination;
};

export const handlePageChange = (setCurrentPage, e) => {
  setCurrentPage(e);
};

export const handleChangePerPage = (setPerpageProductscount, e) => {
  let value = e.target.value;
  setPerpageProductscount(value);
};

export const getCategoryBreadCrumbs = (props) => {
  let breadcrumbs = [];
  let breadcrumbsContent = [];

  if (props.urlData.taxonomy == "dept") {
    breadcrumbs.push({
      item: props.urlData.category,
      url: props.urlData.url,
      taxonomy: "dept",
      redirectUrl: "dept_Url",
    });
  } else if (props.urlData.taxonomy == "typ") {
    let dept = "";
    let dept_Url = "";
    Data.taxonomy.map((categories) => {
      if (
        categories.typ == props.urlData.category &&
        categories.url == props.urlData.url &&
        categories.subTyp_1 == "Empty"
      ) {
        dept = categories.dept;

        Data.taxonomy.map((cat) => {
          if (cat.dept == dept && cat.typ == "Empty") {
            dept_Url = cat.url;
          }
        });
      }
    });

    breadcrumbs.push(
      {
        item: dept,
        url: dept_Url,
        taxonomy: "dept",
        redirectUrl: "dept_Url",
      },
      {
        item: props.urlData.category,
        url: props.urlData.url,
        taxonomy: "typ",
        redirectUrl: "typ_Url",
      }
    );
  } else if (props.urlData.taxonomy == "subTyp_1") {
    let dept = "";
    let dept_Url = "";

    let typ = "";
    let typ_Url = "";

    Data.taxonomy.map((categories) => {
      if (
        categories.subTyp_1 == props.urlData.category &&
        categories.url == props.urlData.url &&
        categories.subTyp_2 == "Empty"
      ) {
        dept = categories.dept;
        typ = categories.typ;
        Data.taxonomy.map((cat) => {
          if (cat.dept == dept && cat.typ == "Empty") {
            dept_Url = cat.url;
          }
        });

        Data.taxonomy.map((cat) => {
          if (cat.dept == dept && cat.typ == typ && cat.subTyp_1 == "Empty") {
            typ_Url = cat.url;
          }
        });
      }
    });

    breadcrumbs.push(
      {
        item: dept,
        url: dept_Url,
        taxonomy: "dept",
        redirectUrl: "dept_Url",
      },
      {
        item: typ,
        url: typ_Url,
        taxonomy: "typ",
        redirectUrl: "typ_Url",
      },

      {
        item: props.urlData.category,
        url: props.urlData.url,
        taxonomy: "subTyp_1",
        redirectUrl: "subTyp_1_Url",
      }
    );
  } else if (props.urlData.url == "all-products") {
    breadcrumbs.push({
      item: "All Products",
      url: "all-products",
      taxonomy: "All Products",
      redirectUrl: "",
    });
  }

  breadcrumbsContent.push(
    <li className="breadcrumb-item">
      <Link to="/" className="text-dark text-decoration-none">
        Home
      </Link>
    </li>
  );

  let i = -1;
  for (const [key, value] of Object.entries(breadcrumbs)) {
    i++;

    if (i == breadcrumbs.length - 1) {
      breadcrumbsContent.push(
        <li className="breadcrumb-item active" aria-current="page">
          {value.item}
        </li>
      );
    } else {
      breadcrumbsContent.push(
        <li className="breadcrumb-item">
          <Link
            to=""
            className="text-dark text-decoration-none"
            onClick={(e) => {
              let dispatchedData = {};

              dispatchedData = {
                taxonomy: value.taxonomy,
                redirectUrl: value.redirectUrl,
                taxonomyValue: value.item,
                taxonomyUrl: value.url,
              };
              hC.addFilters(e, dispatchedData, props.dispatch, props.history);
            }}
          >
            {value.item}
          </Link>
        </li>
      );
    }
  }

  return breadcrumbsContent;
};
const SortProducts = (property, products, dispatch) => {
  let tempProducts = [];
  let Sorting = { value: "default", order: "ASC" };

  if (property == "name(a-z)") {
    Sorting = { value: "name", order: "ASC" };
  } else if (property == "name(z-a)") {
    Sorting = { value: "name", order: "DESC" };
  } else if (property == "featuredASC") {
    Sorting = { value: "featured", order: "ASC" };
  } else if (property == "price-high-to-low") {
    Sorting = { value: "regular_price", order: "DESC" };
  } else if (property == "price-low-to-high") {
    Sorting = { value: "regular_price", order: "ASC" };
  } else {
    Sorting = { value: "default", order: "ASC" };
  }

  tempProducts = products.sort(SortProcess(Sorting));

  return tempProducts;
};
const SortProcess = (sorting) => {
  let property = "default";
  let order = "ASC";
  property = sorting.value;
  order = sorting.order;

  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    if (order == "ASC") {
      var result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    } else {
      var result =
        a[property] > b[property] ? -1 : a[property] < b[property] ? 1 : 0;
    }
    return result * sortOrder;
  };
};

export const getUrlTaxonomy = (url) => {
  let categoryData = {};

  Data.taxonomy.map((categories) => {
    if (
      url == categories.url &&
      categories.subTyp_3 != "Empty" &&
      categories.subTyp_4 == "Empty"
    ) {
      categoryData = { taxonomy: "subTyp_3", category: categories.subTyp_3 };
    } else if (
      url == categories.url &&
      categories.subTyp_2 != "Empty" &&
      categories.subTyp_3 == "Empty"
    ) {
      categoryData = { taxonomy: "subTyp_2", category: categories.subTyp_2 };
    } else if (
      url == categories.url &&
      categories.subTyp_1 != "Empty" &&
      categories.subTyp_2 == "Empty"
    ) {
      categoryData = { taxonomy: "subTyp_1", category: categories.subTyp_1 };
    } else if (
      url == categories.url &&
      categories.typ != "Empty" &&
      categories.subTyp_1 == "Empty"
    ) {
      categoryData = { taxonomy: "typ", category: categories.typ };
    } else if (
      url == categories.url &&
      categories.dept != "Empty" &&
      categories.typ == "Empty"
    ) {
      categoryData = { taxonomy: "dept", category: categories.dept };
    } else {
    }
  });
  return categoryData;
};

export const getColorAttrOnThumbs = (colorOrImages, id) => {
  let results = {};
  let colorImages = [];
  let colorCode = [];
  let content = "";
  let product = Data.allProducts.find((prod) => prod.style_id == id);

  if (product && product.gener != "simple") {
    if (colorOrImages == "images") {
      colorImages = getThumbColorImages(product);
      results = { name: "image", data: [...colorImages] };
    } else if (colorOrImages == "color") {
      colorCode = getThumbColorcode(product);
      colorImages = getThumbColorImages(product);
      results = {
        name: "colorCode",
        data: [...colorCode],
        images: [...colorImages],
      };
    } else {
      results = {};
    }
  } else {
    results = {};
  }

  return results;
};
const getThumbColorImages = (product) => {
  let smallColorImages = [];
  let imageUrl = "";
  product.variants.map((vProduct) => {
    vProduct.color.map((color) => {
      if (color.colorSmallImage && color.colorSmallImage != "") {
        imageUrl = prodImagesDir + color.colorSmallImage;
        smallColorImages.push(imageUrl);
      }
    });
  });

  return smallColorImages;
};

const getThumbColorcode = (product) => {
  let colorCode = [];

  product.variants.map((vProduct) => {
    vProduct.color.map((color) => {
      colorCode.push(color.colorCode);
    });
  });

  return colorCode;
};
