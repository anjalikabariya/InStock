import React from "react";
import { Link } from "react-router-dom";
import "./InventoryItem.scss";

/**
 *
 * @param {object} item - inventory item to render
 * @param {function} loadModal
 */

function InventoryItem({ item, warehouse, loadModal, match }) {
  return (
    <>
      {item && (
        <div className="inventory-details">
          <div className="inventory-details__item-list">
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">INVENTORY ITEM</h4>
              <Link to={`/inventory/${item.id}`}>
                <p className="body-medium inventory-details__value-start">
                  {item.itemName}
                  <img
                    src="/assets/icons/chevron_right-24px.svg"
                    alt="details-icon"
                    className="inventory-details__icon"
                  />
                </p>
              </Link>
            </div>
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">CATEGORY</h4>
              <p className="body-medium inventory-details__value">
                {item.category}
              </p>
            </div>
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">STATUS</h4>
              <p
                className={
                  item.status === "In Stock"
                    ? "inventory-details__value-instock body-medium"
                    : "body-medium inventory-details__value-outofstock"
                }
              >
                {item.status}
              </p>
            </div>
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">QUANTITY</h4>
              <p className="body-medium inventory-details__value ">
                {item.quantity}
              </p>
            </div>
            {!match && (
              <div className="inventory-details__label-container">
                <h4 className="inventory-details__label">WAREHOUSE</h4>
                <p className="body-medium inventory-details__value">
                  {item.warehouseName}
                </p>
              </div>
            )}
          </div>
          <div className="inventory-details__actions">
            <div>
              <img
                onClick={() => loadModal(item)}
                src="/assets/icons/delete_outline-24px.svg"
                alt="delete-icon"
              />
            </div>
            <div>
              <Link to={`/inventory/${item.id}/edit`}>
                <img src="/assets/icons/edit-24px-blue.svg" alt="edit-icon" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {warehouse && (
        <div className="inventory-details">
          <div className="inventory-details__item-list">
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">WAREHOUSE</h4>
              <Link to={`/warehouse/${warehouse.id}`}>
                <p className="body-medium inventory-details__value-start">
                  {warehouse.name}
                  <img
                    src="/assets/icons/chevron_right-24px.svg"
                    alt="details-icon"
                    className="inventory-details__icon"
                  />
                </p>
              </Link>
            </div>
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">ADDRESS</h4>
              <p className="body-medium inventory-details__value">
                {warehouse.address}
              </p>
            </div>
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">CONTACT NAME</h4>
              <p className="body-medium inventory-details__value">
                {warehouse.contact.name}
              </p>
            </div>
            <div className="inventory-details__label-container">
              <h4 className="inventory-details__label">CONTACT INFORMATION</h4>
              <p className="body-medium inventory-details__value ">
                {warehouse.contact.email}
              </p>
            </div>
          </div>
          <div className="inventory-details__actions">
            <img
              onClick={() => loadModal(warehouse)}
              className="inventory-details__actions-delete"
              src="/assets/icons/delete_outline-24px.svg"
              alt="delete-icon"
            />
            <Link to={`/warehouse/${warehouse.id}/edit`}>
              <img
                className="inventory-details__actions-edit"
                src="/assets/icons/edit-24px-blue.svg"
                alt="edit-icon"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default InventoryItem;
