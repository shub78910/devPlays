import React, { useContext } from "react";
import videoContext from "../Context/videoContext";

const EmptyList = ({ message }) => {
  const { isShowErrorMsg } = useContext(videoContext);

  return (
    <div className="mainPage">
      {isShowErrorMsg ? (
        <h1>There is an error, please try after sometime.</h1>
      ) : (
        <h1> {message}</h1>
      )}
    </div>
  );
};

export default EmptyList;
