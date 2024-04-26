import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import tick from "../../assets/qa.gif";

import Row from "react-bootstrap/Row";
import { getDiscountPrice } from "../../helpers/product";
import Spinner from "react-bootstrap/Spinner";

import SEO from "../../components/seo";
// import Modal from "@mui/material/Modal";
import { CheckoutForm } from "./CheckoutForm";
import { message } from "antd";

// import Box from "@mui/material/Box";
// import Typography from "@mui/material/Typography";
import { deleteAllFromCart } from "../../store/slices/cart-slice";

import LayoutOne from "../../layouts/LayoutOne";
import { Formik, Field, Form, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Modal } from "antd";

import { url } from "../../environment";
// import { message } from "antd";
import { Elements, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
// import { CircularProgress } from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 327,
  bgcolor: "background.paper",
  borderRadius: "25px",
  boxShadow: 24,
  pt: 4,
  px: 4,
  pb: 5,
};
const Checkout = () => {
  let cartTotalPrice = 0;
  let storedArray = JSON.parse(localStorage.getItem("myArray")) || [];

  let { pathname } = useLocation();
  const currency = useSelector((state) => state.currency);
  const [messagestripe, setMessagestripe] = useState(null);
  // const [messageApi, contextHolder] = message.useMessage();

  const [OrderNumber, setOrderNumber] = useState("");
  const stripePromise = loadStripe(
    "pk_test_51Mywy9J9slboT9qM4PkQxymo2HEnuKJ4SlNo47OnduBi31RwWE8t3ysgbvH1RaC0zxiSy99zR7VMnjit9tvWOsnW00FzMFE1rJ"
  );

  const [ErrorMes, setErrorMes] = useState("");
  const [loading, setLoading] = React.useState(false);
  const [CartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("myArray"))
  );
  const [payStripe, setPayStripe] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [ShippingSettings, setShippingSettings] = useState([]);
  const [ShippingTotal, setShippingTotal] = useState(0);
  const [Refresh, setRefresh] = useState(0);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [payFailed, setpayFailed] = React.useState(false);
  const dispatch = useDispatch();
  const [open1, setOpen1] = React.useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [AllValue, setAllValue] = React.useState();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const navigate = useNavigate();
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);

  const handleOpenPay = () => setPayStripe(true);
  const [messageApi, contextHolder] = message.useMessage();

  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  // const stripe = useStripe();
  const [stripePaymentElements, setStripePaymentElement] = useState(null);
  const [paymentClientSecret, setPaymentClientSecret] = useState(null);

  let elementsStripe;

  // const elements = useElements();

  const formik = useFormikContext();

  useEffect(() => {
    window.scrollTo(0, 0);
    let storedArray = JSON.parse(localStorage.getItem("myArray"));
    setCartData(storedArray);

    const url = window.location.search;

    const queryString = url.substring(1);

    const queryParamsArray = queryString.split("&");

    const queryParamsObject = {};
    queryParamsArray.forEach((param) => {
      const [key, value] = param.split("=");
      queryParamsObject[key] = value;
    });

    const redirect_status = queryParamsObject["redirect_status"];
    if (redirect_status === "succeeded") {
      addAllShipping("Paypal");
    } else if (redirect_status === "failed") {
      handlepayFailed();
    }

    if (storedArray?.length < 1) {
      navigate("/home");
    }
    if (firstNameRef.current) {
      firstNameRef.current.scrollIntoView({ behavior: "smooth" });
    }

    GetAllShipping();
    const container = remainingFieldsRef.current;
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
    }
  }, []);

  const handlepayFailed = () => {
    setpayFailed(true);
    handlePaystripe("");
  };

  const GetAllShipping = () => {
    setIsLoading(true);
    fetch(`${url}/user/orders/shipping/costs`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setShippingSettings(response?.data?.shippingFee);
          let obj = response?.data?.shippingFee[0];
          setShippingTotal(obj);
          setIsLoading(false);
        }
      })
      .catch((err) => {});
  };

  const success = (e) => {
    messageApi.open({
      type: "error",
      content: e,
    });
  };

  const { cartItems } = useSelector((state) => state.cart);

  const addAllShipping = (e) => {
    let Docline = [];
    let myArray = JSON.parse(localStorage.getItem("myArray"));
    let Data = JSON.parse(localStorage.getItem("PlaceOrder"));
    let Data1 = JSON.parse(localStorage.getItem("shippingDetail"));
    let Data2 = localStorage.getItem("cartTotal");
    console.log(cartItems);
    cartItems &&
      cartItems?.map((item, index) => {
        Docline.push({
          quantity: item.quantity,
          productName: item.name,
          productStock: item.stockName,
          productId: item.id,
          amount: Number(item.rrp) * Number(item.quantity),
        });
      });
    setLoading(true);
    // handleOpen();

    let TaxNew;
    if (e === "Paypal") {
      TaxNew = Data2 ? (Data1?.tax * Data2)?.toFixed(2) : 0;
    } else {
      TaxNew = cartTotalPrice
        ? (ShippingTotal?.tax * Number(cartTotalPrice.toFixed(0)))?.toFixed(2)
        : 0;
    }

    // setBackButton(false);
    fetch(`${url}/user/orders/add`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        emailAddress: e === "Paypal" ? Data.emailNew : AllValue.emailNew,
        totalAmount: e === "Paypal" ? Data2 : Number(cartTotalPrice.toFixed(0)),
        orderDetails: Docline,
        shippingAddress: e === "Paypal" ? Data.emailNew : AllValue.Address,
        city: e === "Paypal" ? Data.emailNew : AllValue.city,
        town: e === "Paypal" ? Data.emailNew : AllValue.town,
        paymentId: clientSecret,
        shippingAddress: e === "Paypal" ? Data.emailNew : AllValue.Address,
        shippingFee:
          e === "Paypal" ? Data1?.shippingFee : ShippingTotal?.shippingFee,
        totalTax: TaxNew,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.statusCode === 200) {
          localStorage.removeItem("myArray");

          setOrderNumber(response.data.orderNo);
          handleOpen();
          // checkDefaultCounter();
          dispatch(deleteAllFromCart());
          setCartData([]);
          setLoading(false);
          setIsLoading(false);
        } else if (response.statusCode === 400) {
          success(response.message);
          setLoading(false);
        }
      })
      .catch((err) => {});
  };

  const firstNameRef = useRef(null);

  const backToHome = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    localStorage.setItem("PlaceOrder", JSON.stringify(event));
    localStorage.setItem("shippingDetail", JSON.stringify(ShippingTotal));
    // localStorage.setItem("cartTotal", cartCountTotal);
    // setErrorChec(true);
    handleOpenPay();

    if (cartItems?.length < 1) {
      navigate("/home");
    }

    setLoading(true);
    const response = await fetch(`${url}/payment/create/intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Number(cartTotalPrice.toFixed(0)),
        currency: "usd",
        name: event.fname + " " + event.lname,
        address: event.Address,
        country: "UK",
        description: event.message,
      }),
    });
    const result = await response.json();
    if (result.statusCode === 400) {
      success(result.message);
      setLoading(false);
    }
    if (result.success) {
      const { clientSecret } = result.data;

      setClientSecret(clientSecret);

      setPaymentClientSecret(clientSecret);

      setLoading(false);
      const stripe = await loadStripe(
        "pk_test_51Mywy9J9slboT9qM4PkQxymo2HEnuKJ4SlNo47OnduBi31RwWE8t3ysgbvH1RaC0zxiSy99zR7VMnjit9tvWOsnW00FzMFE1rJ"
      );

      const appearance = {
        theme: "flat",
      };

      elementsStripe = stripe.elements({ appearance, clientSecret });

      const paymentElementOptions = {
        layout: "tabs",
      };

      const paymentElement = elementsStripe.create(
        "payment",
        paymentElementOptions
      );
      setStripePaymentElement(paymentElement);
    }
  };

  const handlePaystripe = (e) => {
    setPayStripe(false);
    if (e === "STripe") {
      addAllShipping();
    }
  };

  const remainingFieldsRef = useRef(null);

  const handleSubmitnew = async (values, { setSubmitting, setFieldError }) => {
    try {
      const validationSchema = Yup.object().shape({
        fname: Yup.string().required("First Name is required"),
        lname: Yup.string().required("Last Name is required"),
        city: Yup.string().required("City is required"),
        town: Yup.string(),
        Address: Yup.string().required("Street Address is required"),
        emailNew: Yup.string()
          .email("Invalid email address")
          .required("Email Address is required"),
        message: Yup.string().required("Order notes is required"),
      });

      await validationSchema.validate(values, { abortEarly: false });
      // dispatch({ type: CATEGORY_ERROR, payload: 0 });
      handleSubmit(values);
      setAllValue(values);
      setSubmitting(false);

      remainingFieldsRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (validationError) {
      window.scrollTo(0, 0);

      validationError.inner.forEach((error) => {
        setFieldError(error.path, error.message);
      });

      setSubmitting(false);
    }
  };

  const options = {
    mode: "payment",
    amount: 1099,
    currency: "usd",
    appearance: {},
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Checkout"
        description="Checkout page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Checkout", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <Modal open={open} footer={[]} width={300}>
          <div style={{ style }}>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <div
                className=""
                style={{
                  textAlign: "center",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img src={tick} width={170} height={170} />
                <h3 style={{ color: "black" }}>
                  <b>Your Order has been Placed Succesfully!</b>
                </h3>
                <p style={{ fontSize: "14px" }} sx={{ mt: 3 }}>
                  Your Order Has been Confirmed. Your Order Number is{" "}
                  <b>{OrderNumber}</b>. Email has been sent to you.
                </p>
                <div
                  class="place-order mt-5 mb-2"
                  style={{ background: "none !important" }}
                >
                  <button className="btn-hover" onClick={(e) => backToHome(e)}>
                    {" "}
                    Back to Home
                  </button>
                </div>
              </div>
            )}
          </div>
        </Modal>
        <Modal open={payStripe} footer={[]} width={400}>
          <Container>
            {loading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm
                  setRefresh={setRefresh}
                  handlepayFailed={handlepayFailed}
                  Refresh={Refresh}
                  handlePaystripe={handlePaystripe}
                />
              </Elements>
            ) : null}
          </Container>
        </Modal>

        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Formik
                initialValues={{
                  fname: "",
                  lname: "",

                  city: "",
                  Address: "",
                  emailNew: "",
                  message: "",
                }}
                onSubmit={handleSubmitnew}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="row">
                      <div className="col-lg-7">
                        <div className="billing-info-wrap">
                          <h3>Billing Details</h3>
                          <div className="row">
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>First Name *</label>
                                <Field
                                  type="text"
                                  name="fname"
                                  placeholder="Your first name"
                                  innerRef={firstNameRef}
                                />
                                <ErrorMessage
                                  name="fname"
                                  component="div"
                                  className="error-message"
                                  style={{ color: "red" }}
                                />
                              </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                              <div className="billing-info mb-20">
                                <label>Last Name *</label>
                                <Field
                                  type="text"
                                  name="lname"
                                  placeholder="Your last name"
                                />
                                <ErrorMessage
                                  name="lname"
                                  component="div"
                                  style={{ color: "red" }}
                                  className="error-message"
                                />
                              </div>
                            </div>

                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Street Address *</label>
                                <Field
                                  type="text"
                                  name="Address"
                                  placeholder="House and street name"
                                />
                                <ErrorMessage
                                  name="Address"
                                  component="div"
                                  style={{ color: "red" }}
                                  className="error-message"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>Town </label>
                                <Field
                                  type="text"
                                  name="town"
                                  placeholder="Town"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12">
                              <div className="billing-info mb-20">
                                <label>City *</label>
                                <Field
                                  type="text"
                                  name="city"
                                  placeholder="City"
                                />
                                <ErrorMessage
                                  name="city"
                                  component="div"
                                  style={{ color: "red" }}
                                  className="error-message"
                                />
                              </div>
                            </div>
                            <div className="col-lg-12 col-md-12">
                              <div className="billing-info mb-20">
                                <label>Email *</label>
                                <Field
                                  type="email"
                                  id="email"
                                  name="emailNew"
                                  placeholder="Your Email Address"
                                />
                                <ErrorMessage
                                  name="emailNew"
                                  component="div"
                                  style={{ color: "red" }}
                                  className="error-message"
                                />
                              </div>
                            </div>
                          </div>

                          <div className="additional-info-wrap">
                            <h4>Additional information</h4>
                            <div className="additional-info">
                              <label>Order Notes *</label>

                              <Field
                                as="textarea"
                                name="message"
                                placeholder="Order Notes"
                                rows="6"
                              ></Field>
                              <ErrorMessage
                                name="message"
                                style={{ color: "red" }}
                                component="div"
                                className="error-message"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-5">
                        <div className="your-order-area">
                          <h3>Your order</h3>
                          <div className="your-order-wrap gray-bg-4">
                            <div className="your-order-product-info">
                              <div className="your-order-top">
                                <ul>
                                  <li>Product</li>
                                  <li>Total</li>
                                </ul>
                              </div>
                              <div className="your-order-middle">
                                <ul>
                                  {cartItems.map((cartItem, key) => {
                                    const discountedPrice = getDiscountPrice(
                                      cartItem.price,
                                      cartItem.discount
                                    );
                                    const finalProductPrice = (
                                      cartItem.price * currency.currencyRate
                                    ).toFixed(2);
                                    const finalDiscountedPrice = (
                                      discountedPrice * currency.currencyRate
                                    ).toFixed(2);

                                    discountedPrice != null
                                      ? (cartTotalPrice +=
                                          cartItem.rrp * cartItem.quantity)
                                      : (cartTotalPrice +=
                                          cartItem.rrp * cartItem.quantity);
                                    return (
                                      <li key={key}>
                                        <span className="order-middle-left">
                                          {cartItem.name} X {cartItem.quantity}
                                        </span>{" "}
                                        <span className="order-price">
                                          {discountedPrice !== null
                                            ? currency.currencySymbol +
                                              (
                                                cartItem.rrp * cartItem.quantity
                                              ).toFixed(2)
                                            : currency.currencySymbol +
                                              (
                                                cartItem.rrp * cartItem.quantity
                                              ).toFixed(2)}
                                        </span>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                              <div className="your-order-bottom">
                                <ul>
                                  <li className="your-order-shipping">
                                    Shipping
                                  </li>
                                  <li>{ShippingTotal.shippingFee}</li>
                                </ul>
                                <ul>
                                  <li className="your-order-shipping">
                                    Tax ({ShippingTotal?.tax * 100}%)
                                  </li>
                                  <li>
                                    {ShippingTotal?.currencySign}
                                    {cartTotalPrice
                                      ? (
                                          ShippingTotal?.tax * cartTotalPrice
                                        )?.toFixed(2)
                                      : 0}
                                  </li>
                                </ul>
                              </div>
                              <div className="your-order-total">
                                <ul>
                                  <li className="order-total">Total</li>
                                  <li>
                                    {currency.currencySymbol}
                                    {cartItems?.length > 0
                                      ? (
                                          Number(cartTotalPrice) +
                                          Number(
                                            ShippingTotal?.shippingFee
                                              ? ShippingTotal?.shippingFee
                                              : 0
                                          ) +
                                          Number(
                                            ShippingTotal?.tax
                                              ? ShippingTotal?.tax
                                              : 0
                                          ) *
                                            Number(cartTotalPrice)
                                        ).toFixed(2)
                                      : 0}
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="payment-method"></div>
                          </div>
                          <div className="place-order mt-25">
                            <button className="btn-hover" type="submit">
                              Place Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
