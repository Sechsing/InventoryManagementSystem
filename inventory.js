const fs = require("fs/promises");
const path = "./products.json";

async function loadProducts() {
    try {
        const data = await fs.readFile(path, "utf-8");
        return JSON.parse(data);
    } catch {
        return [];
    }
}

async function saveProducts(products) {
    await fs.writeFile(path, JSON.stringify(products, null, 2));
}

function generateId() {
    return "SKU" + Math.floor(Math.random() * 100000);
}

async function addProduct(name, quantity) {
    const products = await loadProducts();
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
    return await loadProducts();
}

async function updateQuantity(name, quantity) {
    const products = await loadProducts();
    const product = products.find(p => p.name === name);
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