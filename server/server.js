const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const inventories = require("./inventories.json");
const warehouses = require("./warehouses.json");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//RETURN: list of warehouses
app.get("/warehouse", (req, res) => {
  res.status(200).send(warehouses);
});

//RETURN: list of inventories
app.get("/inventory", (req, res) => {
  res.status(200).send(inventories);
});

//REQUEST: get request to return the details of a specific warehouse
//PARAMS: :warehouseId => id of warehouse to return
//RETURN: the requested warehouse in json format

app.get("/warehouse/:warehouseId", (req, res) => {
  //find the warehouse associated with the requested id
  const requestedWarehouse = warehouses.find(
    (warehouse) => warehouse.id === req.params.warehouseId
  );

  //only search for the inventory if the warehoue was found then filter the inventories array for the appropriate warehouse id
  const warehouseInventory =
    requestedWarehouse &&
    inventories.filter(
      (inventory) => inventory.warehouseID === requestedWarehouse.id
    );

  //the json object to be returned for a single warehouse
  const warehouse = {
    details: requestedWarehouse, //object
    inventory: warehouseInventory, //array of objects
  };

  //return the requested warehouse if request was successful otherwise an error message
  requestedWarehouse
    ? res.status(200).json(warehouse)
    : res.status(400).send("Warehouse not Found");
});

//Fetch single item from inventories.json
app.get("/inventory/:id", (req, res) => {
  //find the Item associated with the requested id
  const requestedItem = inventories.find((item) => item.id === req.params.id);

  //return the requested inventory item if request was successful otherwise an error message
  requestedItem
    ? res.status(200).json(requestedItem)
    : res.status(400).send("Item not Found");
});

//REQUEST: PUT request to update warehouse information
//PARAMS: :warehouseId => id of warehouse to modify
//RETURN: the updated warehouse in json format
app.put("/warehouse/:warehouseId", (req, res) => {
  // deconstruct body to access data submitted by form
  const { name, address, city, country, contact } = req.body;
  const { position, phone, email } = contact;

  //put the values into an array to allow a foreach to check for blanks
  const blankChecks = [
    name,
    address,
    city,
    country,
    contact.name,
    position,
    phone,
    email,
  ];

  //find the location in the warehouses array of the requested warehouse
  const requestedWarehouse = warehouses.findIndex(
    (warehouse) => warehouse.id === req.params.warehouseId
  );

  // if any blank values were submitted shortcircuit and return an error message
  blankChecks.forEach(
    (check) =>
      check === "" &&
      res
        .status(400)
        .send("Fields Cannot Be Empty. Please Enter All Required Information")
  );

  //Regex expression to pull only numbers from a string
  const numberReg = /\d+/g;
  //remove the numbers from the string and put them in an array
  const filteredPhone = phone.match(numberReg).join("").split("");

  // if there aren't 11 numbers in the phone number then return an error
  filteredPhone.length !== 11 && res.status(400).send("Invalid Phone");

  // format the phone number before writing it to the file
  formattedPhone = `+${filteredPhone.splice(0, 1)} (${filteredPhone
    .splice(0, 3)
    .join("")}) ${filteredPhone.splice(0, 3).join("")}-${filteredPhone.join(
    ""
  )}`;

  //validate email - just checks for anystring@anystring.anystring
  const emailReg = /\S+@\S+\.\S+/;
  !email.match(emailReg) && res.status(400).send("Invalid Email Entry");

  // if all submitted data passed validation then update the requested Warehouse info
  warehouses[requestedWarehouse].name = name;
  warehouses[requestedWarehouse].address = address;
  warehouses[requestedWarehouse].city = city;
  warehouses[requestedWarehouse].country = country;
  warehouses[requestedWarehouse].contact.name = contact.name;
  warehouses[requestedWarehouse].contact.position = position;
  warehouses[requestedWarehouse].contact.phone = formattedPhone;
  warehouses[requestedWarehouse].contact.email = email;

  //format the json object to a string
  data = JSON.stringify(warehouses, null, 2);

  //write the formated object to the data store
  fs.writeFile("./warehouses.json", data, () => {
    console.log("Data written to server");
  });

  //return the updated data
  requestedWarehouse || requestedWarehouse === 0
    ? res.status(200).json(warehouses[requestedWarehouse])
    : res.status(400).send("Warehouse not Found");
});

