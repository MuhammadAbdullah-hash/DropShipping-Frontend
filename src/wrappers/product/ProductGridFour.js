import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import { getProducts } from "../../helpers/product";
import ProductGridSingleFour from "../../components/product/ProductGridSingleFour";
import { url } from "../../environment";
const ProductGridFour = ({ spaceBottomClass, category, type, limit }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { compareItems } = useSelector((state) => state.compare);
  const [products, setProducts] = useState([]);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    GetAllProducts();
  }, []);

  const GetAllProducts = () => {
    setIsLoading(true);
    fetch(`${url}/user/products/list/shuffled`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setProducts(response?.data?.products);
          setIsLoading(false);
        }
      })
      .catch((err) => {});
  };

  return (
    <Fragment>
      {IsLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "40vh",
          }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        products?.map((product) => (
          <div
            className="col-xl-3 col-md-6 col-lg-4 col-sm-6"
            key={product.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ProductGridSingleFour
              spaceBottomClass={spaceBottomClass}
              product={product}
              currency={currency}
            />
          </div>
        ))
      )}
    </Fragment>
  );
};

ProductGridFour.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default ProductGridFour;
