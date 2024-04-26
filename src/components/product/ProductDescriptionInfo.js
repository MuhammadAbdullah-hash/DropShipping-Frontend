import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProductCartQuantity } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

const ProductDescriptionInfo = ({
  product,
  discountedPrice,
  currency,
  finalDiscountedPrice,
  finalProductPrice,
  cartItems,
  wishlistItem,
  compareItem,
}) => {
  const dispatch = useDispatch();
  const [selectedProductColor, setSelectedProductColor] = useState(
    product?.variation ? product?.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product?.variation ? product?.variation[0].size[0].name : ""
  );
  // const [productStock, setProductStock] = useState(
  //   product?.variation ? product?.variation[0].size[0]?.stock : product?.stock
  // );
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  return (
    <div className="product-details-content ml-70">
      <h2>{product?.name}</h2>
      <div className="product-details-price">
        {discountedPrice !== null ? (
          <Fragment>
            <span>{currency.currencySymbol + finalDiscountedPrice}</span>{" "}
            {/* <span className="old">
              {currency.currencySymbol + finalProductPrice}
            </span> */}
          </Fragment>
        ) : (
          <span>{currency.currencySymbol + finalProductPrice} </span>
        )}
      </div>

      <div className="pro-details-list">
        <p>{product?.description}</p>
      </div>

      <div className="pro-details-quality">
        <div className="cart-plus-minus">
          <button
            onClick={() =>
              setQuantityCount(quantityCount > 1 ? quantityCount - 1 : 1)
            }
            className="dec qtybutton"
          >
            -
          </button>
          <input
            className="cart-plus-minus-box"
            type="text"
            value={quantityCount}
            readOnly
          />
          <button
            onClick={() => setQuantityCount(quantityCount + 1)}
            className="inc qtybutton"
          >
            +
          </button>
        </div>
        <div className="pro-details-cart btn-hover">
          <button
            onClick={() =>
              dispatch(
                addToCart({
                  ...product,
                  quantity: quantityCount,
                  selectedProductColor: selectedProductColor
                    ? selectedProductColor
                    : product.selectedProductColor
                    ? product.selectedProductColor
                    : null,
                  selectedProductSize: selectedProductSize
                    ? selectedProductSize
                    : product.selectedProductSize
                    ? product.selectedProductSize
                    : null,
                })
              )
            }
            // disabled={productCartQty >= productStock}
          >
            {" "}
            Add To Cart{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionInfo.propTypes = {
  cartItems: PropTypes.array,
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  discountedPrice: PropTypes.number,
  finalDiscountedPrice: PropTypes.number,
  finalProductPrice: PropTypes.number,
  product: PropTypes.shape({}),
  wishlistItem: PropTypes.shape({}),
};

export default ProductDescriptionInfo;
