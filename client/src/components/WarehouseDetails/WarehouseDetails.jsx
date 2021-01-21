// import any necessary modules
import React from 'react';

// import necessary styling 
import "./WarehouseDetails.scss";

function WarehouseDetails({warehouseDetails}) {
    
    const{address, city, country, contact} = warehouseDetails;
    const{position, phone, email} = contact;
    return (
        <div className="warehouse-details">
            <div className="warehouse-details__left">
                <h4 className="warehouse-details__label">WAREHOUSE ADDRESS:</h4>
                <p className="body-medium warehouse-details__address1">{`${address},`}</p>
                <p className="body-medium warehouse-details__address2">{`${city}, ${country}`}</p>
            </div>
            <div className="warehouse-details__right">
                <div className="warehouse-details__contact warehouse-details__contact--left">
                    <h4 className="warehouse-details__label">CONTACT NAME:</h4>
                    <p className="body-medium warehouse-details__contact-name">{contact.name}</p>
                    <p className="body-medium warehouse-details__contact-position">{position}</p>
                </div>
                <div className="warehouse-details__contact">
                    <h4 className="warehouse-details__label">CONTACT INFORMATION:</h4>
                    <p className="body-medium warehouse-details__contact-phone">{phone}</p>
                    <p className="body-medium warehouse-details__contact-email">{email}</p>
                </div>
            </div>

        </div>
    )
}

export default WarehouseDetails
