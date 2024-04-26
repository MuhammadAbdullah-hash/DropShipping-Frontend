import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../../../store/slices/currency-slice"

const LanguageCurrencyChanger = ({ currency }) => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    dispatch(setCurrency(currencyName));
  };

  return (
    <div className="language-currency-wrap">
      
      <div className="same-language-currency mt-4 mb-4">
        <p>Call Us 3965410</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  // currency: PropTypes.shape({}),
};

export default LanguageCurrencyChanger;
