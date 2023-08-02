import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import "./tickets.scss";
import { getTickets, getSearchID } from "../../store/asyncThunk";
import {
  getHours,
  getMinutes,
  getDurationHours,
  getDurationMinutes,
  getTime,
} from "./../../utilities/calcTime";
import { splitString } from "../../utilities/splitString";
import filterTicketByTransfer from "../../utilities/filterTicketByTransfer";
import uniqueKey from "../../utilities/uniqueKey";
const Tickets = () => {
  const [ticketCounter, setTicketCounter] = useState(5);
  const tickets = useSelector((state) => state.tickets);
  const showAllTickets = useSelector((state) => state.showAllTickets);
  const valueFilterTransfer = useSelector((state) => state.valueFilterTransfer);
  const ticketsID = useSelector((state) => state.searchID);
  const error500 = useSelector((state) => state.skipError500);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);
  const ticketsFilter = tickets.filter((item) =>
    filterTicketByTransfer(item, showAllTickets, valueFilterTransfer)
  );
  const stop = useSelector((state) => state.stop);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!ticketsID) {
      dispatch(getSearchID());
    }
  }, [dispatch, ticketsID]);
  useEffect(() => {
    if (!stop && ticketsID) {
      dispatch(getTickets());
    }
  }, [dispatch, stop, tickets, ticketsID, error500]);
  if (tickets.length !== 0) {
    return (
      <div className="tickets-wrapper">
        {loading ? <Spin className="loading" size="large"></Spin> : null}

        {ticketsFilter.slice(0, ticketCounter).map((item) => {
          return (
            <div className="ticket" key={uniqueKey()}>
              <div className="ticket-header">
                <p className="ticket-price">{splitString(item.price)} ₽</p>
                <img
                  alt="logo"
                  src={`https://pics.avs.io/99/36/${item.carrier}.png`}
                  className="ticket-logo"
                ></img>
              </div>
              {item.segments.map((segment) => (
                <div className="ticket-inner">
                  <div className="ticket-inner-item">
                    <div className="ticket-inner-item-column">
                      <span className="ticket-inner-suptitle">
                        {segment.origin} – {segment.destination}
                      </span>
                      <span className="ticket-inner-title">
                        {getHours(segment.date)}:{getMinutes(segment.date)} –
                        {getTime(
                          segment,
                          getDurationHours(segment.duration),
                          getDurationMinutes(segment.duration)
                        )}
                      </span>
                    </div>
                    <div className="ticket-inner-item-column">
                      <span className="ticket-inner-suptitle">В пути</span>
                      <span className="ticket-inner-title">
                        {getDurationHours(segment.duration)}ч{" "}
                        {getDurationMinutes(segment.duration)}м
                      </span>
                    </div>
                    <div className="ticket-inner-item-column">
                      <span className="ticket-inner-suptitle">
                        {segment.stops.length > 0 && segment.stops.length < 2
                          ? `${segment.stops.length} пересадка`
                          : segment.stops.length > 1
                          ? `${segment.stops.length} пересадки`
                          : "Без пересадок"}
                      </span>
                      <span className="ticket-inner-title">
                        {segment.stops.join(" ")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        {ticketsFilter.length !== 0 ? (
          <button
            className="btn-show-more"
            onClick={() => {
              setTicketCounter(ticketCounter + 5);
            }}
          >
            Показать еще 5
          </button>
        ) : null}

        {ticketsFilter.length === 0 && loading === false && (
          <div className="not-found">
            <div className="not-found-text">
              Рейсов, подходящих под заданные фильтры, не найдено
            </div>
          </div>
        )}
        {error === true ? (
          <div className="error">
            <div className="error-inner">
              <div className="error-text">Произошла ошибка</div>
              <button
                className="error-button"
                onClick={() => window.location.reload()}
              >
                Попробовать еще раз
              </button>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};
export default Tickets;
