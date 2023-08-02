import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { filterReducer } from "../../store/ticketSlice";
import "./filters.scss";
import Options from "../options/options";
import { setSelectedButton } from "../../utilities/setSelectedButton";
const Filters = () => {
  const dispatch = useDispatch();
  return (
    <div className="filters-wrapper">
      <Options />
      <div
        className="filters"
        onClick={(e) => {
          setSelectedButton(e);
        }}
      >
        <button
          className="filter"
          onClick={(e) => {
            dispatch(filterReducer("MIN_PRICE"));
          }}
        >
          Самый дешевый
        </button>
        <button
          className="filter"
          onClick={() => {
            dispatch(filterReducer("FASTEST"));
          }}
        >
          Самый быстрый
        </button>
        <button
          className="filter"
          onClick={() => {
            dispatch(filterReducer("OPTIMAL"));
          }}
        >
          Оптимальный
        </button>
      </div>
    </div>
  );
};

export default Filters;
