import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { setSelectCat } from "../../store/slices/selected-cat";
import { setSearchCat } from "../../store/slices/search_Cat";
import { useState } from "react";

const IconGroup = ({ iconWhiteClass }) => {
  const [SearchActive, setSearchActive] = useState(false);

  const handleClick = (e) => {
    setSearchActive(!SearchActive);
    setTimeout(() => {
      setSearchValue("");
    }, 2000);
  };
  const handleClickCart = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };
  const handleClickClose = (e) => {
    e.currentTarget.nextSibling.classList.toggle("");
  };
  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const [SearchValue, setSearchValue] = useState("");

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div
          className={SearchActive ? "search-content active" : "search-content"}
        >
          <form action="#">
            <input
              type="text"
              placeholder="Search"
              value={SearchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Link to="/shop-grid-standard">
              <button
                className="button-search"
                onClick={(e) => {
                  {
                    dispatch(setSearchCat(SearchValue));
                    dispatch(setSelectCat(""));
                    handleClick(e);
                  }
                }}
              >
                <i className="pe-7s-search" />
              </button>
            </Link>
          </form>
        </div>
      </div>

      <div className="same-style cart-wrap d-none d-lg-block">
        <button className="icon-cart" onClick={(e) => handleClickCart(e)}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </button>

        {/* menu cart */}
        <MenuCart />
      </div>
      <div className="same-style cart-wrap d-block d-lg-none">
        <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
          <i className="pe-7s-shopbag" />
          <span className="count-style">
            {cartItems && cartItems.length ? cartItems.length : 0}
          </span>
        </Link>
      </div>
      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;
