import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { EffectFade, Thumbs } from "swiper";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from "./sub-components/ProductRating";
import Swiper, { SwiperSlide } from "../../components/swiper";
import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";

function ProductModal({
  product,
  currency,
  discountedPrice,
  finalProductPrice,
  finalDiscountedPrice,
  show,
  onHide,
  wishlistItem,
  compareItem,
}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const [selectedProductColor, setSelectedProductColor] = useState(
    product.variation ? product.variation[0].color : ""
  );
  const [selectedProductSize, setSelectedProductSize] = useState(
    product.variation ? product.variation[0].size[0].name : ""
  );
  const [productStock, setProductStock] = useState(
    product.variation ? product.variation[0].size[0].stock : product.stock
  );
  const [quantityCount, setQuantityCount] = useState(1);
  const productCartQty = getProductCartQuantity(
    cartItems,
    product,
    selectedProductColor,
    selectedProductSize
  );

  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: true,
  };

  const onCloseModal = () => {
    setThumbsSwiper(null);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-large-image-wrapper">
              <Swiper options={gallerySwiperParams}>
                {/* {product.image &&
                product.image.map((img, i) => {
                  return ( */}
                <SwiperSlide>
                  <div className="single-image">
                    <img
                      src={process.env.PUBLIC_URL + product.imageName}
                      className="img-fluid"
                      alt="Product"
                    />
                  </div>
                </SwiperSlide>
                {/* );
                })} */}
              </Swiper>
            </div>
          </div>
          <div className="col-md-7 col-sm-12 col-xs-12">
            <div className="product-details-content quickview-content">
              <h2>{product.name}</h2>
              <div className="product-details-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {currency.currencySymbol + finalDiscountedPrice}
                    </span>{" "}
                  </Fragment>
                ) : (
                  <span>{currency.currencySymbol + finalProductPrice} </span>
                )}
              </div>

              <div className="pro-details-list">
                <p>{product.description}</p>
              </div>

              {product.affiliateLink ? (
                <div className="pro-details-quality">
                  <div className="pro-details-cart btn-hover">
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      Buy Now
                    </a>
                  </div>
                </div>
              ) : (
                <div className="pro-details-quality">
                  <div className="cart-plus-minus">
                    <button
                      onClick={() =>
                        setQuantityCount(
                          quantityCount > 1 ? quantityCount - 1 : 1
                        )
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
                    {/* {productStock && productStock > 0 ? ( */}
                    <button
                      onClick={() =>
                        dispatch(
                          addToCart({
                            ...product,
                            quantity: quantityCount,
                            selectedProductColor: null,
                            selectedProductSize: null,
                          })
                        )
                      }
                    >
                      {" "}
                      Add To Cart{" "}
                    </button>
                    {/* ) : (
                    <button disabled>Out of Stock</button>
                  )} */}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ProductModal.propTypes = {
  currency: PropTypes.shape({}),
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.shape({}),
  show: PropTypes.bool,
  wishlistItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
};

export default ProductModal;
