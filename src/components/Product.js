import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { useHistory } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { useParams } from "react-router";
import * as pC from "./product/productController";
import * as pV from "./product/productViews";
import * as mcss from "../css/magiczoompluscss.css";
import MagicZoom from "../js/magiczoomplusReactJs";
import { prodImagesDir } from "../settings";
import { GetMetaTags } from "./Utilities";

function Product() {
  let cart = [];

  const [{ basket }, dispatch] = useStateValue();
  let sessions = [];
  sessions = reactLocalStorage.getObject("cartSessions");

  const params = useParams();
  let product = {};
  product = pC.getProduct(params.id);
  useEffect(() => {
    MagicZoom.refresh();
  }, [params.id]);

  pC.setRecentlyViewed(product, reactLocalStorage);

  let metas = {
    title: product.name,
    description: product.description,
    keywords: product.name,
    image: prodImagesDir + product.smallImage,
    url: window.location.href,
    imageSrc: prodImagesDir + product.smallImage,
  };

  return (
    <>
      <GetMetaTags {...metas} />
      <section id="contentHolder">
        <div id="productpage">
          <div className="container">
            <div className="row">
              <BreadCrumbDisplay product={product} dispatch={dispatch} />
              <ProductImage product={product} />
              <ProductInfo product={product} />
              {/*<ProductNewsLetters product={product} />*/}
              <ProductDetails product={product} />
              <AdditionalProducts product={product} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
const BreadCrumbDisplay = (props) => {
  let history = useHistory();

  let breadcrumbs;
  breadcrumbs = pC.getProductBreadCrumbs(
    props.product,
    history,
    props.dispatch
  );
  return pV.BreadCrumbDisplay(breadcrumbs);
};

const ProductImage = (props) => {
  let prodImageInfo = pC.getProductImage(props);
  return pV.displayProductImage(prodImageInfo);
};

const ProductInfo = (props) => {
  let prodInfo = pC.getProductInfo(props);
  return pV.displayProductInfo(prodInfo);
};

const ProductNewsLetters = (props) => {
  let prodNewsLetters = pC.getProductNewsLetters(props);
  return pV.displayProductNewsLetters(prodNewsLetters);
};

const ProductDetails = (props) => {
  return pV.displayProductDetails(props);
};

const AdditionalProducts = (props) => {
  const [{ basket }, dispatch] = useStateValue();
  let history = useHistory();
  let additionalProducts = pC.getAdditionalProducts(props);
  return pV.displayAdditionalProducts(
    additionalProducts,
    basket,
    dispatch,
    history
  );
};

export default Product;
