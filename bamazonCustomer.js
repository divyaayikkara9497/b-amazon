var mysql = require("mysql");
var inquirer = require("inquirer");
var table = require("cli-table")

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "Bamazon"
});

//got this idea from stackoverflow to prevent user from selecting an item that's not in the data
var itemNumber = 0;

function display(){
	connection.connect(function(err) {
		if (err) throw errr;
		//console.log("connected as id " + connection.threadId);
		connection.query("SELECT * FROM productsList", function(err, res){
			if(err) {
				console.log(err);
			}
			console.log("Welcome to B-Amazon!");
			console.log("Check out our items!");
			var tableDisplay = new table({
				head: ["Item ID" , "Product Name" , "Department Name" , "Price" , "Stock Quantity"],
				colWidths: [10, 45, 18, 10, 20]

			});
			for (var i = 0; i < res.length; i++){
				tableDisplay.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
				itemNumber++;
			}
			console.log(tableDisplay.toString());
			//console.log(itemNumber);
			ask();
		})
	});
}


function ask() {
	inquirer.prompt([{
		name: "hello",
		message: "Would you like to buy an item?",
		type: "list",
		choices: ["Yes" , "No"]
	}]).then(function(answer){
		if (answer.hello == "Yes") {
			showList();
		}
		else {
			console.log("Aww hope to see you soon!");
			connection.end();
		}
	})
}

function showList() {
	inquirer.prompt([{
		name: "ID",
		type: "input",
		message: "Please select the item ID that you would like to buy",
		validate: function(value){
			if (value <= itemNumber) {
				return true;
			} else {
				console.log("\nPlease put in a valid ID");
				return false;
			}
		}
	}, {
		name: "Quantity",
		type: "input",
		message: "How many would you like?"
	}]).then(function(answers){
		var userInput = answers.ID;
		var userQuantity = answers.Quantity;
		//console.log("ID: " + userInput);
		//console.log("Quantity: " + userQuantity)
		purchase(userInput, userQuantity);
	})

}

function purchase(ID, quantityNeeded){
	connection.query("SELECT * FROM productsList WHERE item_id=" + ID, function(err, res){
		if(err) throw err;
		if(quantityNeeded > res[0].stock_quantity){
			console.log("We are sorry but we do not have enough " + res[0].product_name + "for your order!");
		}
		else {
			var cost = res[0].price * quantityNeeded;
			console.log("Total quantity purchased: " + quantityNeeded);
			console.log("Your product is: " + res[0].product_name);
			console.log("The total cost of your purchase is: " + cost);
			console.log("Thank you for shopping with us! We hope to see you soon!");
		}

	})

}

display();
