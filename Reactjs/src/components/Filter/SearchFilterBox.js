import React from "react";

export default function SearchFilterBox({ location, filterData }) {
  return (
    <>
      <div
        className="shadow p-4 filter  panel-collapse collapse show"
        id="collapse1"
      >
        <p className="fw-bold fs-5 my-2 indexColor">Filters</p>
        <label htmlFor="location" className="my-2">
          Select a Location
        </label>
        <br />
        <div>
          <select
            className="form-select form-select-sm selectLocationDropdown"
            onChange={(e) => filterData(e, "location")}
          >
            <option className="" value="">
              Select a Location
            </option>
            {location.map((loc, index) => {
              return (
                <option key={index} value={loc.location_id}>
                  {loc.name}, {loc.city}
                </option>
              );
            })}
          </select>
        </div>
        {/* ////////////////////////////////////////// */}
        {/* Cuisine*/}
        {/* ////////////////////////////////////////// */}
        <p className="fw-bold my-3 indexColor">Cuisine</p>
        <input
          type="checkbox"
          name="cuisine"
          id="north"
          value="1"
          onChange={(event) => filterData(event, "cuisine")}
        />
        <label htmlFor="north" className="my-1 thirdColor ms-1">
          North Indian
        </label>
        <br />
        <input
          type="checkbox"
          name="cuisine"
          id="north"
          value="2"
          onChange={(event) => filterData(event, "cuisine")}
        />
        <label htmlFor="north" className="my-1 thirdColor ms-1">
          South Indian
        </label>
        <br />
        <input
          type="checkbox"
          name="cuisine"
          id="north"
          value="Chinese"
          onChange={(event) => filterData(event, "cuisine")}
        />
        <label htmlFor="north" className="my-1 thirdColor ms-1">
          Chinese
        </label>
        <br />
        <input
          type="checkbox"
          name="cuisine"
          id="north"
          value="3"
          onChange={(event) => filterData(event, "cuisine")}
        />
        <label htmlFor="north" className="my-1 thirdColor ms-1">
          Fast Food
        </label>
        <br />
        <input
          type="checkbox"
          name="cuisine"
          id="north"
          value="4"
          onChange={(event) => filterData(event, "cuisine")}
        />
        <label htmlFor="north" className="my-1 thirdColor ms-1">
          Street Food
        </label>
        {/* ////////////////////////////////////////// */}
        {/* COST FOR TWO */}
        {/* ////////////////////////////////////////// */}
        <p className="fw-bold my-4 indexColor">Cost for Two</p>
        <input
          type="radio"
          name="cost"
          value="0-500"
          id="0-500"
          onChange={(event) => filterData(event, "cost")}
        />
        <label className="my-1 thirdColor ms-1">Less than &#8377; 500</label>
        <br />
        <input
          type="radio"
          name="cost"
          value="500-1000"
          id="500-1000"
          onChange={(event) => filterData(event, "cost")}
        />
        <label className="my-1 thirdColor ms-1">
          &#8377; 500 to &#8377; 1000
        </label>
        <br />
        <input
          type="radio"
          id="1000-1500"
          name="cost"
          value="1000-1500"
          onChange={(event) => filterData(event, "cost")}
        />
        <label className="my-1 thirdColor ms-1">
          &#8377;1000 to &#8377; 1500
        </label>
        <br />
        <input
          type="radio"
          name="cost"
          value="1500-2000"
          id="1500-2000"
          onChange={(event) => filterData(event, "cost")}
        />
        <label className="my-1 thirdColor ms-1">
          &#8377;1500 to &#8377; 2000
        </label>
        <br />
        <input
          type="radio"
          name="cost"
          value="2000-3000"
          id="2000-3000"
          onChange={(event) => filterData(event, "cost")}
        />
        <label htmlFor="north" className="my-1 thirdColor ms-1">
          &#8377;2000
        </label>
        {/* ////////////////////////////////////////// */}
        {/* SORT*/}
        {/* ////////////////////////////////////////// */}
        <p className="fw-bold my-4 indexColor">Sort</p>
        <input
          type="radio"
          name="sort"
          id="low-high"
          value="1"
          onChange={(event) => filterData(event, "sort")}
        />
        <label htmlFor="low-high" className="my-1 thirdColor ms-1">
          Price low to high
        </label>
        <br />
        <input
          type="radio"
          name="sort"
          id="high-low"
          value="-1"
          onChange={(event) => filterData(event, "sort")}
        />
        <label htmlFor="high-low" className="my-1 thirdColor ms-1">
          Price high to low
        </label>
        <br />
      </div>
    </>
  );
}
