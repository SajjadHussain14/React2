import React, { useState, useEffect } from "react";
import { useStateValue } from "../StateProvider";
import { reactLocalStorage } from "reactjs-localstorage";
import "bootstrap/dist/css/bootstrap.min.css";
import * as snV from "./sideNav/sideNavViews";
import * as cC from "./category/categoryController";
import * as cV from "./category/categoryViews";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router";
import { GetMetaTags } from "./Utilities";

export default function Category() {
  let url = "";
  const params = useParams();
  if (params) {
    url = params.url;
  }

  let urlData = cC.getUrlTaxonomy(url);
  urlData.url = url;

  let filters = {};
  let history = useHistory();
  const [{ basket, sFilters, products, sortby }, dispatch] = useStateValue();

  if (Object.keys(sFilters).length != 0) {
    reactLocalStorage.setObject("storedFilters", sFilters);
  }

  filters = reactLocalStorage.getObject("storedFilters");
  filters[urlData.taxonomy] = urlData.category;
  let temProducts = [];
  let property = sortby;

  temProducts = cC.getProducts(
    filters,
    products,
    dispatch,
    property,
    url,
    urlData.taxonomy
  );
  let props = { filters: {} };
  props.filters = filters;
  let categoryTile = cC.getCategoryTitle(props);

  // will update data later when connected to DB
  let metas = {
    title: categoryTile,
    description: categoryTile,
    keywords: categoryTile,
    image: "",
    url: window.location.href,
    imageSrc: "",
  };

  return (
    <React.Fragment>
      <section id="contentHolder">
        <GetMetaTags {...metas} />
        <div id="category">
          <div className="container">
            <div className="row">
              <BreadCrumbDisplay
                filters={filters}
                dispatch={dispatch}
                history={history}
                urlData={urlData}
              />
              {
                <SideBarDisplay
                  filters={filters}
                  products={temProducts}
                  url={url}
                />
              }
              <CategoryProductArea
                dispatch={dispatch}
                filters={filters}
                products={temProducts}
                property={property}
              />
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}
const BreadCrumbDisplay = (props) => {
  let breadcrumbs = cC.getCategoryBreadCrumbs(props);
  return cV.BreadCrumbDisplay(breadcrumbs);
};
const SideBarDisplay = (props) => {
  let sideNavContent = snV.SideBarViews(props);
  return sideNavContent;
};
const CategoryProductArea = (props) => {
  let products = [];
  products = props.products;
  //HOOK FOR PERPAGE PRODUCTS
  const [perpageProductscount, setPerpageProductscount] = useState(9);

  //HOOK FOR ACTIVE PAGE
  const [activePage, setCurrentPage] = useState(1);

  //GET CATEGORY TITLE
  let categoryTile = cC.getCategoryTitle(props);

  //PRODUCTS PER PAGE
  let productsPerPage = perpageProductscount;

  //GET PRODUCTS ACCORDING TO PAGINATION
  let currentproducts = cC.pagination(products, productsPerPage, activePage)
    .currentproducts;

  return (
    <>
      {cV.categotyProductsView(
        categoryTile,
        currentproducts,
        products,
        cC,
        setPerpageProductscount,
        props.dispatch,
        props.property
      )}
      {cV.paginationView(
        activePage,
        productsPerPage,
        products,
        cC,
        setCurrentPage
      )}
    </>
  );
};
