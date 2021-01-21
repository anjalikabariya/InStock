import React from "react";
import error from "../../assets/icons/error-24px.svg";

const Error = () => {
  return (
    <div className="form__error">
      <img className="form__error-img" src={error} alt="error" />
      <p className="form__error-text">This field is required</p>
    </div>
  );
};

export default Error;
