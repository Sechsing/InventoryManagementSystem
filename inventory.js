const fs = require("fs/promises");
const path = "./products.json";

async function saveProducts(products) {
    await fs.writeFile(path, JSON.stringify(products, null, 2));
}

function generateId(products) {
    let id;
    do {
        id = Math.floor(Math.random() * 100000);
    } while (products.some(p => p.id === id));
    return id;
}

async function addProduct(name, quantity) {
    const products = await getAllProducts();
    const product = {
        id: generateId(),
        name,
        quantity
    };
    products.push(product);
    await saveProducts(products);
    return product
}

async function getAllProducts() {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function updateQuantity(id, quantity) {
    const products = await getAllProducts();
    const product = products.find(p => p.id === Number(id));
    if (!product) return false;
    product.quantity = quantity;
    await saveProducts(products);
    return true;
}

module.exports = {
    addProduct,
    getAllProducts,
    updateQuantity
}