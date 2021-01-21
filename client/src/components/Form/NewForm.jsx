import React, { Component } from "react";
import "./Form.scss";
import { Link, Redirect } from "react-router-dom";
import { Error } from "..";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

/**
 *
 * @param {string} buttonText - button text
 */
class NewForm extends Component {
  state = {
    // handleChange will update these values
    id: "",
    warehousename: "",
    address: "",
    city: "",
    country: "",
    contactname: "",
    position: "",
    phonenumber: "",
    email: "",
    // handleChange will update these values
    // --------------------------------------
    // ERROR STATES
    warehousenameError: false,
    addressError: false,
    cityError: false,
    countryError: false,
    contactnameError: false,
    positionError: false,
    phonenumberError: false,
    emailError: false,
    // ERROR STATES
    // --------------------------------------
    // SUBMITSUCCESS REDIRECT
    submitSuccess: false,
    // SUBMITSUCCESS REDIRECT
    // --------------------------------------
  };

  componentDidMount() {
    if (this.props.path) {
      const warehouseId = this.props.path.split("/")[2];
      axios
        .get(`http://localhost:8080/warehouse/${warehouseId}`)
        .then((res) => {
          const details = res.data.details;
          const contact = res.data.details.contact;
          this.setState({
            id: details.id,
            warehousename: details.name,
            address: details.address,
            city: details.city,
            country: details.country,
            contactname: contact.name,
            position: contact.position,
            phonenumber: contact.phone,
            email: contact.email,
          });
        });
    }
  }

  updateDetails = (event) => {
    event.preventDefault();

    if (this.validate()) {
      const updatedInfo = {
        name: event.target.warehousename.value,
        address: event.target.address.value,
        city: event.target.city.value,
        country: event.target.country.value,
        contact: {
          name: event.target.contactname.value,
          position: event.target.position.value,
          phone: event.target.phonenumber.value,
          email: event.target.email.value,
        },
      };

      axios
        .put(`http://localhost:8080/warehouse/${this.state.id}`, updatedInfo)
        .catch((err) => {
          console.log(err);
        });
        setTimeout(() => {
          this.setState({ submitSuccess: true });
        }, 250);
    }
  };

  // THIS CONNECTS THE THIS.STATE.VALUE TO THE EVENT.TARGET.VALUE
  handleChange = (event) => {
    const isCheckbox = event.target.type === "checkbox";
    this.setState({
      [event.target.name]: isCheckbox
        ? event.target.checked
        : event.target.value,
    });
  };

