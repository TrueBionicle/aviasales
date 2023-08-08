import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <a href="../app/app.js" className="header-logo">
        <img src={require("./../../assets/img/Logo.jpg")} alt="logo"></img>
      </a>
    </div>
  );
};

export default Header;
