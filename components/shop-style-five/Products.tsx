import React, { useState } from "react";
import Link from "next/link";
import QuickView from "../Modal/QuickView";
import dynamic from "next/dynamic";
import AddToCart from "../Shared/AddToCart";
import { useEffect } from "react";
const OwlCarousel = dynamic(import("react-owl-carousel3"));
import { Products as ProductsPros } from "../../store/ducks/products/types";
import { connect } from "react-redux";

const options = {
  loop: true,
  nav: false,
  dots: true,
  margin: 30,
  smartSpeed: 750,
  autoplay: true,
  autoplayHoverPause: true,
  navText: [
    "<i class='fas fa-chevron-left'></i>",
    "<i class='fas fa-chevron-right'></i>",
  ],
  responsive: {
    0: {
      items: 1,
    },
    380: {
      items: 2,
    },
    576: {
      items: 2,
    },
    768: {
      items: 2,
    },
    1024: {
      items: 3,
    },
    1200: {
      items: 4,
    },
  },
};

interface StateProps {
  products: ProductsPros[];
}

const Products = ({ products }: StateProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [display, setDisplay] = useState(false);
  const [panel, setPanel] = useState(true);

  const openTabSection = (evt, tabNmae) => {
    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabs_item");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].classList.remove("fadeInUp");
      tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByTagName("li");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace("current", "");
    }

    document.getElementById(tabNmae).style.display = "block";
    document.getElementById(tabNmae).className += " fadeInUp animated";
    evt.currentTarget.className += "current";
  };

  useEffect(() => {
    setDisplay(true);
  }, []);

  const openModal = () => {
    return setModalOpen(true);
  };

  const closeModal = () => {
    return setModalOpen(false);
  };

  return (
    <section className="all-products-area pb-60">
      <div className="container">
        <div className="tab products-category-tab">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <ul className="tabs">
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    openTabSection(e, "tab1");
                  }}
                  className="current"
                >
                  <span className="tabs-nav-text">
                    <span className="dot"></span> Produtos recem adicionados
                  </span>
                </li>

                <li
                  onClick={(e) => {
                    e.preventDefault();
                    openTabSection(e, "tab2");
                  }}
                >
                  <span className="tabs-nav-text">
                    <span className="dot"></span> Últimos produtos
                  </span>
                </li>
              </ul>
            </div>

            <div className="col-lg-12 col-md-12">
              <div className="tab_content">
                <div id="tab1" className="tabs_item">
                  <div className="row">
                    {display ? (
                      <OwlCarousel {...options}>
                        {products?.map((data, idx) => (
                          <div className="col-lg-12 col-md-12" key={idx}>
                            <div className="single-product-box">
                              <div className="product-image">
                                <Link
                                  href="/product/[id]"
                                  as={`/product/${data.id}`}
                                >
                                  <a>
                                    <img src={data.image} alt="image" />
                                    <img src={data.imageHover} alt="image" />
                                  </a>
                                </Link>

                                <ul>
                                  <li>
                                    <Link href="#">
                                      <a
                                        data-tip="Quick View"
                                        data-place="left"
                                        onClick={(e) => {
                                          setModalData(data);
                                          openModal();
                                        }}
                                      >
                                        <i className="far fa-eye"></i>
                                      </a>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              <div className="product-content">
                                <h3>
                                  <Link
                                    href="/product/[id]"
                                    as={`/product/${data.id}`}
                                  >
                                    <a>{data.title}</a>
                                  </Link>
                                </h3>

                                <div className="product-price">
                                  <span className="new-price">
                                    ${data.price}
                                  </span>
                                </div>

                                <div className="rating">
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="far fa-star"></i>
                                </div>

                                <AddToCart {...data} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </OwlCarousel>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div id="tab2" className="tabs_item">
                  <div className="row">
                    {display ? (
                      <OwlCarousel {...options}>
                        {products.map((data, idx) => (
                          <div className="col-lg-12 col-md-12" key={idx}>
                            <div className="single-product-box">
                              <div className="product-image">
                                <Link
                                  href="/product/[id]"
                                  as={`/product/${data.id}`}
                                >
                                  <a>
                                    <img src={data.image} alt="image" />
                                    <img src={data.imageHover} alt="image" />
                                  </a>
                                </Link>

                                <ul>
                                  <li>
                                    <Link href="#">
                                      <a
                                        data-tip="Quick View"
                                        data-place="left"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setModalData(data);
                                          openModal();
                                        }}
                                      >
                                        <i className="far fa-eye"></i>
                                      </a>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              <div className="product-content">
                                <h3>
                                  <Link
                                    href="/product/[id]"
                                    as={`/product/${data.id}`}
                                  >
                                    <a>{data.title}</a>
                                  </Link>
                                </h3>

                                <div className="product-price">
                                  <span className="new-price">
                                    ${data.price}
                                  </span>
                                </div>

                                <div className="rating">
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="far fa-star"></i>
                                </div>

                                <AddToCart {...data} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </OwlCarousel>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div id="tab3" className="tabs_item">
                  <div className="row">
                    {display ? (
                      <OwlCarousel {...options}>
                        {products.map((data, idx) => (
                          <div className="col-lg-12 col-md-12" key={idx}>
                            <div className="single-product-box">
                              <div className="product-image">
                                <Link
                                  href="/product/[id]"
                                  as={`/product/${data.id}`}
                                >
                                  <a>
                                    <img src={data.image} alt="image" />
                                    <img src={data.imageHover} alt="image" />
                                  </a>
                                </Link>

                                <ul>
                                  <li>
                                    <Link href="#">
                                      <a
                                        data-tip="Quick View"
                                        data-place="left"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          setModalData(data);
                                          openModal();
                                        }}
                                      >
                                        <i className="far fa-eye"></i>
                                      </a>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <a
                                        data-tip="Add to Wishlist"
                                        data-place="left"
                                      >
                                        <i className="far fa-heart"></i>
                                      </a>
                                    </Link>
                                  </li>
                                  <li>
                                    <Link href="#">
                                      <a
                                        data-tip="Add to Compare"
                                        data-place="left"
                                      >
                                        <i className="fas fa-sync"></i>
                                      </a>
                                    </Link>
                                  </li>
                                </ul>
                              </div>

                              <div className="product-content">
                                <h3>
                                  <Link
                                    href="/product/[id]"
                                    as={`/product/${data.id}`}
                                  >
                                    <a>{data.title}</a>
                                  </Link>
                                </h3>

                                <div className="product-price">
                                  <span className="new-price">
                                    ${data.price}
                                  </span>
                                </div>

                                <div className="rating">
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="fas fa-star"></i>
                                  <i className="far fa-star"></i>
                                </div>

                                <AddToCart {...data} />
                              </div>
                            </div>
                          </div>
                        ))}
                      </OwlCarousel>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalOpen ? (
        <QuickView closeModal={closeModal} modalData={modalData} />
      ) : (
        ""
      )}
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    card: state.card,
  };
};

export default connect(mapStateToProps)(Products);
