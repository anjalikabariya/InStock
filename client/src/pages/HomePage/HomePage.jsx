import React, { Component } from "react";
import "./HomePage.scss";
import axios from "axios";
import { Card, Modal } from "../../components";

export class HomePage extends Component {
  state = {
    wareHouseData: [],
    showModal: false,
    modalItem: {},
  };

  componentDidMount() {
    axios.get("http://localhost:8080/warehouse").then((response) => {
      this.setState({
        wareHouseData: response.data,
      });
    });
  }

  toggleScrollLock = () =>{
    window.scrollTo(0,0);
    document.querySelector('html').classList.toggle('scroll-lock');
  }

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

  // function to delete inventory
  deleteWarehouse = () => {
    axios
      .delete(`http://localhost:8080/warehouse/${this.state.modalItem.id}`)
      .then((res) => {
        //update the state with the new data
        const filteredWarehouse = [...this.state.wareHouseData].filter(
          (item) => item.id !== res.data.id
        );
        this.setState({ wareHouseData: filteredWarehouse, showModal: false });
      });
  };

  handleSearch = (userInput) =>{
    let inputLower = userInput.toLowerCase();
    axios.get("http://localhost:8080/warehouse")
    .then((res) => {
      let filteredList=[];
      if(userInput === ""){
        filteredList = res.data
      }
      else{
        filteredList = res.data.filter(item =>
          (
          item.name.toLowerCase().includes(inputLower) || 
          item.address.toLowerCase().includes(inputLower) ||
          item.contact.name.toLowerCase().includes(inputLower) ||
          item.contact.email.toLowerCase().includes(inputLower)
          ) ? item : null
        )
      }
      this.setState({
        wareHouseData : filteredList
      })
    })
    .catch((err) => console.log(err));
  }

  render() {
    return (
      <>
        {/* conditionally render the modal based on the state value */}
        {this.state.showModal && (
          <Modal
            match={this.props.match}
            item={this.state.modalItem}
            closeModal={this.closeModal}
            deleteFunction={this.deleteWarehouse}
          />
        )}
        <Card
          title="Warehouses"
          img={false}
          search={true}
          button={true}
          buttonText="+ Add New Warehouse"
          buttonImg=""
          pathForAddForm="/newwarehouse"
          warehouseList={this.state.wareHouseData}
          loadModal={this.loadModal}
          handleSearch={userInput => this.handleSearch(userInput)}
        />
      </>
    );
  }
}
export default HomePage;
