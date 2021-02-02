import React from "react";
import * as hC from "./headerController";
import { useStateValue } from "../../StateProvider";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import * as cc from "../cart/cartController";

export const GetdropCartViews = () => {
  let cart = [];
  cart = cc.GetCart();
  let cartSubTotal = 0;
  cartSubTotal = cc.GetCartSubTotal(cart);
  let itemStatus = "";

  return (
    <>
      <section class="containers">
        <div
          id="cartdropdown"
          class="shopping-cart"
          style={{ display: "none" }}
        >
          <div class="shopping-cart-header">
            <i class="fa fa-shopping-cart cart-icon"></i>
            <span class="badge">{cart.length}</span>
            <div class="shopping-cart-total">
              <span class="lighter-text">Total:</span>
              <span class="main-color-text">${cartSubTotal}</span>
            </div>
          </div>

          <ul class="shopping-cart-items">
            {cart.map((item) => {
              return (
                <li class="clearfix">
                  <img width="90" src={item.cartImage} alt="item1" />
                  <span class="item-name">{item.name}</span>
                  <span class="item-price">
                    ${item.salesPrice ? item.salesPrice : item.regularPrice}
                  </span>
                  <span class="item-quantity">Quantity: {item.quantity}</span>
                </li>
              );
            })}
          </ul>

          <Link to="/cart" class="button">
            View Cart
          </Link>

          <a href="#" class="button">
            Checkout
          </a>
        </div>
      </section>
    </>
  );
};

export const GetHeaderTopViews = (props) => {
  return (
    <div id="top" className="w-100 mx-auto">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12 one  justify-content-center align-self-center text-right text-light text-capitalize pt-2">
            <p>{props.topMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const GetHeaderMiddleViews = (props) => {
  let cart = cc.GetCart();
  let history = useHistory();

  return (
    <>
      <div id="middle">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12 col-12 logo justify-content-start align-self-center">
              <Link to="/">
                <img
                  src={`/${props.middle.sitelogo}`}
                  alt="site logo"
                  className="img-fluid w-100"
                />
              </Link>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-8 col-7 search justify-content-center align-self-center text-center position-relative">
              <form className="position-relative">
                <input
                  type="text"
                  placeholder="search"
                  className="w-100 border-0 outline-none outine-0 text-capitalize py-2 pl-2"
                />
                <button className="bg-transparent p-0 outline-0 outline-none border-0 position-absolute top-50 right-0 pr-3">
                  <i className="fas fa-search text-light"></i>
                </button>
              </form>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-4 col-5 profile justify-content-end align-self-center text-right text-light">
              <Link
                to="/"
                className="text-light text-decoration-none text-capitalize"
              >
                <i className="fas fa-user pr-2"></i>
                log in
              </Link>
              <a
                href="#"
                onClick={() => {
                  dropDownAction();
                }}
                className="text-light text-decoration-none text-capitalize"
                id="header-cart"
                data-toggle="collapse"
                data-target="#cartDrpDown"
                aria-controls="cartDrpDown"
                aria-expanded="false"
              >
                <i className="fas fa-shopping-cart pr-2"></i>cart
                <span id="basket-total-top" className="text-danger">
                  ({cart.length})
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const GetHeaderNavViews = () => {
  const [{ basket, sFilters }, dispatch] = useStateValue();
  let history = useHistory();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark static-top">
        <div className="container p-0">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto d-flex w-100 justify-content-between">
              {hC.getTaxonomy().map((deptCat) => {
                return (
                  <li key={deptCat.id} className="nav-item active">
                    <i className="fas fa-angle-down down d-lg-none d-md-block d-sm-block"></i>
                    <Link
                      className="nav-link text-uppercase text-light "
                      to=""
                      data-url={deptCat.url}
                      type="button"
                      id="dropdownMenu2"
                      aria-expanded="false"
                      onClick={(e) => {
                        let dispatchedData = {};
                        dispatchedData = {
                          taxonomy: "dept",
                          redirectUrl: "dept_Url",
                          taxonomyValue: deptCat.category,
                          taxonomyUrl: deptCat.url,
                        };
                        hC.addFilters(e, dispatchedData, dispatch, history);
                      }}
                    >
                      {deptCat.category}
                    </Link>
                    {hC.getTaxonomy(deptCat.category).length > 0 && (
                      <div
                        className="dropdown-menu position-absolute w-100 rounded-0"
                        aria-labelledby="dropdownMenu2"
                      >
                        <div className="container">
                          <div className="row">
                            {hC.getTaxonomy(deptCat.category).map((typCat) => {
                              return (
                                <div
                                  key={typCat.id}
                                  className="col-lg-3 col-md-12 col-12 first m-2"
                                >
                                  <Link
                                    key={typCat.id}
                                    to=""
                                    data-url={typCat.url}
                                    data-taxonomy={typCat.taxonomy}
                                    className="title d-block text-dark text-decoration-none text-capitalize  mb-1 border-bottom border-dark"
                                    onClick={(e) => {
                                      let dispatchedData = {};

                                      dispatchedData = {
                                        taxonomy: "typ",
                                        redirectUrl: "typ_Url",
                                        taxonomyValue: typCat.category,
                                        taxonomyUrl: typCat.url,
                                      };

                                      hC.addFilters(
                                        e,
                                        dispatchedData,
                                        dispatch,
                                        history
                                      );
                                    }}
                                  >
                                    {typCat.category}
                                  </Link>
                                  <i
                                    key={typCat.id}
                                    className="fas fa-angle-down d-none"
                                    data-toggle="collapse"
                                    data-target="#accordone1"
                                    aria-expanded="false"
                                  ></i>
                                  <div
                                    key={typCat.id}
                                    id="accordone1"
                                    className="collapse show"
                                  >
                                    {hC
                                      .getTaxonomy(
                                        deptCat.category,
                                        typCat.category
                                      )
                                      .map((subTyp_1cat) => {
                                        return (
                                          <Link
                                            key={typCat.id}
                                            to=""
                                            data-url={subTyp_1cat.url}
                                            data-taxonomy={subTyp_1cat.taxonomy}
                                            className="d-block text-dark text-decoration-none text-capitalize mb-1"
                                            onClick={(e) => {
                                              let dispatchedData = {};

                                              dispatchedData = {
                                                taxonomy: "subTyp_1",
                                                redirectUrl: "subTyp_1_Url",
                                                taxonomyValue:
                                                  subTyp_1cat.category,
                                                taxonomyUrl: subTyp_1cat.url,
                                              };

                                              hC.addFilters(
                                                e,
                                                dispatchedData,
                                                dispatch,
                                                history
                                              );
                                            }}
                                          >
                                            {subTyp_1cat.category}
                                          </Link>
                                        );
                                      })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
function dropDownAction() {
  var x = document.getElementById("cartdropdown");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
