var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table')

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
  var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    managerOptions();
  })
};

function viewInventory() {
  var query = "SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log("Items running low on inventory: ");
    console.table(res);
    // for (var i = 0; i < res.length; i++) {
    //   console.log(`Item: ${res[i].product_name} || Quantity remaining: ${res[i].stock_quantity}`);
    // }
    managerOptions();
  })
};

function addInventory() {
  inquirer
    .prompt({
      name: "addMore",
      type: "confirm",
      message: "Would you like to restock an item?"
    })
    .then(function (answer) {
      if (answer.addMore) {
        var query = "SELECT item_id, product_name, stock_quantity FROM products"
        connection.query(query, function (err, res) {
          console.table(res);
          inquirer
          .prompt({
            name: "restockItem",
            type: "input",
            message: "What item would you like to restock? Use item id",
            validate: function (value) {
              if (isNaN(value) === false) {
                return true;
              }
              return false;
            }
          })
          .then(function (answer) {
            var query = "UPDATE products SET stock_quantity = stock_quantity+20 WHERE item_id = " + answer.restockItem;
            connection.query(query, function (err, res) {
              if (err) throw err;
            })
            connection.query("SELECT * FROM products WHERE item_id = " + answer.restockItem, function (err, res) {
              if (err) throw err;
              console.log(`New ${res[0].product_name} quantity: ${res[0].stock_quantity}\n`);
              managerOptions();
            })
          })
        })        
      } else {
        managerOptions();
      }
    })
};

function addProduct() {
  inquirer
    .prompt([
      {
        name: "product",
        type: "input",
        message: "What product would you like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department will the product be in?"
      },
      {
        name: "price",
        type: "input",
        message: "How much will the item cost?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
        name: "quantity",
        type: "input",
        message: "How many do you want in stock?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES('" + answer.product + "', '" + answer.department + "', " + answer.price + ", " + answer.quantity + ")", function (err, res) {
        console.log(`New item: \n${answer.product} \nDepartment: ${answer.department} \nItem price: ${answer.price} \nIn stock: ${answer.quantity}`);
      });
      managerOptions();
    });
}