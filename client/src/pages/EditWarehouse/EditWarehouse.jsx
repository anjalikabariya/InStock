import React from "react";

import "./EditWarehouse.scss";
import { Card } from "../../components";

function EditWarehouse(props) {
  const pathSplit = props.location.pathname.split("/");
  const backpath = "/" + pathSplit[1] + "/" + pathSplit[2];

  return (
    <div>
      <Card
        title="Edit Warehouse"
        img={true}
        search={false}
        button={false}
        buttonText=""
        buttonImg=""
        path={props.location.pathname}
        pathForBackButton = {backpath}
      />
    </div>
  );
}

export default EditWarehouse;
