import React from "react";

import "./Test.scss";

import Card from "../../components/Card/Card";

const Test = () => {
  return (
    <>
      <h1>Test Route</h1>
      <button className="button">Submit</button>
      <input className="input" placeholder="Some Text"></input>
      <h1>H1 Check</h1>
      <h2>H2 Check</h2>
      <h3>H3 Check</h3>
      <h4>H4 Check</h4>
      <p className="body-large">P Check</p>
      <p className="body-medium">P Check</p>
      <p className="body-small">P Check</p>

      {/* card component examples for each route */}
      {/* Need to also pass down the appropriate clickhandler functions for the img and the button if applicable */}
      {/* Probably also the object to be rendered for the lists and forms */}

      <Card title="Warehouses" img={false} search={true} button={true} buttonText="+ Add New Warehouse" buttonImg=""/> 
      <Card title="King West" img={true} search={false} button={true} buttonText="Edit" buttonImg="../../assets/icons/edit-24px.svg"/> 
      <Card title="Edit Warehouse" img={true} search={false} button={false} buttonText="" buttonImg=""/> 
      <Card title="Add New Warehouse" img={true} search={false} button={false} buttonText="" buttonImg=""/> 
      <Card title="Inventory" img={false} search={true} button={true} buttonText="+ Add New Item" buttonImg=""/> 
      <Card title="Television" img={true} search={false} button={true} buttonText="Edit" buttonImg="/assets/icons/edit-24px.svg"/> 
      <Card title="Edit Inventory Item" img={true} search={false} button={false} buttonText="" buttonImg=""/> 
      <Card title="Add Inventory Item" img={true} search={false} button={false} buttonText="" buttonImg=""/> 

    </>
  );
};

export default Test;