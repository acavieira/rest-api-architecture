const fs = require('fs');
let data = require('../products.json');
const apiBase = '/api/v1';

const saveData = () => fs.writeFileSync('./products.json', JSON.stringify(data, null, 2));

// Controller functions
exports.getAllProducts = (req, res) => {
    let { name, page = 1, limit = 10, sort = "id" } = req.query;
    let filtered = data;

    if (name) {
        filtered = filtered.filter(prod => prod.name.toLowerCase().includes(name.toLowerCase()));
    }

    filtered = filtered.sort((a, b) => {
        if (a[sort] < b[sort]) return -1;
        if (a[sort] > b[sort]) return 1;
        return 0;
    });

    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + Number(limit));

    res.json({
        page: Number(page),
        limit: Number(limit),
        total: filtered.length,
        data: paginated.map(product => ({
            ...product,
            links: [
                { rel: "self", method: "GET", href: `${apiBase}/products/${product.id}` },
                { rel: "update", method: "PUT", href: `${apiBase}/products/${product.id}` },
                { rel: "delete", method: "DELETE", href: `${apiBase}/products/${product.id}` }
            ]
        }))
    });
};

exports.getProductById = (req, res) => {
    const { id } = req.params;
    const product = data.find(prod => prod.id == id);

    if (!product) return res.status(404).json({ error: "Product not found." });

    res.json({
        ...product,
        links: [
            { rel: "self", method: "GET", href: `${apiBase}/products/${id}` },
            { rel: "update", method: "PUT", href: `${apiBase}/products/${id}` },
            { rel: "delete", method: "DELETE", href: `${apiBase}/products/${id}` },
            { rel: "all", method: "GET", href: `${apiBase}/products` }
        ]
    });
};

exports.createProduct = (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({ error: "Name and price are required." });
    }

    if (data.some(prod => prod.name === name)) {
        return res.status(409).json({ error: "Product name already exists." });
    }

    const newProduct = {
        id: data.length ? Math.max(...data.map(prod => prod.id)) + 1 : 1,
        name,
        price
    };

    data.push(newProduct);
    saveData();

    res.status(201).json({
        ...newProduct,
        links: [
            { rel: "self", method: "GET", href: `${apiBase}/products/${newProduct.id}` },
            { rel: "update", method: "PUT", href: `${apiBase}/products/${newProduct.id}` },
            { rel: "delete", method: "DELETE", href: `${apiBase}/products/${newProduct.id}` },
            { rel: "all", method: "GET", href: `${apiBase}/products` }
        ]
    });
};

exports.updateProduct = (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;
    const productIndex = data.findIndex(prod => prod.id == id);

    if (productIndex === -1) return res.status(404).json({ error: "Product not found." });

    if (!name && price === undefined) {
        return res.status(400).json({ error: "At least one field (name or price) is required." });
    }

    if (name && data.some((prod, idx) => prod.name === name && idx !== productIndex)) {
        return res.status(409).json({ error: "Product name already exists." });
    }

    if (name) data[productIndex].name = name;
    if (price !== undefined) data[productIndex].price = price;

    saveData();
    res.json({
        ...data[productIndex],
        links: [
            { rel: "self", method: "GET", href: `${apiBase}/products/${id}` },
            { rel: "update", method: "PUT", href: `${apiBase}/products/${id}` },
            { rel: "delete", method: "DELETE", href: `${apiBase}/products/${id}` },
            { rel: "all", method: "GET", href: `${apiBase}/products` }
        ]
    });
};

exports.deleteProduct = (req, res) => {
    const { id } = req.params;
    const productIndex = data.findIndex(prod => prod.id == id);

    if (productIndex === -1) return res.status(404).json({ error: "Product not found." });

    const deleted = data.splice(productIndex, 1)[0];
    saveData();

    res.json({
        ...deleted,
        links: [
            { rel: "all", method: "GET", href: `${apiBase}/products` }
        ]
    });
};