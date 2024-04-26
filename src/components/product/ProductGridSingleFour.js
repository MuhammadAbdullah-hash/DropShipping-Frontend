import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { setSelectCat } from "../../store/slices/selected-cat";

import { getDiscountPrice } from "../../helpers/product";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductGridSingleFour = ({
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

  return (
    <Fragment>
      <div
        className={clsx("product-wrap-5", spaceBottomClass)}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
            <img
              className={product.id === 5175 ? "default-img-sh" : "default-img"}
              src={process.env.PUBLIC_URL + product.imageName}
              alt=""
            />
          </Link>

          <div className="product-action-4">
            <div className="pro-same-action pro-cart">
              <button
                onClick={() => dispatch(addToCart(product))}
                className={
                  cartItem !== undefined && cartItem.quantity > 0
                    ? "active"
                    : ""
                }
                disabled={cartItem !== undefined && cartItem.quantity > 0}
                title={cartItem !== undefined ? "Added to cart" : "Add to cart"}
              >
                {" "}
                <i className="fa fa-shopping-cart"></i>{" "}
              </button>
            </div>

            <div className="pro-same-action pro-quickview">
              <button onClick={() => setModalShow(true)} title="Quick View">
                <i className="fa fa-eye"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="product-content-5 text-center">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/product/" + product.id}>
              {product.name}
            </Link>
          </h3>
          <div className="price-5">
            {discountedPrice !== null ? (
              <Fragment>
                <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
                <span className="old">
                  {currency.currencySymbol + product.rrp}
                </span>
              </Fragment>
            ) : (
              <span>{currency.currencySymbol + product.rrp} </span>
            )}
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={product.rrp}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
      />
    </Fragment>
  );
};

ProductGridSingleFour.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridSingleFour;
