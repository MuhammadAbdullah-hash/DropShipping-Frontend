import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";

const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();
  const checkId = (itemToCheck) => {
    const myArray = [5175, 5171, 5172, 4848, 4844];
    if (myArray.includes(itemToCheck)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Fragment>
      <div
        className={clsx("product-wrap", spaceBottomClass)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            <img
              className={checkId(product.id) ? "default-img-sh" : "default-img"}
              src={process.env.PUBLIC_URL + product.imageName}
              alt=""
            />
          </Link>

          <div className="product-action">
            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="pe-7s-look" />
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {product.name}
            </Link>
          </h3>
          {}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol + product.rrp}</span>{" "}
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + product.rrp} </span>
            )}
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              <div className="product-img">
                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                  <img
                    className="default-img img-fluid"
                    src={process.env.PUBLIC_URL + product.imageName}
                    alt=""
                  />
                  {}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <h3>
                <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
                  {product.name}
                </Link>
              </h3>
              <div className="product-list-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>{product.rrp}</span> {}
                  </Fragment>
                ) : (
                  <span>{product.rrp} </span>
                )}
              </div>

              {product.shortDescription ? (
                <p>{product.shortDescription}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
      {}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={product.rrp}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridListSingle;
