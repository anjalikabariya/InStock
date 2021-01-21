import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import "./App.scss";

import {
  HomePage,
  NewWarehouse,
  Warehouse,
  InventoryPage,
  NewInventory,
  EditWarehouse,
  ItemDetails,
  EditInventory
} from "./pages";
import { Header, Footer } from "./components";
const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" render={() => {
          return (
            <Redirect to="/warehouse" />)}}
        />
        <Route
          path="/warehouse"
          exact
          render={(props) => <HomePage {...props} />}
        />
        <Route
          path="/inventory"
          exact
          render={(props) => <InventoryPage {...props} />}
        />
        <Route path="/inventory/new" component={NewInventory} />
        <Route path="/newwarehouse" component={NewWarehouse} />
        <Route
          path="/inventory/:inventoryId/edit"
          exact
          render={(props) => <EditInventory {...props} />}
        />
        <Route
          path="/warehouse/:warehouseId/edit"
          render={(props) => <EditWarehouse {...props} />}
        />
        <Route
          path="/warehouse/:warehouseId"
          exact
          render={(props) => <Warehouse {...props} />}
        />
        <Route
          path="/inventory/:inventoryId"
          exact
          render={(props) => <ItemDetails {...props} />}
        />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
