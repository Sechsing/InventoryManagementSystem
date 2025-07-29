# Inventory Management System

A simple command-line inventory tracker built with Javascript and Node.js.

## Key Considerations

The system represents a single product using a JavaScript object with the properties id, name, and quantity. Multiple products are stored in a products.json file, where each product is listed as an object. This approach saves the inventory data between sessions, as it is saved to disk and not lost when the application is closed. Users interact with the system through a simple command-line interface by entering specific commands. For example, when a user attempts to update a product that does not exist, the system checks the products.json file for a matching id. If no match is found, it displays the message "Product not found" in the terminal. JavaScript was chosen for this project because it handles I/O operations asynchronously and allows the application to read from or write to files without blocking the program's execution. Additionally, JavaScript is widely adopted in web development, which brings potential for future expansion into a web application.

## Instructions

1. Run:

```bash
node index.js
```