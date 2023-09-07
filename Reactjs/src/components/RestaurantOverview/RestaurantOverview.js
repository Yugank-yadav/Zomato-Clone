import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Swal from "sweetalert2";

//components
import Navbar from "../Nav/Navbar";

export default function RestaurantOverview({ bg }) {
  //states
  let [restDetails, setRestDetails] = useState({});
  let [Contact, setContact] = useState(false);
  let [menu, setMenu] = useState([]);
  let [subTotal, setSubTotal] = useState(0);

  //constants
  const params = useParams();
  const emailRef = useRef();
  // const addressRef = useRef();
  // const nameRef = useRef();

  //Payment
  let loadScript = async () => {
    const scriptElement = document.createElement("script");
    scriptElement.src = "https://checkout.razorpay.com/v1/checkout.js";
    scriptElement.onload = () => {
      return true;
    };
    scriptElement.onerror = () => {
      return false;
    };
    document.body.appendChild(scriptElement);
  };

  let makePayment = async () => {
    let isLoaded = await loadScript();
    if (isLoaded === false) {
      alert("Unable load payment sdk");
      return false;
    }

    let URL = "http://localhost:5500/api/payment";

    let sendData = {
      amount: subTotal,
      email: emailRef.current.value,
    };

    let { data } = await axios.post(URL, sendData);
    let { order } = data;
    // console.log(data);
    var options = {
      key: "rzp_test_5VkdRZyWeX3Ii2",
      amount: order.amount,
      currency: "INR",
      name: "Zomato Clone Payment",
      description: "Food Payment",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/2/2d/Zomato_Logo.jpg",
      order_id: order.id,
      handler: async function (response) {
        let URL = "http://localhost:5500/api/callback";
        let sendData = {
          payment_id: response.razorpay_payment_id,
          order_id: response.razorpay_order_id,
          signature: response.razorpay_signature,
        };

        let { data } = await axios.post(URL, sendData);
        if (data.status === true) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Order Successful!",
            showConfirmButton: false,
            timer: 2000,
          }).then(() => window.location.assign("/"));
        } else {
          alert("payment files, try again.");
        }
      },
      prefill: {
        name: "Yugank",
        email: "yugank@gmail.com",
        contact: "9999999999",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  let getRestDetails = async () => {
    let URL = "http://localhost:5500/api/get-restaurant-by-id/" + params.id;
    try {
      let response = await axios.get(URL);

      let { status, result } = response.data;

      // console.log(result);
      if (status === true) {
        setRestDetails({ ...result });
      } else {
        setRestDetails({});
      }
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  useEffect(() => {
    getRestDetails();
  }, []);

  let getMenuData = async () => {
    let URL = "http://localhost:5500/api/get-menu-item/" + params.id;

    try {
      let response = await axios.get(URL);
      let { status, menu_items } = response.data;
      // console.log(response.data);
      if (status) {
        setMenu([...menu_items]);
      } else {
        alert("Sorry,can't find any menu for this");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getMenuData();
  }, []);

  useEffect(() => {
    let total = menu.reduce((pV, cV) => {
      return pV + cV?.price * cV.qty;
    }, 0); //why a zero here?
    setSubTotal(total);
  }, [menu]);

  //for Count increase in menuitems

  let inc = (index) => {
    let _menu = [...menu];
    _menu[index].qty += 1;
    setMenu(_menu);
  };
  let dec = (index) => {
    let _menu = [...menu];
    _menu[index].qty -= 1;
    setMenu(_menu);
  };
  return (
    <>
      <Navbar bg="bg-danger" />
      <div className="container-fluid d-flex justify-content-center row flex-column ">
        <div className="col-lg-10 col-md-10 col-10 marginContainer  ">
          <div className="row">
            <div className="col-12 mt-lg-5 mt-md-5 mt-3 ">
              <div className="restOverviewImgContainer ">
                <img
                  src={"/images/" + restDetails.image}
                  alt="Restaurant"
                  className="resOverviewImg img-fluid"
                />
                <button
                  className="btn position-absolute btn-outline-light resOverviewBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#slideshow"
                >
                  Click to See Image Gallery
                </button>
                {/* --------------------------------------- */}
                {/* {Image enlarge MODAL} */}
                {/* --------------------------------------- */}

                {/* <!-- Modal --> */}
                <div
                  className="modal fade "
                  id="slideshow"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog modal-fullscreen">
                    <div className="modal-content">
                      <div className="d-flex justify-content-end p-2 bg-black text-white">
                        <button
                          type="button"
                          className="btn-close white bg-white"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body bg-black">
                        <Carousel
                          showThumbs={false}
                          showStatus={false}
                          showIndicators={false}
                          useKeyboardArrows={true}
                          className="bg-black "
                        >
                          {restDetails?.thumb?.map((value, index) => {
                            return (
                              <div key={index}>
                                <img
                                  src={"/images/" + value}
                                  alt="restaurant"
                                  className="widthMod rounded-4 img-fluid"
                                />
                              </div>
                            );
                          })}
                        </Carousel>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --------------------------------------- */}
                {/* {Image enlarge MODAL ENDS} */}
                {/* --------------------------------------- */}
              </div>

              {/* {MODAL STARTS} */}
              <h2 className="mt-3 fw-bold indexColor"> {restDetails.name}</h2>
              <div className="d-flex justify-content-end orderDiv">
                {/* {MODAL1 STARTS} */}
                <div
                  className="modal fade "
                  id="exampleModalToggle"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel"
                  tabIndex="-1"
                >
                  <div className="modal-dialog modal-dialog-centered  ">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5
                          className="modal-title fw-bolder indexColor"
                          id="exampleModalToggleLabel"
                        >
                          {restDetails.name}
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        {menu.map((item, index) => {
                          return (
                            <div className="row" key={index}>
                              <div className="col-8">
                                {/* <img src="/images/vegetarian.png" alt="" /> */}
                                <p className="mb-1 fw-bold indexColor">
                                  {item.name}
                                </p>
                                <p className="mb-0 fw-bold indexColor">
                                  &#8377;{item.price}
                                </p>
                                <p>{item.description}</p>
                              </div>
                              <div className="col-4">
                                <div className="background-clr  d-flex justify-content-end position-relative mt-4 ">
                                  <img src={"/images/" + item.image} alt="" style={{height:"120px", width:"120px", borderRadius:"10px"}}/>
                                  {item.qty === 0 ? (
                                    <button
                                      className="btn btn-sm btnAdd position-absolute bg-white border-dark fourthColor "
                                      onClick={() => inc(index)}
                                    >
                                      Add
                                    </button>
                                  ) : (
                                    <div className=" btnAdd position-absolute bg-white border border-dark d-flex align-items-center fourthColor ">
                                      <span
                                        className="me-2  cursor-pointer  "
                                        onClick={() => dec(index)}
                                      >
                                        -
                                      </span>
                                      <span>{item.qty}</span>
                                      <span
                                        className="ms-2 cursor-pointer"
                                        onClick={() => inc(index)}
                                      >
                                        +
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <hr className="mt-4" />
                            </div>
                          );
                        })}
                      </div>
                      {subTotal === 0 ? null : (
                        <div className="d-flex justify-content-between p-4 ">
                          <div className="mt-2">
                            <span className="me-3">Subtotal </span>
                            <span>&#8377;{subTotal}</span>
                          </div>
                          <button
                            className="btn p-2 secondColor"
                            data-bs-target="#exampleModalToggle2"
                            data-bs-toggle="modal"
                          >
                            Pay Now
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* {MODAL1 ENDS} */}

                {/* {MODAL2 STARTS} */}

                <div
                  className="modal fade"
                  id="exampleModalToggle2"
                  aria-hidden="true"
                  aria-labelledby="exampleModalToggleLabel2"
                  tabIndex="-1"
                >
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h4
                          className="modal-title fw-bold"
                          id="exampleModalToggleLabel2"
                        >
                          {restDetails.name}
                        </h4>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            // ref={nameRef}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter your Name"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput1"
                            className="form-label"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            ref={emailRef}
                            className="form-control"
                            id="exampleFormControlInput1"
                            placeholder="Enter Email"
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlTextarea1"
                            className="form-label"
                          >
                            Address
                          </label>
                          <textarea
                            className="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            // ref={addressRef}
                            placeholder="Enter Your Address"
                            required
                          ></textarea>
                        </div>
                      </div>
                      <div className="modal-footer">
                        <button
                          className="btn btn-primary secondColor"
                          onClick={makePayment}
                        >
                          Proceed
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  className="btn btnOrder  "
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                >
                  Place the order
                </a>
              </div>

              {/* {MODAL ENDS} */}

              <div className="d-flex">
                <span
                  className={
                    Contact === true
                      ? "indexColor me-4 fw-medium cursor-pointer"
                      : "indexColor margin-check cursor-pointer "
                  }
                  onClick={() => setContact(false)}
                >
                  Overview
                </span>
                <span
                  className={
                    Contact === false
                      ? "indexColor ms-4 fw-medium cursor-pointer"
                      : " indexColor margin-check cursor-pointer "
                  }
                  onClick={() => setContact(true)}
                >
                  Contact
                </span>
              </div>
              <hr />
              {Contact === false ? (
                <div className="mt-4">
                  <h5 className="indexColor fw-medium mb-2 ">
                    {" "}
                    About this Place
                  </h5>
                  <p className="indexColor mt-5 mb-3 fw-bold"> Cuisine</p>
                  <p className="indexColor mb-4">
                    {restDetails?.cuisine
                      ?.reduce((pV, cV) => pV + ", " + cV.name, " ")
                      .substring(2)}
                  </p>
                  <p className="indexColor mt-5 mb-3 fw-bold">Average Cost</p>
                  <p className="indexColor mb-4">
                    &#8377; {restDetails.min_price} for two people(approx.)
                  </p>
                </div>
              ) : (
                <div className="mt-4">
                  <p className="indexColor mt-3 mb-2 fw-bold"> Phone Number</p>
                  <p className="indexColor mb-2 p-no">
                    +91{restDetails.contact_number}
                  </p>
                  <p className="indexColor mt-5 mb-3 fw-bold">
                    {restDetails.name}
                  </p>
                  <p className="indexColor mb-4">
                    {restDetails.locality},{restDetails.city}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
