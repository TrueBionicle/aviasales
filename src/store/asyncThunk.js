import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import getCookie from "../utilities/getCookie";

export const getSearchID = createAsyncThunk(
  "tickets/getSearchID",
  async function () {
    const searchURL = "https://aviasales-test-api.kata.academy/search";
    const searchID = await axios.get(searchURL).catch((error) => {
      throw new Error(error.request.status);
    });

    return searchID.data.searchId;
  }
);
export const getTickets = createAsyncThunk(
  "tickets/getTickets",
  async function () {
    const ticketURL = `https://aviasales-test-api.kata.academy/tickets`;
    const getTickets = await axios
      .get(`${ticketURL}?searchId=${getCookie("searchId")}`)
      .then((result) => {
        return result.data;
      })
      .catch((error) => {
        throw new Error(error.request.status);
      });
    return getTickets;
  }
);
