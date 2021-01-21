function Navigation() {
    return (
        <section className="nav">
            <div className="nav--logo">
                <NavLink to='/warehouses' >
           
                    <img src={logo} alt="InStock-Logo" />
                </NavLink>
            </div>

            <div>
                <ul className="nav--menu">
                    <li>
                        <NavLink to="/warehouses" className="nav--link-warehouse" activeClassName="nav--link-warehouse-active">
                   
                            Warehouses
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/inventories" className="nav--link-inventory" activeClassName="nav--link-inventory-active">
                   
                            Inventory
                        </NavLink>
                    </li>
                </ul>

            </div>
        </section>
    )
}