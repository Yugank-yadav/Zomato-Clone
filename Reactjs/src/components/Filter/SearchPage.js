import React, { useEffect, useState } from "react";
import SearchFilterBox from "./SearchFilterBox";
import SearchResult from "./SearchResult";
import FilterPagination from "./FilterPagination";
import Navbar from "../Nav/Navbar";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function SearchPage() {
  let [searchList, setSearchList] = useState([]);
  let [location, setLocation] = useState([]);
  let [searchParams] = useSearchParams();
  let [filterObj, setFilterObj] = useState({});
  let [pageCount, setPageCount] = useState(0);

  let getFilterData = async (_filterObj) => {
    _filterObj = { ..._filterObj };
    let URL = "http://localhost:5500/api/filter";

    if (searchParams.get("meal_type")) {
      _filterObj["mealtype"] = searchParams.get("meal_type");
    }
    try {
      let response = await axios.post(URL, _filterObj);
      let { result, pageCount } = response?.data;
      setSearchList(...[result]);
      setPageCount(pageCount);
    } catch (error) {
      alert(error);
    }
  };
  // useEffect(() => {
  //   getFilterData();
  // }, []);

  let getLocationDropdownData = async () => {
    try {
      let URL = "http://localhost:5500/api/get-location";
      let response = await axios.get(URL);
      let { status, location } = response.data;
      if (status) {
        setLocation([...location]);
      } else {
        alert("Looks like Input is missing");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getLocationDropdownData();
  }, []);

  //SwitchStatements
  let filterData = (event, option) => {
    let { value } = event.target;
    let _filterObj = {};
    switch (option) {
      case "location":
        _filterObj["location"] = value;
        break;

      case "sort":
        _filterObj["sort"] = value;
        break;

      case "cuisine":
        let checked = event.target.checked;
        // console.log(checked);

        let cuisine =
          filterObj.cuisine == undefined ? [] : [...filterObj.cuisine];
        if (checked) {
          let isAvailable = cuisine.includes(Number(value));
          if (isAvailable === false) cuisine.push(Number(value));
        } else {
          let position = cuisine.indexOf(Number(value));
          cuisine.splice(position, 1);
        }
        if (cuisine.length > 0) {
          _filterObj["cuisine"] = cuisine;
        }

        break;

      case "cost":
        let cost = value.split("-");
        _filterObj["lcost"] = cost[0];
        _filterObj["hcost"] = cost[1];
        break;
      case "page":
        _filterObj["page"] = value;
        break;
      default:
        break;
    }
    setFilterObj({ ...filterObj, ..._filterObj });
    // console.log(filterObj);
  };
  useEffect(() => {
    getFilterData(filterObj);
  }, [filterObj]);

  return (
    <>
      <Navbar bg="bg-danger" />
      <div className="container-fluid ">
        <div className="row test">
          <div className="col-lg-11 col-10 ms-lg-5 ms-2 ps-0">
            <p className="fs-lg-1 fs-4 fw-bolder mx-lg-5 mx-4 my-4 indexColor">
              {`Best Places in this Area`}
            </p>

            <div className="d-flex mx-lg-5 justify-content-between flex-lg-row flex-column">
              <SearchFilterBox location={location} filterData={filterData} />
              <div>
                <SearchResult searchList={searchList} />
                <FilterPagination
                  filterData={filterData}
                  pageCount={pageCount}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
