import TicketsDB from "./components/ticketsDB";
import { useSelector } from "react-redux";

const reducer = (state = "", action) => {
  switch (action.type) {
    case "MIN_PRICE":
      return "minPrice";
    case "FASTES":
      return "fastes";
    case "OPTIMAL":
      return "optimal";
    case "ALL":
      return "all";
    case "NO_TRANSFER":
      return "no transfer";
    case "ONE_TRANSFER":
      return "one transfer";
    case "TWO_TRANSFER":
      return "two transfer";
    case "THREE_TRANSFER":
      return "three transfer";
    default:
      return state;
  }
};
export default reducer;
