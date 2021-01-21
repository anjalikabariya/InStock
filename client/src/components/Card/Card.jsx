// import any necessary modules
import React from "react";

// import necessary styling
import "./Card.scss";
// import any additional components to be rendered
import {
  CardTitle,
  WarehouseDetails,
  NewForm,
  InventoryList,
  InventoryForm,
  ItemDetail,
} from "../../components";

/**
 *
 * @param {object} props - left as props instead of destructuring for easier passing to Card Title component
 * @param {object} details - object with details to render for the edit forms - this needs to be passed down to the <Link> in the title for the Edit Warehouse and Edit Invetory
 * @param {string} path - path={props.location.pathname} - sent by Edit Warehouse and Edit Inventory through <Link>
 * @param {object} match - will only be defined for pages not sent through <Link>
 * @param {function} loadModal - used to set state to true to render modal
 * @param {array} warehouseInventory
 * @param {array} inventoryList
 */

function Card(props) {
  const {path,details,match,inventoryList,warehouseList,warehouseInventory,loadModal} = props;

  return (
    <main className="card">
      {/* if details needed to be passed down to a form send them to the card title otherwise don't send details */}
      {details ? (
        <CardTitle {...props} details={details} />
      ) : (
        <CardTitle {...props} />
      )}

      {/* if the warehouse component is being rendered then render the WarehouseDetails component before the list */}
      {match && match.params.warehouseId && (
        <WarehouseDetails warehouseDetails={details} />
      )}

      {match && match.params.inventoryId && (
        <ItemDetail itemDetails={details} />
      )}

      {/* Conditionally render content (lists and forms) based on match.params or path depending on how they were sent here*/}

      {/* WILL RENDER NEWWAREHOUSE ON SPECIFIC ROUTE */}

      {(match && match.path) === "/newwarehouse" && <NewForm {...props} />}
      {(match && match.path) === "/inventory/new" && (
        <InventoryForm buttonText="+ Add Item" />
      )}

      {path && path.split("/")[3] === `edit` && path.split('/')[1] === 'inventory' && (<InventoryForm {...props}/>)}
      
      {/* if formdetails exist and the path is to editwarehouse then render the Form component */}
      {path && path.split("/")[3] === `edit` && path.split("/")[1] === 'warehouse'  && <NewForm {...props}/>}

      {warehouseList && (<InventoryList warehouseList={warehouseList} loadModal={loadModal} />)}
      {inventoryList && (<InventoryList inventoryList={inventoryList} loadModal={loadModal} />)}
      {warehouseInventory && (<InventoryList inventoryList={warehouseInventory} loadModal={loadModal} {...props}/>)}
    </main>
  );
}

export default Card;