app.post("/inventory", (req, res) => {
  //find respective warehouse id from warehouse name
  const warehouseObj = warehouses.find(
    (item) => item.name === req.body.warehouseName
  );
  const warehouseID = warehouseObj.id;
  const {
    itemName,
    description,
    category,
    status,
    quantity,
    warehouseName,
  } = req.body;
  const blankChecks = [
    itemName,
    description,
    category,
    status,
    quantity,
    warehouseName,
  ];

  //check for blank fields
  blankChecks.forEach(
    (check) =>
      check === "" &&
      res
        .status(400)
        .send("Fields Cannot Be Empty. Please Enter All Required Information")
  );
  //construct new obj to be pushed into inventories.JSON file which includes warehouse Id where newly added inventory item belongs to.
  const obj = {
    itemName: itemName,
    description: description,
    status: status,
    quantity: quantity,
    warehouseName: warehouseName,
    warehouseID: warehouseID,
    category: category,
  };
  // push object inside inventories json
  inventories.push(obj);

  // stringify the new inventories
  let data = JSON.stringify(inventories);

  // rewrite the new data json to the inventories storage
  fs.writeFile("./inventories.json", data, () => {
    console.log("New Inventory created");
  });

  // will return the data
  req.body
    ? res.status(200).json(obj)
    : res.status(404).send("New Warehouse not Found");
});

//REQUEST: DELETE requested inventory item from inventory list
//PARAMS: :inventoryId => id of inventory item to delete
//RETURN: the removed inventory item in json format
app.delete("/inventory/:inventoryId", (req, res) => {
  //retrieve the inventory item to be removed
  const removedItem = inventories.find(
    (item) => item.id === req.params.inventoryId
  );

  //remove the inventory item from the server
  const filteredInventory = inventories.filter(
    (item) => item.id !== req.params.inventoryId
  );

  //format the json object to a string
  data = JSON.stringify(filteredInventory, null, 2);

  //write the formated object to the data store
  fs.writeFile("./inventories.json", data, () => {
    console.log("Item removed from inventory");
  });

  //return the updated data
  removedItem
    ? res.status(200).json(removedItem)
    : res.status(400).send("Inventory Item not Found");
});

// REQUEST: requests data from the /newwarehouse form
// RETURN: the posted inventory item in json format
app.post("/newwarehouse", (req, res) => {
  // push object inside warehouses json
  warehouses.push(req.body);

  // stringify the new warehouses
  let data = JSON.stringify(warehouses, null, 2);

  //rewrite the new data json to the warehouses storage
  fs.writeFile("./warehouses.json", data, () => {
    console.log("New Warehouse created");
  });

  // will return the data
  req.body
    ? res.status(200).json(req.body)
    : res.status(400).send("New Warehouse not Found");
});

//REQUEST: DELETE requested warehouse item from warehouses list
//PARAMS: :warehousesId => id of warehouse to delete
//RETURN: the removed warehouse item in json format
app.delete("/warehouse/:warehouseId", (req, res) => {
  // finds the requested warehouse item using params id
  let deleteWarehouse = warehouses.find(
    (item) => item.id === req.params.warehouseId
  );

  // returns an array that has the params id filtered
  let filteredWarehouse = warehouses.filter(
    (item) => item.id !== req.params.warehouseId
  );

  // stringify the filtered warehouse json object
  let data = JSON.stringify(filteredWarehouse);

  // rewrite the new data json to the warehouses storage
  fs.writeFile("./warehouses.json", data, () => {
    console.log("Deleted warehouse");
  });

  // will return the requested deleted warehouse
  deleteWarehouse
    ? res.status(200).json(deleteWarehouse)
    : res.status(400).send("Delete Warehouse Error: can not find warehouse");
});

app.put("/inventory/:inventoryId", (req, res) => {
  const {
    itemName,
    description,
    category,
    status,
    quantity,
    warehouseName,
  } = req.body;
  const blankChecks = [
    itemName,
    description,
    category,
    status,
    quantity,
    warehouseName,
  ];

  //check for blank fields
  blankChecks.forEach(
    (check) =>
      check === "" &&
      res
        .status(400)
        .send("Fields Cannot Be Empty. Please Enter All Required Information")
  );

  //find requested itemId within the inventories data file
  const requestedItem = inventories.findIndex(
    (item) => item.id === req.params.inventoryId
  );

  //if all data fields are filled set new values at index
  inventories[requestedItem].itemName = itemName;
  inventories[requestedItem].description = description;
  inventories[requestedItem].category = category;
  inventories[requestedItem].status = status;
  inventories[requestedItem].quantity = quantity;
  inventories[requestedItem].warehouseName = warehouseName;

  //format the updated info into a string
  let data = JSON.stringify(inventories, null, 2);

  //update the file
  fs.writeFile("./inventories.json", data, () => {
    console.log("Update Item");
  });

  requestedItem || requestedItem === 0
    ? res.status(200).json(inventories[requestedItem])
    : res.status(400).send("Item not Found");
});

app.listen(8080, () => {
  console.log("Listening at http:localhost:8080");
});
