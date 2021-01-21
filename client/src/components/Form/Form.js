import React from "react";
import "./Form.scss";
import { Link } from "react-router-dom";
import arrow from "../../assets/icons/arrow-back.svg";

// FORM WILL TAKE TWO PROPS {submitHandler, button}
const Form = () => {
  return (
    <>
      <form className="form">
        {/*------ FORM BACK HEAD ------*/}
        <div className="form__back">
          <Link to="/">
            <img className="form__back-img" src={arrow} alt="arrow" />
          </Link>
          {/* NOTE: EDIT/ADD PROP */}
          <h1 className="form__back-head">Add New Warehouse</h1>
          {/* NOTE: EDIT/ADD PROP */}
        </div>
        {/*------ FORM BACK HEAD ------*/}
        {/* -------------------- */}
        {/*------ WAREHOUSE DETAILS ------*/}
        <div className="form__details">
          <h3 className="form__details-head">Warehouse Details</h3>
          {/* WAREHOUSE NAME */}
          <div className="form__details-item">
            {/* NOTE: warehouse name is named as such as there is another name section below */}
            <label htmlFor="warehousename" className="form__details-item-label">
              Warehouse Name
            </label>
            <input
              className="form__details-item-input"
              type="text"
              name="warehousename"
              placeholder="Warehouse Name"
            />
          </div>
          {/* WAREHOUSE NAME */}
          {/* -------------------- */}
          {/* STREET ADDRESS */}
          <div className="form__details-item">
            <label htmlFor="address" className="form__details-item-label">
              Street Address
            </label>
            <input
              className="form__details-item-input"
              type="text"
              name="address"
              placeholder="Street Address"
            />
          </div>
          {/* STREET ADDRESS */}
          {/* -------------------- */}
          {/* CITY */}
          <div className="form__details-item">
            <label htmlFor="city" className="form__details-item-label">
              City
            </label>
            <input
              className="form__details-item-input"
              type="text"
              name="city"
              placeholder="City"
            />
          </div>
          {/* CITY */}
          {/* -------------------- */}
          {/* COUNTRY */}
          <div className="form__details-item">
            <label htmlFor="country" className="form__details-item-label">
              Country
            </label>
            <input
              className="form__details-item-input"
              type="text"
              name="country"
              placeholder="Country"
            />
          </div>
          {/* COUNTRY */}
        </div>
        {/*------ WAREHOUSE DETAILS ------*/}
        {/* -------------------- */}
        {/*------ CONTACT SECTION ------*/}
        <div className="form__contact">
          <h3 className="form__contact-head">Contact Details</h3>
          {/* CONTACT NAME */}
          <div className="form__contact-item">
            <label className="form__contact-item-label" htmlFor="contactname">
              Contact Name
            </label>
            <input
              type="text"
              name="contactname"
              placeholder="Contact Name"
              className="form__contact-item-input"
            />
          </div>
          {/* CONTACT NAME */}
          {/* -------------------- */}
          {/* POSITION */}
          <div className="form__contact-item">
            <label className="form__contact-item-label" htmlFor="position">
              Position
            </label>
            <input
              type="text"
              name="position"
              placeholder="Position"
              className="form__contact-item-input"
            />
          </div>
          {/* POSITION */}
          {/* -------------------- */}
          {/* PHONE NUMBER */}
          <div className="form__contact-item">
            <label className="form__contact-item-label" htmlFor="phonenumber">
              Phone Number
            </label>
            <input
              type="text"
              name="phonenumber"
              placeholder="Phone Number"
              className="form__contact-item-input"
            />
          </div>
          {/* PHONE NUMBER */}
          {/* -------------------- */}
          {/* EMAIL */}
          <div className="form__contact-item">
            <label className="form__contact-item-label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="form__contact-item-input"
            />
          </div>
          {/* EMAIL */}
        </div>
        {/*------ CONTACT SECTION ------*/}
        {/* -------------------- */}
        {/* BUTTON */}
        <div className="form__button">
          <button className="form__button-submit">Cancel</button>
          {/* BUTTON PROP */}
          <button className="form__button-submit">+ Add Warehouse</button>
          {/* BUTTON PROP */}
        </div>
      </form>
    </>
  );
};

export default Form;
