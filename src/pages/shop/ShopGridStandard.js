import { Fragment, useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getSortedProducts } from "../../helpers/product";
import Spinner from "react-bootstrap/Spinner";

import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
// import { Pagination } from "@mui/material";

import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";
import ShopProducts from "../../wrappers/product/ShopProducts";
import { url } from "../../environment";
import { setSearchCat } from "../../store/slices/search_Cat";
const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [Allpages, setAllpages] = useState(0);
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [IsLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [Products, setProducts] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);
  const { products } = useSelector((state) => state.product);
  const { search } = useSelector((state) => state.search);
  const { selectCat } = useSelector((state) => state.selectCat);

  const pageLimit = 15;
  let { pathname } = useLocation();

  const getLayout = (layout) => {
    setLayout(layout);
  };
  // Function to filter selected categories and retrieve their IDs

  const getSortParams = (sortType, sortValue) => {
    dispatch(setSearchCat(""));
    let IDs = sortType
      .filter((category) => category.selected)
      .map((category) => category.id);
    setSelectedCat(IDs);
    GetAllProducts(IDs);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  useEffect(() => {
    let sortedProducts = getSortedProducts(products, sortType, sortValue);
    const filterSortedProducts = getSortedProducts(
      sortedProducts,
      filterSortType,
      filterSortValue
    );
    sortedProducts = filterSortedProducts;
    setSortedProducts(sortedProducts);
    setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
  }, [offset, products, sortType, sortValue, filterSortType, filterSortValue]);

  useEffect(() => {
    if ((search && search.length > 0) || currentPage || selectCat) {
      GetAllProducts();
    }
  }, [currentPage, search, selectCat]);
  useEffect(() => {
    GetAllProducts();
  }, []);

  const GetAllProducts = (cat) => {
    window.scrollTo(0, 0);
    let filteredItems = [];

    setIsLoading(true);
    fetch(`${url}/user/products/list`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        page: currentPage ? currentPage : 1,
        limit: 15,
        search: search ? search : "",
        categories:
          selectCat && selectCat !== "All" ? [selectCat] : cat ? cat : [],
        // price: [],
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        // value--
        if (response.statusCode === 200) {
          setProducts(response?.data?.products);
          //   dispatch({
          //     type: UPDATE_PRODUCT_REFRESH, payload: 0
          //   })
          setAllpages(response?.data?.totalCount);
          // dispatch(setSearchCat(""));
          setIsLoading(false);
        }
      })
      .catch((err) => {});
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Shop Page"
        description="Shop page of flone react minimalist eCommerce template."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Shop", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* <div className="flone-preloader-wrapper">
                <div className="flone-preloader">
                  <span></span>
                  <span></span>
                </div>
              </div> */}
                {/* shop sidebar */}
                <ShopSidebar
                  products={products}
                  getSortParams={getSortParams}
                  sideSpaceClass="mr-30"
                />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar default */}
                {/* <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} /> */}

                {/* shop page content default */}
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
                ) : Products.length > 0 ? (
                  <ShopProducts layout={layout} products={Products} />
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <h4>No Product Found</h4>
                  </div>
                )}

                {/* shop product pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  <Paginator
                    totalRecords={Allpages}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
