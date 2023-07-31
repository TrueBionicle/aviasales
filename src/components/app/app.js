import React from "react";

import "./app.scss";

import Header from "./../header/header";
import Filters from "./../filters/filters";
import Tickets from "../tickets/tickets";

const App = () => {
  return (
    <div className="main">
      <Header />
      <Filters />
      <Tickets />
    </div>
  );
};

export default App;
