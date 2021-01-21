import React from "react";
import "./NewWarehouse.scss";
import { Card } from "../../components";

const NewWarehouse = ({ match }) => {
  return (
    <section className="newwarehouse">
      <Card
        match={match}
        title="Add New Warehouse"
        img={true}
        search={false}
        button={false}
        buttonText=""
        buttonImg=""
        pathForBackButton="/warehouse"
      />
    </section>
  );
};

export default NewWarehouse;
