// import any necessary modules
import React from "react";
import axios from "axios";

// import necessary styling
import "./Warehouse.scss";

// import any additional components to be rendered
import { Card, Modal } from "../../components";

class Warehouse extends React.Component {
  state = {
    warehouse: {},
    showModal: false,
    modalItem: {},
  };

  componentDidMount() {
    axios
       .get(
        `http://localhost:8080/warehouse/${this.props.match.params.warehouseId}`
      )
      .then((res) => {
        this.setState({ warehouse: res.data });
      });
  }
  
  //function used to disable scrolling when the modal is visible
  toggleScrollLock = () =>{
    //return to the top of the screen before setting scroll lock
    window.scrollTo(0,0);
    document.querySelector('html').classList.toggle('scroll-lock');
  }
  
  //function used to variable for conditional rendering of the modal to true
  loadModal = (item) => {
    //item is the item object to delete
    this.setState({ showModal: true, modalItem: item });
    this.toggleScrollLock();
  };

  //function used to set variable for conditional rendering of the modal to false
  closeModal = () => {
    this.setState({ showModal: false });
    this.toggleScrollLock();
  };

  //function used to make an axios call to delete an item
  deleteInventory = () => {
    console.log(this.state.warehouse);
    axios
      .delete(`http://localhost:8080/inventory/${this.state.modalItem.id}`)
      .then((res) => {
        //update the state with the new data
        const warehouseCopy = this.state.warehouse;
        const filteredInventory = [...this.state.warehouse.inventory].filter(
          (item) => item.id !== res.data.id
        );
        warehouseCopy.inventory = filteredInventory;

        this.setState({ warehouse: warehouseCopy, showModal: false });
      });
    this.closeModal();
  };

  render() {
    return (
      <>
        {this.state.showModal && (
          <Modal
            match={this.props.match}
            item={this.state.modalItem}
            closeModal={this.closeModal}
            deleteFunction={this.deleteInventory}
          />
        )}
        {/* only render the card component if data has been returned for the warehouse */}
        {this.state.warehouse.details && (
          <Card
            title={this.state.warehouse.details.name}
            img={true}
            search={false}
            button={true}
            buttonText="Edit"
            buttonImg="/assets/icons/edit-24px.svg"
            buttonLink={`/warehouse/${this.state.warehouse.details.id}/edit`}
            details={this.state.warehouse.details} //warehouse details for the warehouse page
            warehouseInventory={this.state.warehouse.inventory}
            match={this.props.match}
            loadModal={this.loadModal}
            pathForBackButton="/"
          />
        )}
      </>
    );
  }
}

export default Warehouse;
