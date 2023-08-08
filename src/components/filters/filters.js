import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { Radio } from "antd";

import { filterReducer } from "../../store/ticketSlice";
import "./filters.scss";
import Options from "../options/options";

const Filters = () => {
  const dispatch = useDispatch();

  const [radioValue, setRadioValue] = useState(1);
  const onChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div className="filters-wrapper">
      <Options />
      <Radio.Group className="filters" onChange={onChange} value={radioValue}>
        <Radio.Button
          className="filter"
          value={1}
          onClick={() => {
            dispatch(filterReducer("MIN_PRICE"));
          }}
        >
          Самый дешевый
        </Radio.Button>
        <Radio.Button
          className="filter"
          value={2}
          onClick={() => {
            dispatch(filterReducer("FASTEST"));
          }}
        >
          Самый быстрый
        </Radio.Button>
        <Radio.Button
          className="filter"
          value={3}
          onClick={() => {
            dispatch(filterReducer("OPTIMAL"));
          }}
        >
          Оптимальный
        </Radio.Button>
      </Radio.Group>
    </div>
  );
};

export default Filters;
