import React, { useState, useEffect } from "react";
import { useStateValue } from "../../StateProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import { useHistory } from "react-router-dom";
import * as pC from "../product/productController";
//import { productSizesStyle } from "../../settings";
//import { productColorsStyle } from "../../settings";
import { allowOutOfStock } from "../../settings";
import { prodImagesDir } from "../../settings";
import { defaultImage } from "../../settings";
import { comingSoonS } from "../../settings";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

let productSizesStyle = "select";
let productColorsStyle = "select";

let selectedProduct = {
  style_id: 0,
  name: "",
  brand: "",
  image: "",
  colorImage: "",
  cartImage: defaultImage,
  regularPrice: 0,
  salesPrice: 0,
  quantity: 0,
  total: 0,
  selectedSize: "",
  selectedColor: "",
  stock: 0,
  stockMessage: "Out of Stock",
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

export const displayProductImage = (imageInfo) => {
  return (
    <>
      <section id="productmainimage" className="col-lg-7 col-md-6 col-12">
        <Link
          id="zoomer"
          to={imageInfo.image}
          className="MagicZoom"
          data-options="rightClick: true; expand: off;"
        >
          <img
            id="zoom-image"
            itemprop="image"
            className="w-100"
            src={imageInfo.image}
            alt=" Mask"
          />
        </Link>

        {/*
          <img
            src={imageInfo.image}
            className='img-fluid w-100'
            alt={imageInfo.altText}
          />
        */}

        <article
          id="alt-images"
          className="altimages d-flex justify-content-center my-2"
        ></article>
      </section>
    </>
  );
};

export const displayProductInfo = (props) => {
  return (
    <>
      <section id="productinfo" className="col-lg-5 col-md-6 col-12">
        <div className="infoinner">
          {productMainInfo(props)}

          {productPrice(props)}
          {productQuantity(props)}

          {props.gener == "variable" ? productAttributes(props) : ""}

          {ProductAddtoButtons(props)}
          {AddToCartPopUp(props)}
          {productShareButtons(props)}
        </div>
      </section>
    </>
  );
};

const productMainInfo = (product) => {
  let stockStatus = checkStockAvailability(product);
  return (
    <>
      <article className="productdesc">
        <h1 className="pname">{product.name}</h1>
        <p className="pcode">
          <span>product code:</span>
          <span>{product.style_id}</span>
        </p>
        <p className="pbrand">
          <span>brand:</span>
          <span>{product.brand}</span>
        </p>
        <p className="pstatus">
          <span>availability:</span>
          {product.stock > 0 ? (
            <i i className="fas fa-check" />
          ) : (
            <i i className="fas fa-times" />
          )}

          <span id="stock-status">{stockStatus.availability}</span>
        </p>
      </article>
    </>
  );
};

const productPrice = (product) => {
  let prodPrice = pC.productPricing(product);
  return (
    <>
      <article className="pricing">
        {prodPrice.salesPrice > 0 ? (
          <>
            <p id="rPrice" className="">
              <del>${prodPrice.regularPrice}</del>
            </p>
            <p id="sPrice" className="color-red">
              ${prodPrice.salesPrice}
            </p>
          </>
        ) : (
          <>
            <p id="rPrice" className="">
              ${prodPrice.regularPrice}
            </p>
            <p id="sPrice" className="color-red d-none">
              ${prodPrice.salesPrice}
            </p>
          </>
        )}
      </article>
    </>
  );
};

const productQuantity = (props) => {
  return (
    <>
      <article className="quantity">
        <label for="quantity">qty</label>
        <input
          type="number"
          id="qty"
          name="qty"
          min="1"
          defaultValue="1"
          onChange={(e) => {
            selectedProduct = pC.updateQuantity(e, selectedProduct);
          }}
        />
      </article>
    </>
  );
};

const productAttributes = (props) => {
  return (
    <>
      {getSizes(props)}
      {getColors(props)}
    </>
  );
  // CAN ADD MORE ATTRIBUTES HERE
};

const getSizes = (product) => {
  if (product.style_id && product.style_id == 1) {
    productSizesStyle = "select";
    productColorsStyle = "buttons";
  } else if (product.style_id && product.style_id == 11) {
    productSizesStyle = "buttons";
    productColorsStyle = "colors";
  } else if (product.style_id && product.style_id == 22) {
    productSizesStyle = "buttons";
    productColorsStyle = "images";
  }

  let productSizes = pC.getProductSizes(product);
  return (
    <>
      <article className="size">
        <div id="sizeButtons" className="sizebox">
          <label for="size" className="fw-bold">
            size : <span id="selected-size" className="selected-size"></span>
          </label>

          {/******START DISPLAY SIZE AS SELECT DROP DOWN******/}
          {productSizesStyle == "select" ? (
            <select
              name="choosesize"
              id="size"
              onChange={(e) => {
                selectedProduct = pC.getSelectedColors(
                  "select",
                  e,
                  product,
                  selectedProduct,
                  productColorsStyle,
                  allowOutOfStock
                );
              }}
            >
              <option value="Select a Size">Select a Size</option>
              {productSizes.map((size) => {
                return <option value={size}>{size}</option>;
              })}
            </select>
          ) : (
            ""
          )}
          {/******END DISPLAY SIZE AS SELECT DROP DOWN******/}

          {/******START DISPLAY SIZE AS BUTTONS******/}

          {productSizesStyle == "buttons"
            ? productSizes.map((size) => {
                return (
                  <>
                    <button
                      className="border-secondary p-2 bg-transparent mt-2 rounded text-secondary text-capitalize text-center w-20"
                      value={size}
                      type="button"
                      onClick={(e) => {
                        selectedProduct = pC.getSelectedColors(
                          "buttons",
                          e,
                          product,
                          selectedProduct,
                          productColorsStyle,
                          allowOutOfStock
                        );
                      }}
                    >
                      {size}
                    </button>
                  </>
                );
              })
            : ""}

          {/******END DISPLAY SIZE AS BUTTONS******/}
        </div>
      </article>
    </>
  );
};

const getColors = (product) => {
  return (
    <>
      <article className="color">
        <div className="colorbox">
          <label for="color" className="fw-bold">
            Color :<span id="selected-color" className="selected-color"></span>
          </label>
          <br />

          {/******START DISPLAY Colors AS SELECT DROP DOWN******/}
          {productColorsStyle == "select" ? (
            <select
              name="choosecolor"
              id="color"
              className="d-block border-1 border-secondary rounded"
            ></select>
          ) : (
            ""
          )}
          {/******END DISPLAY Colors AS SELECT DROP DOWN******/}

          {/******START DISPLAY Colors AS BUTTONS******/}
          {productColorsStyle == "buttons" ? <div id="colorButtons"></div> : ""}
          {/******END DISPLAY Colors AS BUTTONS******/}

          {/******START DISPLAY Colors AS Colors******/}
          {productColorsStyle == "colors" ? <div id="colorButtons"></div> : ""}
          {/******END DISPLAY Colors AS Colors******/}

          {/******START DISPLAY Colors AS IMAGES******/}
          {productColorsStyle == "images" ? <div id="colorImages"></div> : ""}
          {/******END DISPLAY Colors AS BUTTONS******/}
        </div>
      </article>
    </>
  );
};

const ProductAddtoButtons = (product) => {
  const [{ basket }, dispatch] = useStateValue();

  if (selectedProduct && selectedProduct.style_id > 0) {
    if (product.gener == "simple") {
    } else {
      product.variants.map((vProduct) => {
        vProduct.color.map((clr) => {
          if (clr.name == selectedProduct.selectedColor) {
            selectedProduct.stock = parseInt(clr.stock);
            if (selectedProduct.stock > 0) {
              selectedProduct.stockMessage = "In Stock";
            } else {
              selectedProduct.stockMessage = "Out of Stock";
            }
          }
        });
      });
    }
  } else {
    if (product.stock && product.stock > 0) {
      selectedProduct.stock = parseInt(product.stock);
      selectedProduct.stockMessage = "In Stock";
    } else {
      selectedProduct.stock = 0;
      selectedProduct.stockMessage = "Out of Stock";
    }
  }

  return (
    <>
      <article className="addtobuttons">
        <div id="sizeAlert" className="alert alert-danger d-none" role="alert">
          Select an Avaiable Size
        </div>
        <div id="colorAlert" className="alert alert-danger d-none" role="alert">
          Select an Avaiable Color
        </div>
        {product.stock > 0 ? (
          <>
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              id="AddToCart"
              className="AddToCart"
              onClick={(e) => {
                AddToCart(e, product, basket, dispatch);
              }}
            >
              add to cart
            </button>
            <button className="AddToWishlist">+ add to wishlist</button>
          </>
        ) : allowOutOfStock == "yes" ? (
          <>
            <button
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              id="AddToCart"
              className="AddToCart"
              onClick={(e) => {
                AddToCart(e, product, basket, dispatch);
              }}
            >
              add to cart
            </button>
            <button className="AddToWishlist">+ add to wishlist</button>
          </>
        ) : (
          <>
            <button
              id="AddToCart"
              class="AddToCart"
              onClick={(e) => {
                AddToCart(e, product, basket, dispatch);
              }}
            >
              Out of Stock
            </button>
          </>
        )}
      </article>
    </>
  );
};
let newsBasket = [];
export const AddToCart = (e, product, basket, dispatch) => {
  e.preventDefault();
  let cart = [];
  let itemIndex = -1;

  selectedProduct.quantity = parseInt(document.getElementById("qty").value, 10);

  if (selectedProduct.stock && selectedProduct.stock > 0) {
    selectedProduct.stockMessage = "In Stock";
  } else {
    selectedProduct.stockMessage = "Out of Stock";
  }

  if (
    selectedProduct.quantity &&
    selectedProduct.quantity != "" &&
    parseInt(selectedProduct.quantity, 10)
  ) {
  } else {
    alert("Please select a quantity in Numbers");
    return;
  }

  if (allowOutOfStock == "yes" || selectedProduct.stock > 0) {
    selectedProduct.image = pC.getProductSmallImage(product);

    selectedProduct.style_id = product.style_id;
    selectedProduct.name = product.name;

    // selectedProduct.stock = product.stock;
    selectedProduct.brand = product.brand;
    selectedProduct.regularPrice = product.regular_price;
    selectedProduct.salesPrice = product.sales_price;

    if (selectedProduct.colorImage && selectedProduct.colorImage != "") {
      if (selectedProduct.colorImage.includes(prodImagesDir)) {
        selectedProduct.colorImage = selectedProduct.colorImage;
      } else {
        selectedProduct.colorImage = prodImagesDir + selectedProduct.colorImage;
      }

      selectedProduct.cartImage = selectedProduct.colorImage;
    } else if (selectedProduct.image && selectedProduct.image != "") {
      selectedProduct.image = selectedProduct.image;
      selectedProduct.cartImage = selectedProduct.image;
    } else {
      selectedProduct.cartImage = prodImagesDir + selectedProduct.cartImage;
    }

    let price = 0;
    if (selectedProduct.salesPrice && selectedProduct.salesPrice > 0) {
      price = selectedProduct.salesPrice;
    } else {
      price = selectedProduct.regularPrice;
    }

    selectedProduct.total = price * selectedProduct.quantity;

    if (product.gener == "simple") {
      // START ADD SIMPLE PRODUCT IN THE CART

      let sessions = [];
      let cart = [];
      sessions = reactLocalStorage.getObject("cartSessions");
      cart = reactLocalStorage.getObject("cartSessions");

      let itemMatched = false;
      if (sessions.length > 0) {
        let tempCart = [];
        tempCart = [...sessions];
        let tempSeletedProduct = {};
        tempSeletedProduct = { ...selectedProduct };

        tempCart.map((item) => {
          item.quantity = 0;
          item.total = 0;

          tempSeletedProduct.quantity = 0;
          tempSeletedProduct.total = 0;

          if (JSON.stringify(item) == JSON.stringify(tempSeletedProduct)) {
            itemMatched = true;
            itemIndex = tempCart.indexOf(item);
          }
        });

        if (itemMatched == true) {
          let qty = 0;
          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }
          qty = cart[itemIndex].quantity;
          cart[itemIndex].quantity = qty + 1;
          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        } else {
          cart.push({ ...selectedProduct });
          itemIndex = cart.length - 1;

          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }

          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        }
      } else {
        cart = [];
        cart.push({ ...selectedProduct });
        itemIndex = cart.length - 1;

        let itemPrice = 0;
        if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
          itemPrice = cart[itemIndex].salesPrice;
        } else {
          itemPrice = cart[itemIndex].regularPrice;
        }

        cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
        reactLocalStorage.setObject("cartSessions", [...cart]);
        dispatch({
          type: "ADD_TO_BASKET",
          item: [...cart],
        });
      }
      updateCartPopUp(cart, itemIndex);

      // END ADD SIMPLE PRODUCT IN THE CART
    } else {
      if (
        selectedProduct.selectedSize == "" ||
        selectedProduct.selectedSize == "Select a Size"
      ) {
        document.getElementById("sizeAlert").classList.remove("d-none");
      } else {
        if (
          selectedProduct.selectedColor == "" ||
          selectedProduct.selectedColor == "Select a Color"
        ) {
          document.getElementById("colorAlert").classList.remove("d-none");
        } else {
          // START ADD VARIABLE PRODUCT IN THE CART

          let sessions = [];
          let cart = [];
          sessions = reactLocalStorage.getObject("cartSessions");
          cart = reactLocalStorage.getObject("cartSessions");

          let itemMatched = false;
          if (sessions.length > 0) {
            let tempCart = [];
            tempCart = [...sessions];
            let tempSeletedProduct = {};
            tempSeletedProduct = { ...selectedProduct };

            tempCart.map((item) => {
              item.quantity = 0;
              item.total = 0;

              tempSeletedProduct.quantity = 0;
              tempSeletedProduct.total = 0;

              if (JSON.stringify(item) == JSON.stringify(tempSeletedProduct)) {
                itemMatched = true;
                itemIndex = tempCart.indexOf(item);
              }
            });

            if (itemMatched == true) {
              let qty = 0;
              let itemPrice = 0;
              if (
                cart[itemIndex].salesPrice &&
                cart[itemIndex].salesPrice > 0
              ) {
                itemPrice = cart[itemIndex].salesPrice;
              } else {
                itemPrice = cart[itemIndex].regularPrice;
              }
              qty = cart[itemIndex].quantity;
              cart[itemIndex].quantity = qty + 1;
              cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
              reactLocalStorage.setObject("cartSessions", [...cart]);
              dispatch({
                type: "ADD_TO_BASKET",
                item: [...cart],
              });
            } else {
              cart.push({ ...selectedProduct });
              itemIndex = cart.length - 1;

              let itemPrice = 0;
              if (
                cart[itemIndex].salesPrice &&
                cart[itemIndex].salesPrice > 0
              ) {
                itemPrice = cart[itemIndex].salesPrice;
              } else {
                itemPrice = cart[itemIndex].regularPrice;
              }

              cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
              reactLocalStorage.setObject("cartSessions", [...cart]);
              dispatch({
                type: "ADD_TO_BASKET",
                item: [...cart],
              });
            }
          } else {
            cart = [];
            cart.push({ ...selectedProduct });
            itemIndex = cart.length - 1;

            let itemPrice = 0;
            if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
              itemPrice = cart[itemIndex].salesPrice;
            } else {
              itemPrice = cart[itemIndex].regularPrice;
            }

            cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
            reactLocalStorage.setObject("cartSessions", [...cart]);
            dispatch({
              type: "ADD_TO_BASKET",
              item: [...cart],
            });
          }

          updateCartPopUp(cart, itemIndex);
          document.getElementById("basket-total-top").innerHTML =
            "(" + cart.length + ")";
          // END ADD VARIABLE PRODUCT IN THE CART
        }
      }
    }
  }
};

