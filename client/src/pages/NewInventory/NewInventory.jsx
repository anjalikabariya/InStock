import React from "react";
import "./NewInventory.scss";
import { Card } from "../../components";

const NewInventory = ({ match }) => {
  console.log(match);
  return (
    <section className="newwarehouse">
      <Card
        match={match}
        title="Add New Item"
        img={true}
        search={false}
        button={false}
        buttonText=""
        buttonImg=""
        pathForBackButton="/inventory"
      />
    </section>
  );
};

export default NewInventory;
