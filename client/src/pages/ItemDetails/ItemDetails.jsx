import './ItemDetails.scss';
import React from 'react'
import axios from 'axios';

import {Card} from '../../components'




// console.log(itemDetails)

class ItemDetails extends React.Component {

    state = {item:{}};

    
    componentDidMount(){
        axios.get(`http://localhost:8080/inventory/${this.props.match.params.inventoryId}`)
        .then(res => {
            this.setState({item: res.data}) 
        })
        .catch((err) => {
            console.log(err);
        });
    }

    render() {
        console.log(this.state.item)
        return (
            <div >
               {this.state.item && 
                <Card 
                title={this.state.item.itemName} 
                img={true} search={false} 
                button={true} buttonText="Edit" 
                buttonImg="/assets/icons/edit-24px.svg" 
                buttonLink={`/inventory/${this.state.item.id}/edit`}
                pathForBackButton={`/inventory`}
                details={this.state.item}
                match={this.props.match}
                /> 
            }
            </div>
        )
    }
}

export default ItemDetails
