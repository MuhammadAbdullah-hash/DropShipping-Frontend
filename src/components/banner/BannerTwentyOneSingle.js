import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { setSelectCat } from "../../store/slices/selected-cat";
import { useDispatch } from "react-redux";

const BannerTwentyOneSingle = ({ data, spaceBottomClass }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={clsx("single-banner", spaceBottomClass)}>
        <Link
          onClick={() => dispatch(setSelectCat(data.id))}
          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
        >
          <img
            width={370}
            height={215}
            src={process.env.PUBLIC_URL + data.frontImageName}
            alt=""
          />
        </Link>
      </div>
      <div className="banner-content" style={{ textAlign: "center" }}>
        <Link
          onClick={() => dispatch(setSelectCat(data.id))}
          to={process.env.PUBLIC_URL + "/shop-grid-standard"}
        >
          <h4>{data.name}</h4>
        </Link>
        {/* <h4>      
      {data.subtitle} <span>{data.rrp}</span>
    </h4> */}
      </div>
    </>
  );
};

BannerTwentyOneSingle.propTypes = {
  data: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
};

export default BannerTwentyOneSingle;
