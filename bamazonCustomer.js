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
  database: "bAmazon_db"
});

function display(){
	connection.connect(function(err) {
		if (err) throw errr;
		//console.log("connected as id " + connection.threadId);
		connection.query("SELECT * FROM products", function(err, res){
			if(err) {
				console.log(err);
			}
			console.log("Welcome to B-Amazon!");
			console.log("Check out our items!");
			var tableDisplay = new table({
				head: ["Item ID" , "Product Name" , "Department Name" , "Price" , "Stock Quantity"],
				colWidths: [10, 30, 18, 10, 20]

			});
			for (var i = 0; i < res.length; i++){
				tableDisplay.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quanity]);
			}
			console.log(tableDisplay.toString());
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

}

display();
