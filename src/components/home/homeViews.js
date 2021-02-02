import { prodImagesDir } from "../../settings";
import { Link } from "react-router-dom";
import * as pV from "../product/productViews";

export const displayIndexSlider = () => {
  return (
    <>
      <section id="indexSlider" className="mb-4 index-slider-animation">
        <div className="container-fluid p-0">
          <div className="row m-0">
            <div
              id="carouselExampleIndicators"
              className="carousel slide p-0"
              data-ride="carousel"
            >
              <ol className="carousel-indicators text-center w-25 h-0 mx-auto">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className=""
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                  className=""
                ></li>
              </ol>
              <div id="sliderpictures" className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="img-fluid"
                    src="/images/hp_main_banner_1.jpg"
                    alt="main banner image"
                  />
                  <p className="carousel-caption text top-0 d-flex flex-column justify-content-center align-items-center">
                    <strong className="text-uppercase d-block  ">
                      <span className="text-danger">banner</span>text
                    </strong>
                    <b className="text-capitalize d-block mb-3 ">goes here</b>
                    <a
                      href="##"
                      className="text-capitalize text-decoration-none bg-danger mt-4 text-light rounded-3"
                    >
                      shop now
                    </a>
                  </p>
                </div>
                <div className="carousel-item">
                  <img
                    className="img-fluid"
                    src="/images/hp_main_banner_2.jpg"
                    alt="main banner image"
                  />
                  <p className="carousel-caption text top-0 d-flex flex-column justify-content-center align-items-center">
                    <strong className="text-uppercase d-block  ">
                      <span className="text-danger">banner</span>text
                    </strong>
                    <b className="text-capitalize d-block mb-3 ">goes here</b>
                    <a
                      href="##"
                      className="text-capitalize text-decoration-none bg-danger mt-4 text-light rounded-3"
                    >
                      shop now
                    </a>
                  </p>
                </div>
                <div className="carousel-item ">
                  <img
                    className="img-fluid"
                    src="/images/hp_main_banner_3.jpg"
                    alt="main banner image"
                  />
                  <p className="carousel-caption text top-0 d-flex flex-column justify-content-center align-items-center">
                    <strong className="text-uppercase d-block  ">
                      <span className="text-danger">banner</span>text
                    </strong>
                    <b className="text-capitalize d-block mb-3 ">goes here</b>
                    <a
                      href="##"
                      className="text-capitalize text-decoration-none bg-danger mt-4 text-light rounded-3"
                    >
                      shop now
                    </a>
                  </p>
                </div>
              </div>

              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span aria-hidden="true">
                  <i className="fas fa-angle-left display-2"></i>
                </span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span aria-hidden="true">
                  <i className="fas fa-angle-right display-2"></i>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const displayMiniBanners = () => {
  return (
    <>
      <section id="threebanner" class="mb-3 module">
        <div class="container">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 half mb-3 position-relative three-banner-left-animation module">
              <img
                src="images/hp_mini_banner1.jpg"
                alt="mini banner image"
                class="img-fluid"
              />
              <div class="overlay position-absolute left-0 right-0 top-0 text bottom-0 h-100">
                <p>
                  <strong class="text-left  text-light d-block ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Men
                    </a>
                  </strong>
                  <span class="text-left text-light d-block float-left  ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      FootWear
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Apparel
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Jackets
                    </a>
                  </span>
                  <em class="text-right fst-normal float-right">
                    <a
                      href="#"
                      class="text-capitalize text-center text-decoration-none bg-danger mt-4 mx-auto  text-light rounded-3"
                    >
                      shop now
                    </a>
                  </em>
                </p>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 half mb-3 position-relative three-banner-right-animation module">
              <img
                src="images/hp_mini_banner2.jpg"
                alt="mini banner image"
                class="img-fluid"
              />
              <div class="overlay position-absolute left-0 right-0 top-0 text bottom-0 h-100">
                <p>
                  <strong class="text-left  text-light d-block ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Women
                    </a>
                  </strong>
                  <span class="text-left text-light d-block float-left  ">
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Footwear
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Apparel
                    </a>
                    /
                    <a
                      href="#"
                      class="text-decoration-none text-uppercase text-light"
                    >
                      Jackets
                    </a>
                  </span>
                  <em class="text-right fst-normal float-right">
                    <a
                      href="#"
                      class="text-capitalize text-center text-decoration-none bg-danger mt-4 mx-auto  text-light rounded-3"
                    >
                      shop now
                    </a>
                  </em>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      );
    </>
  );
};

export const displayFeaturedProducts = (
  products,
  basket,
  dispatch,
  history
) => {
  console.log(products);
  return (
    <>
      <section id="productslider" class="mb-4 module">
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase headings-animation">
              <p>featured items</p>
            </div>

            <div class="slider featured-items-animation" id="slider">
              <div class="outer">
                <ul class="slide list-unstyled p-0" id="slide">
                  {products.map((prod) => {
                    return (
                      <>
                        <li>
                          <div class="productListing text-center p-1">
                            <Link
                              to={"/product/" + prod.style_id + "/" + prod.url}
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
                              <span class="pricing">
                                <strong class="listPrice  text-dark d-block mb-1">
                                  $
                                  {prod.sales_price
                                    ? prod.sales_price
                                    : prod.regular_price}
                                </strong>
                              </span>
                              <div class="producthover">
                                <span class="name text-dark d-block mb-1">
                                  {prod.name}
                                </span>
                                {prod.gener == "simple" ? (
                                  <button
                                    onClick={(e) => {
                                      pV.simpleAddToCart(
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
                                  <Link
                                    to={
                                      "/product/" +
                                      prod.style_id +
                                      "/" +
                                      prod.url
                                    }
                                    class="bg-dark text-light border-1 p-2 fw-bold border-dark  w-75 mx-auto d-block"
                                  >
                                    View Options
                                  </Link>
                                )}
                              </div>
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

export const getCompanyIntro = () => {
  return (
    <>
      <section id="promo-banner" class="py-5 mb-4 module bg-light">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-start align-content-center flex-column product-page-left-main">
              <p class="text-dark text-capitalize fs-4">New Arrivals!</p>
              <strong class="d-block text-secondary fs-5 mb-1">
                High performance Rifles
              </strong>
              <span class="d-block text-secondary fs-6 mb-1">
                These newly arrived rifles are powered with high accuracy and
                less recoil . A perfect companion for a marksman and for people
                who love to keep hitech weaponary
              </span>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12 col-12 module featured-items-animation">
              <img
                src="images/airsoft-guns-m4-carbine-m16-rifle-m4a1.png"
                class="img-fluid w-100 d-block mx-auto"
              />
            </div>
            <div class="col-lg-3 col-md-3 col-sm-12 col-12 d-flex justify-content-center align-content-center flex-column product-page-right-main">
              <p class="text-dark fs-6 mb-1">
                Click on the link below to explore more exciting options
              </p>
              <button class="bg-dark text-light border-1 p-2 fw-bold border-dark rounded">
                View Rifles
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const displayRecentlyViewed = (products, basket, dispatch, history) => {
  return (
    <>
      <section
        id="recentlyviewed"
        class="mb-4 recently-viewed-animation module"
      >
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase headings-animation">
              <p>Recently Viewed Items</p>
            </div>
            {products.map((prod) => {
              return (
                <>
                  <div class="col-lg-2 col-md-2 col-sm-4 col-6">
                    <div class="productListing text-center p-1">
                      <Link
                        to={"/product/" + prod.style_id + "/" + prod.url}
                        class="product text-decoration-none text-left"
                      >
                        <span class="image text-center mb-2 d-block">
                          <img
                            class="item"
                            src={prodImagesDir + prod.smallImage}
                          />
                        </span>
                        <span class="brand text-capitalize  text-dark d-block mb-1">
                          {prod.brand}
                        </span>
                        <span class="pricing">
                          <strong class="listPrice  text-dark d-block mb-1">
                            $
                            {prod.sales_price
                              ? prod.sales_price
                              : prod.regular_price}
                          </strong>
                        </span>
                        <div class="producthover">
                          <span class="name text-dark d-block mb-1">
                            {prod.name}
                          </span>
                          {prod.gener == "simple" ? (
                            <button
                              onClick={(e) => {
                                pV.simpleAddToCart(
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
                            <Link
                              to={"/product/" + prod.style_id + "/" + prod.url}
                              class="bg-dark text-light border-1 p-2 fw-bold border-dark  w-75 mx-auto d-block"
                            >
                              View Options
                            </Link>
                          )}
                        </div>
                      </Link>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export const getBrands = () => {
  return (
    <>
      <section id="brandslider" class="mb-5 module">
        <div class="container">
          <div class="row">
            <div class="col-12 heading text-center text-dark text-uppercase fs-1 headings-animation">
              <p>brands</p>
            </div>
            <div class="slider brands-slider" id="slider">
              <div class="outer">
                <ul class="slide list-unstyled p-0" id="slide">
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="images/hp_brand_logo.jpg"
                        alt="brand image"
                        class="img-fluid"
                      />
                    </a>
                  </li>
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
