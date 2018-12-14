var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  managerOptions();
});

function managerOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View products for sale":
          viewProducts();
          break;
        case "View low inventory":
          viewInventory();
          break;
        case "Add to inventory":
          addInventory();
          break;
        case "Add new product":
          addProduct();
          break;
      }
    })
}

function viewProducts() {
  var query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(`Item id: ${res[i].item_id} || Item: ${res[i].product_name} || Price: ${res[i].price} || In stock: ${res[i].stock_quantity}`);
    };
  })
};

function viewInventory() {
  var query = "SELECT * FROM products WHERE stock_quantity < 5";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("Items running low on inventory: ");
    for (var i = 0; i < res.length; i++) {
      console.log(`Item: ${res[i].product_name} || Quantity remaining: ${res[i].stock_quantity}`);
    }
  })
};

function addInventory() {
  inquirer
    .prompt([
      {
        name: "addMore",
        type: "confirm",
        message: "Would you like to restock an item?"
      },
      {
        name: "restockItem",
        type: "input",
        message: "What item would you like to restock? Use item id",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      if (answer.addMore) {
        
      }
    })
};

function addProduct() {

}