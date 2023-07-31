import { getTicketsDB } from "../components/ticketsDB";
const defaultValue = {
  NO_TRANSFER: true,
  ONE_TRANSFER: true,
  TWO_TRANSFER: true,
  THREE_TRANSFER: true,
};

// ПЕРВЫЙ РЕДЮСЕР КОТОРЫЙ ПО СУТИ ВОЗВРАЩАЕТ ТО ЧТО ПОЛУЧАЕТ
export const optionsReducer = (state = defaultValue, action = "ALL") => {
  switch (action.type) {
    case "ALL":
      if (action.checked) {
        return defaultValue;
      } else {
        return {
          NO_TRANSFER: false,
          ONE_TRANSFER: false,
          TWO_TRANSFER: false,
          THREE_TRANSFER: false,
        };
      }

    case "NO_TRANSFER":
      return { ...state, NO_TRANSFER: !state.NO_TRANSFER };
    // state.filter(
    //   (item) =>
    //     item.segment1.stops.count === 0 && item.segment2.stops.count === 0
    // );
    case "ONE_TRANSFER":
      return { ...state, ONE_TRANSFER: !state.ONE_TRANSFER };
    case "TWO_TRANSFER":
      return { ...state, TWO_TRANSFER: !state.TWO_TRANSFER };
    case "THREE_TRANSFER":
      return { ...state, THREE_TRANSFER: !state.THREE_TRANSFER };
    default:
      return state;
  }
};
