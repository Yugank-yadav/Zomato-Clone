import React, { useEffect, useState } from "react";
import axios from "axios";

import QuickMealTypes from "./QuickMealTypes";

export default function QuickSearch() {
  let [mealType, setMealType] = useState([]);

  let quickSearchData = async () => {
    let url = "http://localhost:5500/api/get-meal-types";

    try {
      let response = await axios.get(url);
      let { status, meal_type } = response.data;
      if (status) {
        setMealType([...meal_type]);
      } else {
        alert("MealType Not Found");
      }
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    quickSearchData();
  }, []);
  return (
    <>
      <section className="row justify-content-center m-0 mt-lg-5 mt-md-4 mt-0">
        <section className="col-lg-11 col-11 mt-3">
          <h3 className="fw-bold indexColor quickText">Quick Searches</h3>
          <p className="text-secondary quickText2">
            Discover restaurants by type of meal
          </p>
        </section>
        <section className="col-11">
          <section className="row py-2">
            <section className="col-12 px-0 d-flex flex-lg-row flex-md-row flex-column justify-content-between flex-wrap ">
              {mealType.map((meal) => {
                return <QuickMealTypes meal={meal} key={meal._id} />;
              })}
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
