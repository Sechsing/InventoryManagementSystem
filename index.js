const readline = require("readline");
const inventory = require("./inventory");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Welcome to the Inventory Management System");
console.log("Commands: add, list, update, exit");

rl.setPrompt("> ")
rl.prompt();

rl.on("line", async (line) => {
    const cmd = line.trim();

    if (cmd === "add") {
        rl.question("Enter product name: ", (name) => {
            rl.question("Enter quantity: ", async (qty) => {
                const quantity = parseInt(qty);
                if (isNaN(quantity)) {
                    console.log("Invalid quantity.");
                } else {
                    const product = await inventory.addProduct(name, quantity);
                    console.log("Added: ", product);
                }
                rl.prompt();
            });
        });
    } else if (cmd === "list") {
        const products = await inventory.getAllProducts();
        console.table(products.map(({ id, name, quantity }) => ({ id, name, quantity})));
        rl.prompt();
    } else if (cmd === "update") {
        rl.question("Enter product name: ", (name) => {
            rl.question("Enter new quantity: ", async (qty) => {
                const quantity = parseInt(qty);
                if (isNaN(quantity)) {
                    console.log("Invalid quantity.");
                } else {
                    const success = await inventory.updateQuantity(name, quantity);
                    console.log(success ? "Quantity updated." : "Product not found.");
                }
                rl.prompt();
            });
        });
    } else if (cmd === "exit") {
        rl.close();
    } else {
        console.log("Unknown command.");
        rl.prompt();
    }
});