const readline = require("readline");
const inventory = require("./inventory");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Welcome to the Inventory Management System");
console.log("Commands: Add, List, Update, Exit");

rl.setPrompt("Enter command: ")
rl.prompt();

rl.on("line", async (line) => {
    const cmd = line.trim();

    if (cmd === "Add") {
        rl.question("Enter product name: ", (name) => {
            rl.question("Enter quantity: ", async (qty) => {
                const quantity = parseInt(qty);
                if (isNaN(quantity) || quantity <= 0) {
                    console.log("Invalid quantity. Please enter a positive number.");
                } else {
                    const products = await inventory.getAllProducts();
                    const exists = products.some(p => p.name.toLowerCase() === name.toLowerCase());

                    if (exists) {
                        console.log("Product already exists.");
                    } else {
                        const product = await inventory.addProduct(name, quantity);
                        console.log("Added:", product);
                    }
                }
                rl.prompt();
            });
        });
    } else if (cmd === "List") {
        const products = await inventory.getAllProducts();
        console.table(products.map(({ id, name, quantity }) => ({ id, name, quantity})));
        rl.prompt();
    } else if (cmd === "Update") {
        rl.question("Enter product id: ", (id) => {
            rl.question("Enter new quantity: ", async (qty) => {
                const quantity = parseInt(qty);
                if (isNaN(quantity) || quantity <= 0) {
                    console.log("Invalid quantity. Please enter a positive number.");
                } else {
                    const success = await inventory.updateQuantity(id, quantity);
                    console.log(success ? "Quantity updated." : "Product not found.");
                }
                rl.prompt();
            });
        });
    } else if (cmd === "Exit") {
        rl.close();
    } else {
        console.log("Command not found.");
        rl.prompt();
    }
});