import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import { useDispatch } from "react-redux";

import Nav from "react-bootstrap/Nav";
import ProductGridFour from "./ProductGridFour";
import { setSelectCat } from "../../store/slices/selected-cat";

import SectionTitle from "../../components/section-title/SectionTitle";

const TabProductSix = ({
  spaceTopClass,
  spaceBottomClass,
  category,
  productTabClass,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={clsx("product-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <SectionTitle
          titleText="Related Products"
          positionClass="text-center"
          spaceClass="mb-55"
          borderClass="no-border"
        />

        <div className="row">
          <ProductGridFour
            category={category}
            type="new"
            limit={8}
            spaceBottomClass="mb-25"
          />
        </div>

        <div className="view-more text-center mt-20 toggle-btn6 col-12 mb-4">
          <Link
            className="loadMore6"
            onClick={() => dispatch(setSelectCat("All"))}
            to={process.env.PUBLIC_URL + "/shop-grid-standard"}
          >
            VIEW MORE PRODUCTS
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductSix.propTypes = {
  category: PropTypes.string,
  productTabClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default TabProductSix;