  // VALIDATION
  validate = () => {
    // CHECK VALIDATION
    let warehousenameCheck = this.state.warehousename.length > 0;
    let addressCheck = this.state.address.length > 0;
    let cityCheck = this.state.city.length > 0;
    let countryCheck = this.state.country.length > 0;
    let contactnameCheck = this.state.contactname.length > 0;
    let positionCheck = this.state.position.length > 0;
    let phonenumberCheck = /\(?\d{3}\)?[-. ]?(\d{3})[-. ]?\d{4}/.test(
      this.state.phonenumber
    );
    let emailCheck = /\S+@\S+\.\S+/.test(this.state.email);

    // CHECK VALIDATION
    // -------------------
    // warehouse
    if (!warehousenameCheck) {
      this.setState({ warehousenameError: true });
      return false;
    } else if (warehousenameCheck) {
      this.setState({ warehousenameError: false });
    }
    // warehouse
    // -------------------
    // address
    if (!addressCheck) {
      this.setState({ addressError: true });
      return false;
    } else if (addressCheck) {
      this.setState({ addressError: false });
    }
    // address
    // -------------------
    // city
    if (!cityCheck) {
      this.setState({ cityError: true });
      return false;
    } else if (cityCheck) {
      this.setState({ cityError: false });
    }
    // city
    // -------------------
    // country
    if (!countryCheck) {
        this.setState({ countryError: true });
      return false;
    } else if (countryCheck) {
      this.setState({ countryError: false });
    }
    // country
    // -------------------
    // contactname
    if (!contactnameCheck) {
      this.setState({ contactnameError: true });
      return false;
    } else if (contactnameCheck) {
      this.setState({ contactnameError: false });
    }
    // contactname
    // -------------------
    // position
    if (!positionCheck) {
      this.setState({ positionError: true });
      return false;
    } else if (positionCheck) {
      this.setState({ positionError: false });
    }
    // position
    // -------------------
    // phonenumber
    if (!phonenumberCheck) {
      this.setState({ phonenumberError: true });
      return false;
    } else if (phonenumberCheck) {
      this.setState({ phonenumberError: false });
    }
    // phonenumber
    // -------------------
    // email
    if (!emailCheck) {
      this.setState({ emailError: true });
      return false;
    } else if (emailCheck) {
      this.setState({ emailError: false });
    }
    // email
    // -------------------
    // WHEN EVERYTHING IS UP TO VALIDATION THEN TRUE WILL SEND FORM
    return true;
    // WHEN EVERYTHING IS UP TO VALIDATION THEN TRUE WILL SEND FORM
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validate()) {
      const newInfo = {
        id: uuidv4(),
        name: event.target.warehousename.value,
        address: event.target.address.value,
        city: event.target.city.value,
        country: event.target.country.value,
        contact: {
          name: event.target.contactname.value,
          position: event.target.position.value,
          phone: event.target.phonenumber.value,
          email: event.target.email.value,
        },
      };
      // AXIOS POST REQUEST TO SERVER
      axios
        .post("http://localhost:8080/newwarehouse", newInfo)
        .then((result) => console.log(result))
        .catch((error) => console.error("Data post error:", error));
      // AXIOS POST REQUEST TO SERVER
      // --------------------------
      // SET STATE OF SUBMISSION SUCCESS: 250MS TO SEND INFO
      setTimeout(() => {
        this.setState({ submitSuccess: true });
      }, 250);
      // SET STATE OF SUBMISSION SUCCESS: 200MS TO SEND INFO
    }
  };

  render() {
    const path = this.props.path ? this.props.path.split("/")[0] : "newwarehouse";

    // IF FORM VALIDATES THIS WILL SEND USER TO HOMEPAGE
    if (this.state.submitSuccess && path === "newwarehouse") {
      return <Redirect to="/" push={true} />;
    }
    // IF FORM VALIDATES THIS WILL SEND USER TO HOMEPAGE

    if (this.state.submitSuccess && path !== "newwarehouse") {
      return <Redirect to={`/warehouse/${this.state.id}`} push={true} />;
    }

    const buttonText = this.props.path ? "Save" : "+ Add New Warehouse";

    //determine which path we are on based on the props passed down


    //determine which function to use based on the path
    const submitFunction = path === "newwarehouse" ? this.handleSubmit : this.updateDetails;

    return (
      <>
        <form className="form" onSubmit={(event) => submitFunction(event)}>
          {/* -------------------- */}
          <div className="form___details-contact-container">
            {/*------ WAREHOUSE DETAILS ------*/}

            <div className="form__details">
              <h3 className="form__details-head">Warehouse Details</h3>

              {/* WAREHOUSE NAME */}
              <div className="form__details-item">
                {/* NOTE: warehouse name is named as such as there is another name section below */}
                <label
                  htmlFor="warehousename"
                  className="form__details-item-label"
                >
                  Warehouse Name
                </label>
                <input
                  className="form__details-item-input"
                  type="text"
                  name="warehousename"
                  placeholder="Warehouse Name"
                  defaultValue={this.state.warehousename}
                  onChange={this.handleChange}
                  style={
                    this.state.warehousenameError
                      ? { border: "#c94515 solid 1px" }
                      : {}
                  }
                />
                {this.state.warehousenameError && <Error />}
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
                  defaultValue={this.state.address}
                  onChange={this.handleChange}
                  style={
                    this.state.addressError
                      ? { border: "#c94515 solid 1px" }
                      : {}
                  }
                />
                {this.state.addressError && <Error />}
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
                  defaultValue={this.state.city}
                  onChange={this.handleChange}
                  style={
                    this.state.cityError ? { border: "#c94515 solid 1px" } : {}
                  }
                />
                {this.state.cityError && <Error />}
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
                  defaultValue={this.state.country}
                  onChange={this.handleChange}
                  style={
                    this.state.countryError
                      ? { border: "#c94515 solid 1px" }
                      : {}
                  }
                />
                {this.state.countryError && <Error />}
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
                <label
                  className="form__contact-item-label"
                  htmlFor="contactname"
                >
                  Contact Name
                </label>
                <input
                  type="text"
                  name="contactname"
                  placeholder="Contact Name"
                  className="form__contact-item-input"
                  defaultValue={this.state.contactname}
                  onChange={this.handleChange}
                  style={
                    this.state.contactnameError
                      ? { border: "#c94515 solid 1px" }
                      : {}
                  }
                />
                {this.state.contactnameError && <Error />}
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
                  defaultValue={this.state.position}
                  onChange={this.handleChange}
                  style={
                    this.state.positionError
                      ? { border: "#c94515 solid 1px" }
                      : {}
                  }
                />
                {this.state.positionError && <Error />}
              </div>
              {/* POSITION */}
              {/* -------------------- */}
              {/* PHONE NUMBER */}
              <div className="form__contact-item">
                <label
                  className="form__contact-item-label"
                  htmlFor="phonenumber"
                >
                  Phone Number
                </label>
                {/* CUSTOM VALIDATION */}
                <input
                  type="text"
                  name="phonenumber"
                  placeholder="Phone Number"
                  className="form__contact-item-input"
                  defaultValue={this.state.phonenumber}
                  onChange={this.handleChange}
                  style={
                    this.state.phonenumberError
                      ? { border: "#c94515 solid 1px" }
                      : {}
                  }
                />
                {this.state.phonenumberError && <Error />}
                {/* CUSTOM VALIDATION */}
              </div>
              {/* PHONE NUMBER */}
              {/* -------------------- */}
              {/* EMAIL */}
              <div className="form__contact-item">
                <label className="form__contact-item-label" htmlFor="email">
                  Email
                </label>
                {/* CUSTOM VALIDATION */}
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  className="form__contact-item-input"
                  defaultValue={this.state.email}
                  onChange={this.handleChange}
                  style={
                    this.state.emailError ? { border: "#c94515 solid 1px" } : {}
                  }
                />
                {this.state.emailError && <Error />}
                {/* CUSTOM VALIDATION */}
              </div>
              {/* EMAIL */}
            </div>
            {/*------ CONTACT SECTION ------*/}
          </div>
          {/* -------------------- */}
          {/* BUTTON */}
          <div className="form__button">
            {buttonText === "Save" ? (
              <Link to={`/warehouse/${this.state.id}`}>
                <button className="form__button-submit--cancel">Cancel</button>
              </Link>
            ) : (
              <Link to="/">
                <button className="form__button-submit--cancel">Cancel</button>
              </Link>
            )}

            {/* BUTTON PROP */}
            {buttonText === "Save" ? (
             
                <button className="form__button-submit">{buttonText}</button>
 
            ) : (
              <button type="submit" className="form__button-submit">
                {buttonText}
              </button>
            )}
            {/* BUTTON PROP */}
          </div>
        </form>
      </>
    );
  }
}

export default NewForm;
