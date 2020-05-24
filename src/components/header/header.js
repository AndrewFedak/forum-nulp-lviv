import React from "react";
import './header.css'

const Header = () => {
    return (
        <div className="background-cover-nulp">
            <span style={{margin: "auto 0"}}><img src={require("./img/header_logo.png")} className="img-fluid"
                                                  alt="header_logo"/></span>
            <div className="logo-text">
                <h1 style={{fontWeight: "900", color: "white"}}>NULP</h1>
                <h1 style={{marginLeft: "30px", fontWeight: "600", color: "white"}}>FORUM</h1>
            </div>
        </div>
    )
};

export default Header;