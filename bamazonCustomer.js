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
    displayItems();
});

function displayItems() {
    var query = "SELECT * FROM products";
    connection.query(query, function (err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("Items for sale: ")
        for (var i = 0; i < res.length; i++) {
            console.log(`Item id: ${res[i].item_id} || Item name: ${res[i].product_name} || Price: $${res[i].price}`)
        }
        purchase();
    });
};

function purchase() {
    inquirer
        .prompt([
            {
                name: "item_id",
                type: "input",
                message: "What is the ID of the product you would like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "amount",
                type: "input",
                message: "How many units would you like to buy?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            var query = "SELECT * FROM products WHERE ?"
            connection.query(query, { item_id: answer.item_id }, function (err, res) {
                if (err) throw err;
                console.log(res);
                if (res[0].stock_quantity > answer.amount) {
                    console.log(`Your purchase total is: ${res[0].price * answer.amount}`)
                    res[0].stock_quantity -= answer.amount;
                    connection.query("UPDATE products SET stock_quantity = " + res[0].stock_quantity + " WHERE item_id = " + answer.item_id, function(err, res) {
                        if (err) throw err;
                        console.log(res);
                    });
                    
                } else {
                    console.log("Insufficient quantity!");
                }
            })
        })
}
