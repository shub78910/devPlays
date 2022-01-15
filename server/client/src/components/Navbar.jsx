import React, { useContext } from "react";
import "../styles/Navbar.css";
import appIcon from "../assets/vid.png";
import { InputGroup, FormControl, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import videoContext from "../Context/videoContext";
import { useState } from "react";

const Navbar = () => {
  const { userName } = useContext(videoContext);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const searchVideos = () => {
    if (searchInput !== "") navigate(`/searchedVideos/${searchInput}  `);
  };

  return (
    <div className="navbarWrapper ">
      <Link to="/" className="LinkTagDefault">
        <div className="LinkTagDefault">
          <img className="hero" src={appIcon} alt="appLogo" />
          <strong className="displayInMobile">devPlays</strong>
        </div>
      </Link>
      <InputGroup className="mb-3 searchInput">
        <FormControl
          placeholder="Search videos"
          aria-label="Search videos"
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") searchVideos();
          }}
        />
        <InputGroup.Text onClick={() => searchVideos()} id="basic-addon2">
          <i className="fa fa-search fa-x"></i>
        </InputGroup.Text>
      </InputGroup>
      <div className="LinkTagDefault displayInMobile ">
        {userName ? (
          <span className="LinkTagDefault">
            <h4>Hello, {userName}</h4>
          </span>
        ) : (
          <Link className="LinkTagDefault" to={`/login`}>
            <Button>Login</Button>
          </Link>
        )}
      </div>
      {/* <div>
        <i className="fa fa-align-center fa-2x"></i>
      </div> */}
    </div>
  );
};

export default Navbar;
