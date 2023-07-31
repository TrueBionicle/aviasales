import axios from "axios";

const getSearchID = async () => {
  const searchURL = "https://aviasales-test-api.kata.academy/search";
  const searchID = await axios.get(searchURL);
  return searchID.data.searchId;
};

export const getTickets = async () => {
  const ticketURL = `https://aviasales-test-api.kata.academy/tickets`;
  const searchID = await getSearchID();
  const tickets = await axios
    .get(`${ticketURL}?searchId=${searchID}`)
    .then((result) => {
      if (!result.data.stop) {
        // getTickets();
        console.log(result.data);
      }

      return result.data;
    })
    .catch(() => {
      getTickets();
      console.log("problem");
      window.location.reload();
    });
  console.log(tickets);
  return tickets;
};
