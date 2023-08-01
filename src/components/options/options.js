import React, { useEffect, useState } from "react";
import { Checkbox } from "antd";
import { useDispatch } from "react-redux";
import { switchFilterAll, setValueFilterTicket } from "../../store/ticketSlice";
import "./options.scss";

const Options = () => {
  const [checkedAllTicket, setCheckedAllTicket] = useState(true);
  const [checkedZero, setCheckedZero] = useState(true);
  const [checkedOne, setCheckedOne] = useState(true);
  const [checkedTwo, setCheckedTwo] = useState(true);
  const [checkedThree, setCheckedThree] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (checkedZero && checkedOne && checkedTwo && checkedThree) {
      setCheckedAllTicket(true);
    } else {
      setCheckedAllTicket(false);
    }
  }, [checkedZero, checkedOne, checkedTwo, checkedThree]);

  useEffect(() => {
    dispatch(switchFilterAll(checkedAllTicket));
  }, [dispatch, checkedAllTicket]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedZero, filterValue: 0 }));
  }, [checkedZero, dispatch]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedOne, filterValue: 1 }));
  }, [checkedOne, dispatch]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedTwo, filterValue: 2 }));
  }, [checkedTwo, dispatch]);

  useEffect(() => {
    dispatch(setValueFilterTicket({ isChecked: checkedThree, filterValue: 3 }));
  }, [checkedThree, dispatch]);

  const handleCheckboxChange = (event) => {
    switch (event.target.name) {
      case "Zero":
        setCheckedZero(event.target.checked);
        break;

      case "One":
        setCheckedOne(event.target.checked);
        break;

      case "Two":
        setCheckedTwo(event.target.checked);
        break;

      case "Three":
        setCheckedThree(event.target.checked);
        break;

      default:
        setCheckedAllTicket(event.target.checked);
        setCheckedZero(event.target.checked);
        setCheckedOne(event.target.checked);
        setCheckedTwo(event.target.checked);
        setCheckedThree(event.target.checked);
    }
  };

  return (
    <div className="options">
      <h2 className="options-title">Количество пересадок</h2>
      <Checkbox
        className="checkbox"
        name={"Все"}
        checked={checkedAllTicket}
        onChange={(event) => handleCheckboxChange(event)}
      >
        Все
      </Checkbox>
      <Checkbox
        className="checkbox"
        name="Zero"
        checked={checkedZero}
        onChange={(event) => handleCheckboxChange(event)}
      >
        Без пересадок
      </Checkbox>
      <Checkbox
        className="checkbox"
        name="One"
        checked={checkedOne}
        onChange={(event) => handleCheckboxChange(event)}
      >
        1 пересадка
      </Checkbox>
      <Checkbox
        className="checkbox"
        name="Two"
        checked={checkedTwo}
        onChange={(event) => handleCheckboxChange(event)}
      >
        2 пересадки
      </Checkbox>
      <Checkbox
        className="checkbox"
        name="Three"
        checked={checkedThree}
        onChange={(event) => handleCheckboxChange(event)}
      >
        3 пересадки
      </Checkbox>
    </div>
  );
};

export default Options;
