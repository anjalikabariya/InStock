import React, { Component } from 'react'
import axios from 'axios';
import { Link, Redirect } from "react-router-dom";
import { v4 as uid } from 'uuid';
import "./InventoryForm.scss";
import Error from '../Error/Error'
/**
 *
 * @param {string} buttonText - button text
 * @param {object} formDetails - details to be edited for a specific warehouse
 */


export default class InventoryForm extends Component {
  //sets the defaults for the form if details have been passed, otherwise leaves the data as blank
  state = {
    id: {uid}, itemName:"", description:"", category:"", status:"In Stock", quantity:"", warehouseName:"", error:false, submitSuccess: false
  }
  getItemDetails = () => {
    axios.get(`http://localhost:8080${this.props.pathForBackButton}`)
      .then(res => {
        this.setState({
          id: res.data.id,
          itemName: res.data.itemName,
          description:res.data.description,
          category:res.data.category,
          status: res.data.status,
          quantity:res.data.quantity, 
          warehouseName:res.data.warehouseName,
          error:false
       })
      })
      .catch(err => console.log(err, 'Error in Get Item Details'))
  }
  componentDidMount(){
    if(this.props.buttonText === "Save"){
      this.getItemDetails();
    }
  }
  onValueChange = (event) => {
    this.setState({
      status : event.target.value,
    })
    console.log(this.state.status)
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name] : event.target.value
    });
  }
  validate = () =>{
    let nameCheck=this.state.itemName.length > 0;
    let descriptionCheck=this.state.description.length > 0;
    let categoryCheck=this.state.category.length > 0;
    let warehouseNameCheck=this.state.warehouseName.length > 0;
    let quantityCheck = (this.state.status === 'In Stock') ? ((this.state.quantity > 0) && !isNaN(this.state.quantity)) : (true); 
    if((nameCheck && descriptionCheck && categoryCheck && warehouseNameCheck && quantityCheck) === true){
      console.log(true)
      return true;
      
    }else{ 
      console.log(false)
      return false;}
  }

  handleSubmit = (event) =>{
    event.preventDefault();
    if(this.validate()){
      this.setState({error:false})
      const updatedInfo = {
        id:this.state.id,
        itemName:event.target.itemName.value,
        description:event.target.description.value,
        category: event.target.category.value,
        status: event.target.status.value,
        quantity: event.target.quantity.value,
        warehouseName: event.target.warehouseName.value,
      };

      if(this.props.path){
          axios.put(`http://localhost:8080${this.props.pathForBackButton}`, updatedInfo)
            .then(res => console.log(res))
            .catch(err => console.log('Error in Put', err))
            setTimeout(() => {
              this.setState({ submitSuccess: true });
            }, 250);
        }else{
        axios
          .post("http://localhost:8080/inventory", updatedInfo)
          .then((result) => console.log(result))
          .catch((error) => console.error("Data post error:", error));
          setTimeout(() => {
        this.setState({ submitSuccess: true });
        }, 250);
      }
    }
    else{
      this.setState({error:true})
    }
  };

  render() {
    // IF FORM VALIDATES THIS WILL SEND USER TO HOMEPAGE
    if (this.state.submitSuccess) {
      return <Redirect to="/inventory" push={true} />;
    }
    
    console.log(this.state, '/n', this.props)
    return (
      
      <div>
          <form className="form" onSubmit={this.handleSubmit}>
          {/* -------------------- */}
          <div className="form___details-contact-container">
            {/*------ INVENTORY DETAILS ------*/}

            <div className="form__details">
              <h3 className="form__details-head">Item Details</h3>

              <div className="form__details-item">
                <label htmlFor="itemName" className="form__details-item-label">
                  Item Name
                </label>
                <input style={this.state.error ? { border: "#c94515 solid 1px" } : {}} className="form__details-item-input" onChange={this.handleChange} type="text" name="itemName" defaultValue={this.state.itemName} placeholder="Item Name"/>
                {this.state.error && <Error />}
              </div>
              <div className="form__details-item">
                <label htmlFor="description" className="form__details-item-label">
                  Description
                </label>
                <input className="form__details-item-desc" type="text" onChange={this.handleChange} name="description" style={this.state.error ? { border: "#c94515 solid 1px" } : {}} defaultValue={this.state.description} placeholder="Please Enter Brief Description"/>
                {this.state.error && <Error />}
              </div>
              <div className="form__details-item">
                <label htmlFor="category" className="form__details-item-label">
                  Category
                </label>
                <select value={this.state.category} onChange={this.handleChange} name="category" style={this.state.error ? { border: "#c94515 solid 1px" } : {}} className="form__details-item-input">
                  <option value="">Please Select</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Gear">Gear</option>
                  <option value="Apparel">Apparel</option>
                  <option value="Accessories">Accessories</option>
                  <option value="Health">Health</option>
                </select>
                {this.state.error && <Error />}
              </div>
            </div>
            <div className="form__availability">
              <h3 className="form__availability-head">Item Availability</h3>
              <div className="form__availability-item">
                <label htmlFor="status" className="form__details-item-label">
                  Status
                </label>
                <div className="form__details-item-status">
                    <label><input style={this.state.error ? { border: "#c94515 solid 1px" } : {}} type="radio" value="In Stock" onChange={this.onValueChange} name="status" checked={this.state.status === 'In Stock'} /> In Stock</label>
                    <label><input style={this.state.error ? { border: "#c94515 solid 1px" } : {}} type="radio" value="Out of Stock" name="status" onChange={this.onValueChange} checked={this.state.status === 'Out of Stock'} /> Out of Stock</label>
                </div>
                {this.state.error && <Error />}
              </div>
              <div className={`form__availability-item ${this.state.status === 'In Stock' ? "quantity--display" : "quantity--hide"}`}>
                <label htmlFor="quantity" className="form__details-item-label">
                  Quantity
                </label>
                <input className="form__details-item-quantity" onChange={this.handleChange} type="text" name="quantity" defaultValue={this.state.status==='In Stock'? this.state.quantity:0} placeholder="1" style={this.state.error ? { border: "#c94515 solid 1px" } : {}}/>
                {this.state.error && <Error />}
              </div>
              <div className="form__availability-item">
                <label htmlFor="warehouseName" className="form__details-item-label">
                  Warehouse
                </label>
                <select value={this.state.warehouseName} onChange={this.handleChange} name="warehouseName" className="form__details-item-input"style={this.state.error ? { border: "#c94515 solid 1px" } : {}} >
                  <option value="">Please Select</option>
                  <option value="Manhattan">Manhattan</option>
                  <option value="King West">King West</option>
                  <option value="Granville">Granville</option>
                  <option value="San Fran">San Fran</option>
                  <option value="Seattle">Seattle</option>
                  <option value="Santa Monica">Santa Monica</option>
                  <option value="Montreal">Montreal</option>
                  <option value="Boston">Boston</option>
                </select>
                {this.state.error && <Error />}
              </div>
            </div>
          </div>

          {/* -------------------- */}
          {/* BUTTON */}
          <div className="form__button">

          <div className="form__button">
            {this.props.buttonText === "Save" ? (
              <Link to={`/inventory/${this.state.id}`}>
                <button className="form__button-submit--cancel">Cancel</button>
              </Link>
            ) : (
              <Link to="/">
                <button className="form__button-submit--cancel">Cancel</button>
              </Link>
            )}

            {/* BUTTON PROP */}
            {this.props.buttonText === "Save" ? (
                <button className="form__button-submit">{this.props.buttonText}</button>
            ) : (
              <button type="submit" className="form__button-submit">
                {this.props.buttonText}
              </button>
            )}
            {/* BUTTON PROP */}
          </div>
          </div>
        </form>
      </div>
    )
  }
}

