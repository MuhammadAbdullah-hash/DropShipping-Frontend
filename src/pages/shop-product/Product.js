import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { url } from "../../environment";

const Product = () => {
  let { pathname } = useLocation();
  const [IsLoading, setIsLoading] = useState(false);
  const [ProductDetail, setProductDetail] = useState();
  let { id } = useParams();
  const { products } = useSelector((state) => state.product);
  const product = products.find((product) => product?.id === id);

  useEffect(() => {
    getProductdetail();
  }, []);

  const getProductdetail = (e, pageNumber) => {
    setIsLoading(true);
    fetch(`${url}/user/products/get/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setProductDetail(response?.data?.product);
          setIsLoading(false);
        }
      })
      .catch((err) => {});
  };
  return (
    <Fragment>
      <SEO
        titleTemplate="Product Page"
        description="Product Page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop Product", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        {/* product description with image */}
        <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={ProductDetail}
        />

        {/* product description tab */}
        <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={ProductDetail?.fullDescription}
        />

        {/* related product slider */}
        <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={ProductDetail}
        />
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
