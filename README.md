# bamazon
Bamazon is an application that uses Node.js and mySQL to interact with information in a virtual storefront. 

## Demo
https://drive.google.com/file/d/1NZa6opIxZTptHfLr11QPLqilaBZ0SjUF/view

## bamazonCustomer

This application starts with displaying the items that are currently on sale, the department, price, and amount in stock. 
It follows by asking the user what item they would like to purchase and prompting them to provide the item ID of the item they would wish to purchase and the quantity. If there aren't enough of the item, the application will start over and ask them again. 

Once the user is able to purchase items, the application returns the total of their purchase, and the remaining stock of the item they purchased.

## bamazonManager

This application gives the user four options to interact with the database:

1. View items on sale
  * This displays all the items on sale, the price and the quantity in stock
2. View Inventory
  * This displays all items that have less than 5 items in stock
3. Add Inventory
  * This prompts the user if they want to restock an item. If they select yes, a list of items, their item IDs and the amount in stock is displayed, followed by a question asking the user which item they would like to restock. Once they select an item, 20 will be added to that item's stock amount.
4. Add new product
  * This allows the user to add a new product, select which department it is in, how much it will cost and the starting quantity to have in stock. 

