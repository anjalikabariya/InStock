// import any necessary modules
import React from 'react';
import InventoryItem from '../InventoryItem/InventoryItem';
import './InventoryList.scss';
import { v4 as uid1 } from 'uuid';


function InventoryList({inventoryList, warehouseList, loadModal, match}) {
    return (
        <div>
            {/* conditionally render inventory list/ warehouse list on homepage */}
            {inventoryList && <section className="table">
                    <div className="table--header-inventory">
                        <div className="table--header-labels-inventory">
                            <h4 className="table--header-label">INVENTORY ITEM <img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                            <h4 className="table--header-label">CATEGORY<img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                            <h4 className="table--header-label">STATUS<img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                            <h4 className="table--header-label">QUANTITY<img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                            {!match && <h4 className="table--header-label">WAREHOUSE<img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>}
                        </div>
                        <div className="table--header-labels-actions-inventory"><h4 className="table--header-label-action">ACTIONS</h4></div>
                    </div>

                    <div>
                    {inventoryList.map((data) => (
                        <InventoryItem key={uid1()} item={data} loadModal={loadModal} match={match} />
                    ))}
                    </div>
                
            </section> }


            {warehouseList && <section className="table">
                    <div className="table--header">
                        <div className="table--header-labels">
                            <h4 className="table--header-label">WAREHOUSE <img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                            <h4 className="table--header-label">ADDRESS<img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                            <h4 className="table--header-label">CONTACT NAME<img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                            <h4 className="table--header-label">CONTACT INFORMATION<img src="/assets/icons/sort-24px.svg" alt="sort-icon" className="table--header-icon" /></h4>
                        </div>
                        <h4 className="table--header-label-action">ACTIONS</h4>
                    </div>
                    <div>
                    {warehouseList.map((data) => (
                        <InventoryItem key={uid1()} warehouse={data} loadModal={loadModal} match={match} />
                    ))}
                    </div>
                
            </section> }
                        
        </div>
                        

    )
}

export default InventoryList;
