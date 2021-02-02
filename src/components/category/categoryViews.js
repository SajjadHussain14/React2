import Pagination from "react-js-pagination";
import { comingSoonS, prodImagesDir } from "../../settings";
import { colorOrImage } from "../../settings";
import * as cC from "./categoryController";
import { Link } from "react-router-dom";

export const productsStatus = (currentproducts, products) => {
  return (
    <div className="col-lg-6 col-md-6 col-12 totalproduct text-left pb-5-lg pb-3-md pb-3">
      <p className="text-capitalize catgrey">
        {currentproducts.length} of Total {products.length} products
      </p>
    </div>
  );
};

export const productsPerpageView = (cC, setPerpageProductscount, products) => {
  return (
    <div className="col-md">
      <div className="d-flex justify-content-end align-items-center selection">
        <label for="floatingSelectGrid" className="pr-2">
          View
        </label>
        <select
          className="form-select one"
          id="floatingSelectGrid"
          aria-label="Floating label select example"
          onChange={(e) => cC.handleChangePerPage(setPerpageProductscount, e)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="9" selected>
            9
          </option>
          <option value={products.length}>All</option>
        </select>
      </div>
    </div>
  );
};

export const productsSortSection = (property, dispatch) => {
  let p = "";
  p = property;
  let slectedOption = "";
  return (
    <div className="col-md">
      <div className="d-flex justify-content-end align-items-center selection">
        <label for="" className="pr-2">
          Sort:
        </label>

        <select
          key={Math.floor(Math.random() * 99999)}
          className="form-select two"
          id="floatingSelectGrid"
          aria-label="Floating label select example"
          onChange={(e) => {
            handleChange(e, dispatch);
          }}
        >
          <option
            value="default"
            {...(property == "default"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Default
          </option>

          <option
            value="name(a-z)"
            {...(property == "name(a-z)"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Name(A-Z)
          </option>

          <option
            value="name(z-a)"
            {...(property == "name(z-a)"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Name(Z-A)
          </option>

          <option
            value="featuredASC"
            {...(property == "featuredASC"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Featured
          </option>
          <option
            value="price-high-to-low"
            {...(property == "price-high-to-low"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Price(High-Low)
          </option>
          <option
            value="price-low-to-high"
            {...(property == "price-low-to-high"
              ? (slectedOption = "Selected")
              : (slectedOption = ""))}
            selected={slectedOption}
          >
            Price(Low-High)
          </option>
        </select>
      </div>
    </div>
  );
};

const handleChange = (e, dispatch) => {
  e.preventDefault();

  let sortingText = e.target.value;

  dispatch({
    type: "SORT_BY",
    sortText: sortingText,
  });
};

export const categoryTitleSection = (categoryTile) => {
  return (
    <div className="col-12 catheading pb-2">
      <h1 className="text-uppercase border-bottom border-2 pb-5">
        {categoryTile}
      </h1>
    </div>
  );
};

export const productThumbnail = (currentproducts) => {
  let result = {};
  let cumtomIndex = -1;
  return (
    <>
      {currentproducts.map((product, index) => {
        return (
          <div className="col-ag-3 col-md-4 col-sm-6 col-6 mb-4">
            <div className="productListing text-center">
              <Link
                style={{ zIndex: -1, position: "relative" }}
                to={`/product/${product.style_id}/${product.url}`}
                className="product text-decoration-none text-left"
              >
                <span className="image text-left mb-2 d-block">
                  <img
                    id={product.style_id}
                    src={prodImagesDir + product.smallImage}
                    alt="product image"
                    className={product.name}
                    width={183}
                  />
                </span>

                <span className="brand">{product.brand}</span>
                <span className="name">{product.name} </span>
                <span className="pricing">
                  <strong className="itemPrice">
                    Price: ${product.regular_price}
                  </strong>
                  {product.sales_price > 0 && (
                    <strong className="salePrice">
                      Price: ${product.sales_price}
                    </strong>
                  )}
                </span>
              </Link>
            </div>
            <div className="d-flex justify-content-center">
              {cC.getColorAttrOnThumbs(colorOrImage, product.style_id).name ==
              "image"
                ? cC
                    .getColorAttrOnThumbs(colorOrImage, product.style_id)
                    .data.map((colorImage) => {
                      return (
                        <span className="border-1 border-dark rounded p-1  d-block color-span">
                          <img
                            src={colorImage}
                            alt="color Image"
                            onClick={(e) => {
                              changeImage(e, product.style_id);
                            }}
                          />
                        </span>
                      );
                    })
                : cC.getColorAttrOnThumbs(colorOrImage, product.style_id)
                    .name == "colorCode"
                ? cC
                    .getColorAttrOnThumbs(colorOrImage, product.style_id)
                    .data.map((colorCode) => {
                      cumtomIndex++;
                      return (
                        <span className="border-1 border-dark rounded p-1  d-block color-span">
                          <button
                            style={{
                              backgroundColor: colorCode,
                              color: colorCode,

                              fontSize: 0 + "px",
                            }}
                            value={
                              cC.getColorAttrOnThumbs(
                                colorOrImage,
                                product.style_id
                              ).images[cumtomIndex]
                            }
                            onClick={(e) => {
                              changeColorImage(e, product.style_id);
                            }}
                          >
                            colorCode
                          </button>
                        </span>
                      );
                    })
                : ""}
            </div>
          </div>
        );
      })}
    </>
  );
};
const changeImage = (e, ProdID) => {
  let cImage = e.target.src;
  if (cImage && cImage != "") {
    document.getElementById(ProdID).src = cImage;
  } else {
    document.getElementById(ProdID).src = prodImagesDir + comingSoonS;
  }
};

const changeColorImage = (e, ProdID) => {
  let cImage = e.target.value;
  if (cImage && cImage != "") {
    document.getElementById(ProdID).src = cImage;
  } else {
    document.getElementById(ProdID).src = prodImagesDir + comingSoonS;
  }
};
export const BreadCrumbDisplay = (breadcrumbs) => {
  return (
    <>
      <section id="BreadCrumbs" className="col-12 pt-3">
        <nav aria-label="breadcrumb" className="bg-transparent p-0">
          <ol className="breadcrumb bg-transparent p-0">
            {breadcrumbs.map((item) => {
              return item;
            })}
          </ol>
        </nav>
      </section>
    </>
  );
};

export const categotyProductsView = (
  categoryTile,
  currentproducts,
  products,
  cC,
  setPerpageProductscount,
  dispatch,
  property
) => {
  return (
    <>
      <section id="CategoryProducts" className="col-lg-10 col-md-8 col-12">
        <div className="row">
          {categoryTitleSection(categoryTile)}

          <div className="col-12 catproductinner">
            <div className="row">
              {productsStatus(currentproducts, products)}

              <div className="col-lg-6 col-md-6 col-12 categoryselect text-right pb-5-lg pb-3-md pb-3">
                <div className="row g-2">
                  {productsPerpageView(cC, setPerpageProductscount, products)}

                  {productsSortSection(property, dispatch)}
                </div>
              </div>

              {productThumbnail(currentproducts)}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const paginationView = (
  activePage,
  productsPerPage,
  products,
  cC,
  setCurrentPage
) => {
  return (
    <>
      <section id="Pagination" className="col-12 py-4">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={productsPerPage}
          totalItemsCount={products.length}
          pageRangeDisplayed={4}
          onChange={(e) => {
            cC.handlePageChange(setCurrentPage, e);
          }}
        />
      </section>
    </>
  );
};