const productShareButtons = (props) => {
  return (
    <>
      <article className="share">
        <p>share</p>
        <p>
          <Link to="" title="">
            <i className="fab fa-facebook-square"></i>
          </Link>
          <Link to="" title="">
            <i className="fab fa-twitter-square"></i>
          </Link>
          <Link to="" title="">
            <i className="fab fa-instagram"></i>
          </Link>
          <Link to="" title="">
            <i className="fab fa-pinterest-square"></i>
          </Link>
          <Link to="" title="">
            <i className="fas fa-envelope-square"></i>
          </Link>
        </p>
      </article>
    </>
  );
};

export const displayProductNewsLetters = (props) => {
  return (
    <>
      <section id="newsletters" className="col-lg-7 col-md-6 col-12">
        <aside className="px-4 py-5 text-left border">
          <p className="d-block w-100 ">Receive instant lower price quote</p>
          <form
            id="lowerpricequote"
            className="d-flex justify-content-between align-content-center text-capitalize"
          >
            <label>email:</label>
            <input className="w-50 text-dark" />
            <button className="bg-dark text-light text-uppercase text-center border-0 py-1 px-3">
              get lower price
            </button>
          </form>
        </aside>
        <aside className="px-4 py-5 text-left border">
          <p>Sign up for price alerts</p>
          <form
            id="pricealerts"
            className="d-flex justify-content-between align-content-center text-capitalize"
          >
            <label>email:</label>
            <input className="w-50 text-dark" />
            <button className="bg-dark text-light text-uppercase text-center border-0 py-1 px-3">
              sign me up
            </button>
          </form>
        </aside>
      </section>
    </>
  );
};

