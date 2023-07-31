import React from "react";
import "./header.scss";

const Header = () => {
  return (
    <div className="header">
      <button
        className="header-logo"
        onClick={() => {
          window.location.reload();
        }}
      ></button>
    </div>
  );
};

export default Header;
