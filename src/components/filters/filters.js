import React from "react";
import { useDispatch } from "react-redux";
import { filterReducer } from "../../store/ticketSlice";
import "./filters.scss";
import Options from "../options/options";
const Filters = () => {
  const dispatch = useDispatch();
  return (
    <div className="filters-wrapper">
      <Options />
      <div className="filters">
        <button
          className="filter"
          onClick={() => {
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
