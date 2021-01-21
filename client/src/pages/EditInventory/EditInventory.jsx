import React from "react";

import "./EditInventory.scss";
import { Card } from "../../components";

function EditInventory({ match }) {
    console.log(match)
    return (
        <div className='newwarehouse'>
            <Card title="Edit Inventory Item"
            img={true}
            search={false}
            button={false}
            buttonText="Save"
            buttonImg=""
            pathForBackButton={`/inventory/${match.params.inventoryId}`}
            path={match.url}
            /> 

        </div>
    )
}

export default EditInventory