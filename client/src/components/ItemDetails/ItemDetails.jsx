import React from 'react'

import './ItemDetails.scss'

function ItemDetails({itemDetails}) {
        const{warehouseName, description, category, status, quantity} = itemDetails;
        return (
        <div className="item-details">
            <div className="item-details__top">
                <h4 className="item-details__label">ITEM DESCRIPTION:</h4>
                <p className="body-medium item-details__description">{description}</p>
                <h4 className="item-details__label">CATEGORY:</h4>
                <p className="body-medium item-details__description">{category}</p>
            </div>
            <div className='flex-container'>
                <div className="item-details__middle">
                    <div className="item-details__status">
                        <h4 className="item-details__label">STATUS:</h4>
                        <p className={(itemDetails.status === 'In Stock') ? "item-details--instock body-medium" : "body-medium item-details--outofstock"}>{status}</p>
                    </div>
                    <div className="item-details__quantity">
                        <h4 className="item-details__label">QUANTITY:</h4>
                        <p className="body-medium item-details__quantity">{quantity}</p>

                    </div>
                </div>
                <div className="item-details__bottom">
                    <h4 className="item-details__label">WAREHOUSE:</h4>
                    <p className="body-medium item-details__warehouse">{warehouseName}</p>
                </div>
            </div>

        </div>
    )
}

export default ItemDetails
 