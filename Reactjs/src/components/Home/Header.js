import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Nav/Navbar";

export default function Header() {
  let locationRef = useRef();
  let [location, setLocation] = useState([]);
  let [selectLocation, setSelectLocation] = useState(null);
  let [resDisable, setResDisable] = useState(true);
  let [restaurantList, setRestaurantList] = useState([]);

  //navigateToRes
  const navigate = useNavigate();
  const getResOverview = (id) => {
    // console.log(id);
    navigate("/restaurant-overview/" + id);
  };

  //Fetching data from backend
  let getLocationList = async (event) => {
    let city = event.target.value;

    if (city === "" || city.length < 2) {
      setSelectLocation(null);
      setResDisable(true);
      // console.log("Change");
      setLocation([]);

      return false;
    }
    let url =
      "http://localhost:5500/api/get-location-by-city-name?city=" + city;

    try {
      let response = await axios.get(url);
      let { location } = response.data;
      setLocation([...location]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let selectLoc = (location) => {
    location = JSON.parse(location);
    locationRef.current.value = `${location.name}, ${location.city}`;
    setSelectLocation({ ...location });
    setResDisable(false);
    setLocation([]);
  };
  let getResList = async (event) => {
    let restaurant = event.target.value;

    if (restaurant === "" || restaurant.length < 2) {
      setRestaurantList([]);

      return false;
    }
    let url = `http://localhost:5500/api/get-restaurant-by-location-id?lid=${selectLocation.location_id}&rest=${restaurant}`;

    try {
      let response = await axios.get(url);
      let { result } = response.data;
      setRestaurantList([...result]);
    } catch (error) {
      alert(error);
      console.log(error);
    }
  };
  let goToRestaurant = (id) => {
    navigate("/restaurant/" + id);
  };

  return (
    <>
      <section>
        <div className="bg__image ">
          <Navbar bg="" login="" />
          {/* <!-- =====LOGO======= --> */}
          <div className="d-lg-flex justify-content-center d-md-flex d-none mainE">
            <h1 className="mt-4 mb-lg-0 mb-2 logo d-flex p-0 justify-content-center align-items-center fw-bold bg-white rounded-circle">
              e!
            </h1>
          </div>

          {/* <!-- ======TITLE====== --> */}
          <p className="text-sm-center d-flex justify-content-center header__text text-white fw-bold text-lg-center h2 text-center mb-lg-4 mb-1 mt-lg-3 p-1">
            Find the best restaurants, cafés, and bars
          </p>

          {/* <!-- ======SEARCh Location====== --> */}

          <div className="row d-flex justify-content-center">
            <div className="col-lg-6 col-md-7 col-10  ">
              <div className="row d-flex mb-lg-5 position-absolute m-0">
                <div className="col-lg-5 col-11 left-search__main ms-lg-5 position-relative">
                  <input
                    list="locations"
                    type="text"
                    className="form-control  p-3 "
                    placeholder="Please type a location"
                    onChange={getLocationList}
                    ref={locationRef}
                  />
                  <div className="list-group position-relative testingZ">
                    {location.map((location) => {
                      return (
                        <li
                          href="#"
                          className="list-group-item list-group-item-action list-group-item mb-0 position-relative cursor-pointer "
                          key={location._id}
                          onClick={() =>
                            selectLoc(`${JSON.stringify(location)}`)
                          }
                        >
                          {location.name}, {location.city}
                        </li>
                      );
                    })}
                  </div>
                </div>
                {/* // <!-- ======(Restaurant)====== --> */}
                <div className="col-lg-6 mt-2 mt-lg-0 col-11 ">
                  <i
                    className="bx bx-search-alt-2 search__logo ms-3 position-absolute text-muted fs-4"
                    aria-hidden="true"
                  ></i>
                  <input
                    type="text"
                    className="form-control p-3 ps-5 ms-1 "
                    placeholder="Search for Restaurants"
                    onClick={getResList}
                    onChange={getResList}
                    disabled={resDisable}
                  />
                  <div className="list-group position-relative cursor-pointer ms-1 Zindex">
                    {restaurantList.map((res) => {
                      return (
                        <li
                          className="list-group-item"
                          key={res._id}
                          onClick={() => getResOverview(res._id)}
                        >
                          <div className="rest-search-auto-complete d-flex ">
                            <img
                              src={`./images/${res.image}`}
                              className="suggestionImg"
                              alt="idli"
                            />
                            <div className="d-flex flex-column ms-3 indexColor">
                              <p className="mb-0 fw-bold">{res.name}</p>
                              <span className="small text-muted ">
                                {res.locality} , {res.city}
                              </span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
