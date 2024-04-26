import PropTypes from "prop-types";
import clsx from "clsx";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes,
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import { useSelector } from "react-redux";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";
import { url } from "../../environment";
import { useEffect, useState } from "react";

const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  const uniqueCategories = getIndividualCategories(products);
  const uniqueColors = getIndividualColors(products);
  const uniqueSizes = getProductsIndividualSizes(products);
  const uniqueTags = getIndividualTags(products);
  const { selectCat } = useSelector((state) => state.selectCat);
  const { search } = useSelector((state) => state.search);

  const [Categories, setCategories] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    // setLoading(true);
    // setIsLoading(true);

    let urlnew = `${url}/user/categories/list`;

    fetch(urlnew, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          let Array = [];
          // data?.data?.categories?.map((item) => {
          //   Array.push({
          //     name: item.name,
          //     checked: item.id === Number(SearchCat) ? true : false,
          //     id: item.id
          //   })
          // })

          setCategories(data?.data?.categories);
          let CategoriesData = data?.data?.categories;
          if (selectCat === "All") {
            const updatedCategories = CategoriesData.map((category) => ({
              ...category,
              selected: true,
            }));
            console.log(updatedCategories);
            setCategories(updatedCategories);
          } else {
            const updatedItems = CategoriesData.map((item) => {
              if (item.id === selectCat) {
                return { ...item, selected: true };
              } else {
                return { ...item, selected: false };
              }
            });
            setCategories(updatedItems);
          }
          // setLoading(false);
          // GetAllProducts(Array);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    console.log(selectCat);
    if (selectCat === "All") {
      const updatedCategories = Categories.map((category) => ({
        ...category,
        selected: true,
      }));
      console.log(updatedCategories);
      setCategories(updatedCategories);
    } else {
      const updatedItems = Categories.map((item) => {
        if (item.id === selectCat) {
          return { ...item, selected: true };
        } else {
          return { ...item, selected: false };
        }
      });
      setCategories(updatedItems);
    }
  }, [selectCat, search]);
  return (
    <div className={clsx("sidebar-style", sideSpaceClass)}>
      {/* shop search */}
      {/* <ShopSearch /> */}

      {/* filter by categories */}
      <ShopCategories
        setCategories={setCategories}
        categories={Categories}
        getSortParams={getSortParams}
      />

      {/* filter by color */}
      {/* <ShopColor colors={uniqueColors} getSortParams={getSortParams} /> */}

      {/* filter by size */}
      {/* <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} /> */}

      {/* filter by tag */}
      {/* <ShopTag tags={uniqueTags} getSortParams={getSortParams} /> */}
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