export const displayProductDetails = (props) => {
  return (
    <>
      <section id="descandreview" class=" col-12 mt-5 mb-3 module">
        <div class="accordion" id="accordionExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="text-uppercase accordion-button"
                type="button"
                onClick={() => {
                  collapseOne();
                }}
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                Description
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-parent="#accordionExample"
              style={{ display: "block" }}
            >
              <div class="accordion-body">{props.product.description}</div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingTwo">
              <button
                class="text-uppercase accordion-button collapsed"
                type="button"
                onClick={() => {
                  collapseTwo();
                }}
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                review
              </button>
            </h2>
            <div
              id="collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionExample"
              style={{ display: "none" }}
            >
              <div class="accordion-body">
                Reviews will go here. Coming Soon....
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const displayAdditionalProducts = (
  products,
  basket,
  dispatch,
  history
) => {
  return (
    <>
      <section id="productslider" class="mb-4 module">
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase headings-animation">
              <p>Related Products</p>
            </div>

            <div class="slider featured-items-animation" id="slider">
              <div class="outer">
                <ul class="slide list-unstyled p-0" id="slide">
                  {products.map((prod) => {
                    return (
                      <>
                        <li>
                          <div class="productListing module text-center p-1 ">
                            <Link
                              to={
                                "/magiczoomfixer/" +
                                prod.style_id +
                                "/" +
                                prod.url
                              }
                              class="product text-decoration-none text-left"
                            >
                              <span class="image text-center mb-2 d-block">
                                <img
                                  class="item"
                                  src={prodImagesDir + prod.smallImage}
                                  alt={prod.name}
                                />
                              </span>
                              <span class="brand text-capitalize  text-dark d-block mb-1">
                                {prod.brand}
                              </span>
                              <span class="name text-dark d-block mb-1">
                                {prod.name}
                              </span>
                              <span class="pricing">
                                <strong class="listPrice  text-dark d-block mb-1">
                                  $
                                  {prod.sales_price
                                    ? prod.sales_price
                                    : prod.regular_price}
                                </strong>
                              </span>
                              {/*
                              <div class="add-to-cart-button">
                                {prod.gener == "simple" ? (
                                  <button
                                    onClick={(e) => {
                                      simpleAddToCart(
                                        e,
                                        prod,
                                        basket,
                                        dispatch,
                                        history
                                      );
                                    }}
                                    class="bg-dark text-light border-1 p-2 fw-bold border-dark  w-75 mx-auto d-block"
                                  >
                                    Add To Cart
                                  </button>
                                ) : (
                                  <a
                                    href={
                                      "/product/" +
                                      prod.style_id +
                                      "/" +
                                      prod.url
                                    }
                                    class="bg-dark text-light border-1 p-2 fw-bold border-dark  w-75 mx-auto d-block"
                                  >
                                    View Options
                                  </a>
                                )}
                              </div>
                                  */}
                            </Link>
                          </div>
                        </li>
                      </>
                    );
                  })}
                </ul>
              </div>
              <button class="ctrl-btn pro-prev">&lt;</button>
              <button class="ctrl-btn pro-next">&gt;</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const checkStockAvailability = (product) => {
  let stockInfo = {};
  if (product.stock > 0) {
    stockInfo.stock = product.stock;
    stockInfo.availability = "In Stock";
  } else {
    stockInfo.stock = 0;
    stockInfo.availability = "Out of Stock";
  }

  return stockInfo;
};

const AddToCartPopUp = (product) => {
  let history = useHistory();

  let cart = [];

  let RecentCartProd = {};
  cart = reactLocalStorage.getObject("cartSessions");
  if (cart.length > 0) {
    RecentCartProd = cart[0];
  } else {
    cart = [];
  }
  let prodCount = 0;
  return (
    <>
      <div id="popup">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12"></div>
          </div>
        </div>
      </div>
      <div
        class="modal fade show"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg shadow-lg">
          <div class="modal-content">
            <div class="modal-header border-0">
              <h5
                class="modal-title text-dark fw-bolder"
                id="exampleModalLabel"
              >
                <i class="far fa-check-circle pr-3"></i>
                <span>Added to cart</span>
              </h5>
              <button
                type="button"
                class="btn-close border-1 rounded border-dark border-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="container-fluid">
                <div id="currentItem" class="row">
                  <div class="col-4">
                    <img
                      id="currentItem-img"
                      src={RecentCartProd.cartImage}
                      class="img-fluid p-image"
                      alt={RecentCartProd.name}
                    />
                  </div>
                  <div class="col-8">
                    <p
                      id="currentItem-brand"
                      class="d-block text-capitalize text-secondary fw-bold mb-1"
                    >
                      <strong>Brand: </strong> {RecentCartProd.brand}
                    </p>
                    <span
                      id="currentItem-name"
                      class="d-block text-capitalize text-secondary fw-bold"
                    >
                      <strong>Name: </strong> {RecentCartProd.name}
                    </span>

                    <span
                      id="currentItem-qty"
                      class="d-block text-capitalize text-secondary fw-bold"
                    >
                      <strong>Quantity: </strong> {RecentCartProd.quantity}
                    </span>
                  </div>
                  <div class="col-12 mt-3">
                    <h6 id="currentItem-cart-total" class="fw-bolder text-dark">
                      Cart subtotal: $168.00
                      <br />
                      <span id="currentItem-no-item" class="text-secondary">
                        (2 items)
                      </span>
                    </h6>
                  </div>
                  <div class="col-12 my-3 d-flex justify-content-between">
                    <button class="rounded bg-dark text-light py-3 text-capitalize fw-bolder w-48 border-0">
                      <a href="/cart">View Vart</a>
                    </button>
                    <button class="rounded bg-light text-dark py-3 text-capitalize fw-bolder w-48 border-1 border-dark">
                      <span>continue shopping</span>
                    </button>
                  </div>
                </div>

                <div class="row">
                  <div class="col-12 border-top border-secondary mb-3">
                    <h4 class="text-dark fw-bold pt-2">Related Products</h4>
                  </div>
                  {pC.cartRelated(product).map((prod, index) => {
                    return (
                      <>
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6">
                          <a
                            href={"/product/" + prod.style_id + "/" + prod.url}
                          >
                            <img
                              src="http://template2icumulus-com.ntc5-p2stl.ezhostingserver.com/dragndrop/images/hp_product_img_m.jpg"
                              class="img-fluid mb-1"
                            />
                            <span class="lh-sm d-block mb-1 text-secondary fw-normal">
                              {prod.brand}
                            </span>
                            <p class="lh-sm mb-2 text-capitalize text-dark fw-bold">
                              {prod.name}
                            </p>

                            <span class="lh-sm d-block fw-bold saleprice text-danger">
                              $
                              {prod.sales_price
                                ? prod.sales_price
                                : prod.regular_price}
                            </span>
                          </a>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const updateCartPopUp = (cart, itemIndex) => {
  document.getElementById("currentItem-img").innerHTML = cart[itemIndex].image;
  document.getElementById("currentItem-name").innerHTML =
    "<strong>Name: </strong>" + cart[itemIndex].name;
  document.getElementById("currentItem-brand").innerHTML =
    "<strong>Brand: </strong>" + cart[itemIndex].brand;
  document.getElementById("currentItem-qty").innerHTML =
    "<strong>Quantity: </strong>" + cart[itemIndex].quantity;
  document.getElementById("currentItem-no-item").innerHTML =
    "(" + cart.length + " Items)";
};

export const simpleAddToCart = (e, product, basket, dispatch, history) => {
  e.preventDefault();
  let cart = [];
  let itemIndex = -1;

  selectedProduct.quantity = 1;

  if (product.stock && product.stock > 0) {
    product.stockMessage = "In Stock";
  } else {
    product.stockMessage = "Out of Stock";
  }

  if (allowOutOfStock == "yes" || selectedProduct.stock > 0) {
    selectedProduct.image = pC.getProductSmallImage(product);

    selectedProduct.style_id = product.style_id;
    selectedProduct.name = product.name;

    // selectedProduct.stock = product.stock;
    selectedProduct.brand = product.brand;
    selectedProduct.regularPrice = product.regular_price;
    selectedProduct.salesPrice = product.sales_price;

    selectedProduct.cartImage = prodImagesDir + product.smallImage;

    let price = 0;
    if (selectedProduct.salesPrice && selectedProduct.salesPrice > 0) {
      price = selectedProduct.salesPrice;
    } else {
      price = selectedProduct.regularPrice;
    }

    selectedProduct.total = price * selectedProduct.quantity;

    if (product.gener == "simple") {
      // START ADD SIMPLE PRODUCT IN THE CART

      let sessions = [];
      let cart = [];
      sessions = reactLocalStorage.getObject("cartSessions");
      cart = reactLocalStorage.getObject("cartSessions");

      let itemMatched = false;
      if (sessions.length > 0) {
        let tempCart = [];
        tempCart = [...sessions];
        let tempSeletedProduct = {};
        tempSeletedProduct = { ...selectedProduct };

        tempCart.map((item) => {
          item.quantity = 0;
          item.total = 0;

          tempSeletedProduct.quantity = 0;
          tempSeletedProduct.total = 0;

          if (JSON.stringify(item) == JSON.stringify(tempSeletedProduct)) {
            itemMatched = true;
            itemIndex = tempCart.indexOf(item);
          }
        });

        if (itemMatched == true) {
          let qty = 0;
          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }
          qty = cart[itemIndex].quantity;
          cart[itemIndex].quantity = qty + 1;
          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        } else {
          cart.push({ ...selectedProduct });
          itemIndex = cart.length - 1;

          let itemPrice = 0;
          if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
            itemPrice = cart[itemIndex].salesPrice;
          } else {
            itemPrice = cart[itemIndex].regularPrice;
          }

          cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
          reactLocalStorage.setObject("cartSessions", [...cart]);
          dispatch({
            type: "ADD_TO_BASKET",
            item: [...cart],
          });
        }
      } else {
        cart = [];
        cart.push({ ...selectedProduct });
        itemIndex = cart.length - 1;

        let itemPrice = 0;
        if (cart[itemIndex].salesPrice && cart[itemIndex].salesPrice > 0) {
          itemPrice = cart[itemIndex].salesPrice;
        } else {
          itemPrice = cart[itemIndex].regularPrice;
        }

        cart[itemIndex].total = cart[itemIndex].quantity * itemPrice;
        reactLocalStorage.setObject("cartSessions", [...cart]);
        dispatch({
          type: "ADD_TO_BASKET",
          item: [...cart],
        });
      }
      document.getElementById("basket-total-top").innerHTML =
        "(" + cart.length + ")";
      document.getElementById("cartdropdown").style.display = "block";
      var top = document.getElementById("cartdropdown").offsetTop;
      window.scrollTo(0, top);
      history.push("/");

      // END ADD SIMPLE PRODUCT IN THE CART
    }
  } else {
    alert("Zero Stock Availabale");
  }
};

function collapseOne() {
  const x = document.getElementById("collapseOne");
  if (x.style.display == "none") {
    x.style.display = "block";
    document.getElementById("collapseTwo").style.display = "none";
  } else {
    x.style.display = "none";
    document.getElementById("collapseTwo").style.display = "block";
  }
}

function collapseTwo() {
  const x = document.getElementById("collapseTwo");
  if (x.style.display == "none") {
    x.style.display = "block";
    document.getElementById("collapseOne").style.display = "none";
  } else {
    x.style.display = "none";
    document.getElementById("collapseOne").style.display = "block";
  }
}
