import React from "react";
import { useNavigate } from "react-router-dom";

export default function SearchResult({ searchList }) {
  const navigate = useNavigate();
  const getRestOverview = (id) => {
    navigate("/restaurant-overview/" + id);
  };
  return (
    <>
      {searchList.map((item, index) => {
        return (
          <div
            className="box p-2 shadow border cursor-pointer mb-4 searchResultFilterBox"
            onClick={() => getRestOverview(item._id)}
            key={index}
          >
            <div className="d-flex flex-row">
              <img
                src={"./images/" + item.image}
                className="image cursor-pointer"
                alt="breakfast"
              />
              <div className="cursor-pointer">
                <h2 className=" fw-bold mx-3 mb-2 mt-3   indexColor restNameText">
                  {item.name}
                </h2>
                <div className="d-flex flex-column mx-3 ">
                  <div className="indexColor fw-bold ratingText ">
                    <p className="my-lg-2 my-1">
                      Rating: {item.aggregate_rating}
                    </p>
                  </div>
                  <div className="thirdColor localityCity">
                    <p>
                      {item.locality},{item.city}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hrline">
              <hr />
            </div>
            <div className="d-flex flex-row ">
              <div className="d-flex flex-column ms-3 fw-bold cuisine">
                CUISINES: <br />
                COST FOR TWO:
              </div>
              <div className="d-flex flex-column ms-3 fw-bold indexColor ms-5 bakery ">
                {item?.cuisine
                  ?.reduce((pV, cV) => pV + ", " + cV.name, " ")
                  .substring(2)}{" "}
                <br />
                &#8377; {item.min_price}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
