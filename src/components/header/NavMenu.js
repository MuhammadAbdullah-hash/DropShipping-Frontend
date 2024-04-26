import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import clsx from "clsx";
import { url } from "../../environment";
import { setSearchCat } from "../../store/slices/search_Cat";
import { setSelectCat } from "../../store/slices/selected-cat";
import { useState, useEffect } from "react";
const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
  const { t } = useTranslation();
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
          // setLoading(false);
          // GetAllProducts(Array);
        }
      })
      .catch((error) => {});
  };

  const dispatch = useDispatch();

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul>
          <li>
            <Link
              onClick={() => dispatch(setSearchCat(""))}
              to={process.env.PUBLIC_URL + "/"}
            >
              {t("Home")}
            </Link>
          </li>{" "}
          <li>
            <Link
              onClick={() => {
                dispatch(setSearchCat(""));
                dispatch(setSelectCat(""));
              }}
              to={process.env.PUBLIC_URL + "/about"}
            >
              {t("About")}
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                dispatch(setSearchCat(""));
                dispatch(setSelectCat("All"));
              }}
              to={process.env.PUBLIC_URL + "/shop-grid-standard"}
            >
              {t("Products")}
            </Link>
          </li>
          <li>
            <Link
              onClick={() => {
                dispatch(setSearchCat(""));
                dispatch(setSelectCat(""));
              }}
              to={process.env.PUBLIC_URL + "/"}
            >
              {t("Categories")}
              {sidebarMenu ? (
                <span>
                  <i className="fa fa-angle-right"></i>
                </span>
              ) : (
                <i className="fa fa-angle-down" />
              )}
            </Link>
            <ul className="submenu">
              {Categories &&
                Categories.map((item) => {
                  return (
                    <li>
                      <Link
                        onClick={() => {
                          dispatch(setSearchCat(""));
                          dispatch(setSelectCat(item.id));
                        }}
                        to={process.env.PUBLIC_URL + "/shop-grid-standard"}
                      >
                        {t(item.name)}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </li>
          <li>
            <Link
              onClick={() => dispatch(setSearchCat(""))}
              to={process.env.PUBLIC_URL + "/contact"}
            >
              {t("contact_us")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

NavMenu.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu;
