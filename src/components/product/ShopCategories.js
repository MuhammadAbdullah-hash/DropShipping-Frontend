import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";

const ShopCategories = ({ categories, setCategories, getSortParams }) => {
  const handleCategoryClick = (index) => {
    // Toggle the 'selected' property of the category
    const updatedCategories = [...categories];
    updatedCategories[index].selected = !updatedCategories[index].selected;
    setCategories(updatedCategories);
    getSortParams(updatedCategories);

    // Now you can update your state or trigger any other actions needed.
  };

  const handleSelectAllClick = () => {
    const allSelected = categories.every((category) => category.selected);

    const updatedCategories = categories.map((category) => ({
      ...category,
      selected: !allSelected,
    }));

    setCategories(updatedCategories);
    getSortParams(updatedCategories);
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">Categories </h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={handleSelectAllClick}
                  className={
                    categories.every((category) => category.selected)
                      ? "active"
                      : ""
                  }
                >
                  <span
                    className={`checkmark ${
                      categories.every((category) => category.selected)
                        ? "selected"
                        : ""
                    }`}
                  />{" "}
                  All Categories
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={() => handleCategoryClick(key)}
                      className={category.selected === true ? "active" : ""}
                    >
                      <span
                        className={`checkmark ${
                          category.selected === true ? "selected" : ""
                        }`}
                      />{" "}
                      {category.name}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          "No categories found"
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func,
};

export default ShopCategories;
