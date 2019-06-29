
/* customer js */

var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "products_db"
});

function new_line() { console.log("\n") }

function query_units(item_id) {
    connection.query("SELECT * FROM products WHERE ?", { id: item_id }, function (err, results) {
        if (err) throw err;
        console.log(results);
        return (results[0].quantity);
    });
}

connection.connect(function (err) {
    if (err) throw err;
    start();
});


function start() {
    new_line();
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.table(results);
        inquirer.prompt(
            {
                name: "get_id",
                message: "Enter id of item you would like to buy ('E' to EXIT):",
                validate: function (value) {
                    if ((isNaN(value) === false || value === 'E' || value === 'e')) return true;
                    return false;
                }
            }).then(function (response) {
                if ((response.get_id === "E") || (response.get_id === 'e')) {
                    connection.end();
                    new_line();
                }
                else {
                    new_line();
                    inquirer.prompt(
                        {
                            name: "get_units",
                            message: "How many would you like?:",
                            validate: function (value) {
                                if (isNaN(value) === false) return true;
                                return false;
                            }
                        }).then(function (response2) {
                            new_line();
                            connection.query("SELECT * FROM products WHERE ?", { id: response.get_id }, function (err, results) {
                                if (err) throw err;
                                if (results[0].quantity < response2.get_units)
                                    console.log("\nInsufficient quantity\n");
                                    else {
                                        // update quantity in db
                                        console.log("we have ", results[0].quantity);
                                        console.log("You want ", response2.get_units);
                                        // show total cost of purchase
                                    }
                                
                                start();
                            });
                        });
                }
            });
    });
}



/*

function postAuction() {
    inquirer
        .prompt([
            {
                name: "item",
                type: "input",
                message: "What is the item you would like to submit?"
            },
            {
                name: "category",
                type: "input",
                message: "What category would you like to place your auction in?"
            },
            {
                name: "startingBid",
                type: "input",
                message: "What would you like your starting bid to be?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO auctions SET ?",
                {
                    item_name: answer.item,
                    category: answer.category,
                    starting_bid: answer.startingBid || 0,
                    highest_bid: answer.startingBid || 0
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your auction was created successfully!");
                    start();
                }
            );
        });
}

function bidAuction() {
    connection.query("SELECT * FROM auctions", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].item_name);
                        }
                        return choiceArray;
                    },
                    message: "What auction would you like to place a bid in?"
                },
                {
                    name: "bid",
                    type: "input",
                    message: "How much would you like to bid?"
                }
            ])
            .then(function (answer) {
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_name === answer.choice) {
                        chosenItem = results[i];
                    }
                }

                if (chosenItem.highest_bid < parseInt(answer.bid)) {
                    connection.query(
                        "UPDATE auctions SET ? WHERE ?",
                        [
                            {
                                highest_bid: answer.bid
                            },
                            {
                                id: chosenItem.id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Bid placed successfully!");
                            start();
                        }
                    );
                }
                else {
                    console.log("Your bid was too low. Try again...");
                    start();
                }
            });
    });
}

 const array = [{ myId: 42, name: 'John', color: 'red' }, { myId: 1337, name: 'Jane', color: 'blue' }]
        var new_obj = results.reduce((acc, { id, ...x }) => { acc[id] = x; return acc }, {})


            */