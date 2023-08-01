import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import "./tickets.scss";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, getSearchID } from "../../store/asyncThunk";
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

  const time = (item, hours, minutes) => {
    let resultHours = (item.segment1.date.hours + hours) % 24;
    let resultMinutes = item.segment1.date.minutes + minutes;
    if (resultMinutes >= 60) {
      resultHours += 1;
    }
    return `${resultHours}:${resultMinutes % 60}`;
  };
  if (ticketsFilter !== undefined) {
    return (
      <div className="tickets-wrapper">
        {loading ? <Spin className="loading" size="large"></Spin> : null}

        {ticketsFilter.slice(0, ticketCounter).map((item) => {
          return (
            <div className="ticket" key={uniqueKey()}>
              <div className="ticket-header">
                <p className="ticket-price">{item.price} P</p>
                <img
                  alt="logo"
                  src={`https://pics.avs.io/99/36/${item.logo}.png`}
                  className="ticket-logo"
                >
                  {}
                </img>
              </div>
              <div className="ticket-inner">
                <div className="ticket-inner-item">
                  <div className="ticket-inner-item-column">
                    <span className="ticket-inner-suptitle">
                      {item.segment1.origin} – {item.segment1.destination}
                    </span>
                    <span className="ticket-inner-title">
                      {item.segment1.date.hours}:{item.segment1.date.minutes} –
                      {time(
                        item,
                        item.segment1.durationHours,
                        item.segment1.durationMinutes
                      )}
                    </span>
                  </div>
                  <div className="ticket-inner-item-column">
                    <span className="ticket-inner-suptitle">В пути</span>
                    <span className="ticket-inner-title">
                      {item.segment1.durationHours}ч{" "}
                      {item.segment1.durationMinutes}м
                    </span>
                  </div>
                  <div className="ticket-inner-item-column">
                    <span className="ticket-inner-suptitle">
                      {item.segment1.stops.count > 0 &&
                      item.segment1.stops.count < 2
                        ? `${item.segment1.stops.count} пересадка`
                        : item.segment1.stops.count > 1
                        ? `${item.segment1.stops.count} пересадки`
                        : "Без пересадок"}
                    </span>
                    <span className="ticket-inner-title">
                      {item.segment1.stops.name}
                    </span>
                  </div>
                </div>
                <div className="ticket-inner-item">
                  <div className="ticket-inner-item-column">
                    <span className="ticket-inner-suptitle">
                      {item.segment2.origin} – {item.segment2.destination}
                    </span>
                    <span className="ticket-inner-title">
                      {item.segment2.date.hours}:{item.segment2.date.minutes} –
                      {time(
                        item,
                        item.segment2.durationHours,
                        item.segment2.durationMinutes
                      )}
                    </span>
                  </div>
                  <div className="ticket-inner-item-column">
                    <span className="ticket-inner-suptitle">В пути</span>
                    <span className="ticket-inner-title">
                      {item.segment2.durationHours}ч{" "}
                      {item.segment2.durationMinutes}м
                    </span>
                  </div>
                  <div className="ticket-inner-item-column">
                    <span className="ticket-inner-suptitle">
                      {item.segment2.stops.count > 0 &&
                      item.segment2.stops.count < 2
                        ? `${item.segment2.stops.count} пересадка`
                        : item.segment2.stops.count > 1
                        ? `${item.segment2.stops.count} пересадки`
                        : "Без пересадок"}
                    </span>
                    <span className="ticket-inner-title">
                      {item.segment2.stops.name}
                    </span>
                  </div>
                </div>
              </div>
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
        {loading === false && ticketsFilter.length === 0 && error === false && (
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
