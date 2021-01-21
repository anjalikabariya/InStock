import React from "react";
import "./InventoryPage.scss";
import axios from "axios";
import { Card, Modal } from "../../components";

class InventoryPage extends React.Component {
  state = { inventoryData: [], showModal: false, modalItem: {} };

  componentDidMount() {
    //get the list of inventory items
    axios.get("http://localhost:8080/inventory").then((res) => {
      this.setState({ inventoryData: res.data });
    });
  }

  handleSearch = (userInput) =>{
    let inputLower = userInput.toLowerCase();
    axios.get("http://localhost:8080/inventory")
    .then((res) => {
      let filteredList=[];
      if(userInput === ""){
        filteredList = res.data
      }
      else{
        filteredList = res.data.filter(item =>
          (
          item.itemName.toLowerCase().includes(inputLower) || 
          item.warehouseName.toLowerCase().includes(inputLower) ||
          item.status.toLowerCase().includes(inputLower) ||
          item.category.toLowerCase().includes(inputLower)
          ) ? item : null
        )
      }
      this.setState({
        inventoryData : filteredList
      })
    })
    .catch((err) => console.log(err));
  }
  

  toggleScrollLock = () =>{
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
    axios
      .delete(`http://localhost:8080/inventory/${this.state.modalItem.id}`)
      .then((res) => {
        //update the state with the new data
        const filteredInventory = [...this.state.inventoryData].filter(
          (item) => item.id !== res.data.id
        );
        this.setState({ inventoryData: filteredInventory, showModal: false });
      });
  };

  render() {
    return (
      <div>
        {/* conditionally render the modal based on the state value */}
        {this.state.showModal && (
          <Modal
            match={this.props.match}
            item={this.state.modalItem}
            closeModal={this.closeModal}
            deleteFunction={this.deleteInventory}
          />
        )}
        <Card
          classname="inventory__list"
          pathForAddForm="/inventory/new"
          title="Inventory"
          img={false}
          search={true}
          button={true}
          buttonText="+ Add New Item"
          buttonImg=""
          inventoryList={this.state.inventoryData}
          loadModal={this.loadModal}
          handleSearch={userInput => this.handleSearch(userInput)}
        />
      </div>
    );
  }
}

export default InventoryPage;
