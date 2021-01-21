//import any necessary modules
import React from "react";

//import sytling
import "./Modal.scss";

/**
 *
 * @param {object} match
 * @param {object} item - item to be deleted
 * @param {function} closeModal
 * @param {function} deleteFunction - function called to delete the item
 */

function Modal({ match, item, closeModal, deleteFunction }) {
  const path = match.path.split("/")[1];

  return (
    <div className="modal__container">
      <div className="modal">
        <div className="modal__close-wrapper">
          <img
            onClick={() => closeModal()}
            className="modal__close"
            src="/assets/icons/close-24px.svg"
            alt="close"
          />
        </div>
        <div className="modal__main">
          {/* Message to be displayed for warehouse modal */}
          {(path === "warehouses" || path === "") && (
            <div className="modal__top">
              <h1 className="modal__title">
                {" "}
                {`Delete ${item.name} warehouse?`}
              </h1>
              <p className="body-large modal__message">
                {" "}
                {`Please confirm that you would like to delete the ${item.name} from the list of warehouses.  You won't be able to undo this action.`}
              </p>
            </div>
          )}

          {/* Message to be displayed for Inventory modal */}
          {path === "warehouse" && (
            <div className="modal__top">
              <h1 className="modal__title">
                {" "}
                {`Delete ${item.itemName} inventory item?`}
              </h1>
              <p className="body-large modal__message">
                {" "}
                {`Please confirm that you would like to delete ${item.itemName} from the inventory list.  You won't be able to undo this action.`}
              </p>
            </div>
          )}

          {/* Message to be displayed for Inventory modal */}
          {match.path === "/inventory" && (
            <div className="modal__top">
              <h1 className="modal__title">
                {" "}
                {`Delete ${item.itemName} inventory item?`}
              </h1>
              <p className="body-large modal__message">
                {" "}
                {`Please confirm that you would like to delete ${item.itemName} from the inventory list.  You won't be able to undo this action.`}
              </p>
            </div>
          )}

          <div className="modal__bottom">
            <button className="modal__cancel" onClick={() => closeModal()}>
              Cancel
            </button>
            <button className="modal__delete" onClick={() => deleteFunction()}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
