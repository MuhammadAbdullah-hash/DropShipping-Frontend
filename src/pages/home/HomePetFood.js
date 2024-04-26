import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import BlogFeaturedThree from "../../wrappers/blog-featured/BlogFeaturedThree";
import BannerTwentyOne from "../../wrappers/banner/BannerTwentyOne";
import CountDownThree from "../../wrappers/countdown/CountDownThree";
import HeroSliderTwentyThree from "../../wrappers/hero-slider/HeroSliderTwentyThree";
import TabProductSix from "../../wrappers/product/TabProductSix";
import BannerTwentyTwo from "../../wrappers/banner/BannerTwentyTwo";

const HomePetFood = () => {
  return (
    <Fragment>
      <SEO
        titleTemplate="Home"
        description="Pet food home of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        <HeroSliderTwentyThree />

        <BannerTwentyOne spaceTopClass="pt-60" spaceBottomClass="pb-60" />

        <TabProductSix category="pet food" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomePetFood;
