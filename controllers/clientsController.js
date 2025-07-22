const fs = require('fs');
let data = require('../data.json');
const apiBase = '/api/v1';

const saveData = () => fs.writeFileSync('./data.json', JSON.stringify(data, null, 2));

// Controller functions
exports.getAllClients = (req, res) => {
    let { name, page = 1, limit = 10, sort = "id" } = req.query;
    let filtered = data;

    if (name) {
        filtered = filtered.filter(cli => cli.name.toLowerCase().includes(name.toLowerCase()));
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
        data: paginated.map(client => ({
            ...client,
            links: [
                { rel: "self", method: "GET", href: `${apiBase}/clients/${client.id}` },
                { rel: "update", method: "PUT", href: `${apiBase}/clients/${client.id}` },
                { rel: "delete", method: "DELETE", href: `${apiBase}/clients/${client.id}` }
            ]
        }))
    });
};

exports.getClientById = (req, res) => {
    const { id } = req.params;
    const client = data.find(cli => cli.id == id);

    if (!client) return res.status(404).json({ error: "Client not found." });

    res.json({
        ...client,
        links: [
            { rel: "self", method: "GET", href: `${apiBase}/clients/${id}` },
            { rel: "update", method: "PUT", href: `${apiBase}/clients/${id}` },
            { rel: "delete", method: "DELETE", href: `${apiBase}/clients/${id}` },
            { rel: "all", method: "GET", href: `${apiBase}/clients` }
        ]
    });
};

exports.createClient = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required." });
    }

    if (data.some(cli => cli.email === email)) {
        return res.status(409).json({ error: "Email already exists." });
    }

    const newClient = {
        id: data.length ? Math.max(...data.map(cli => cli.id)) + 1 : 1,
        name,
        email
    };

    data.push(newClient);
    saveData();

    res.status(201).json({
        ...newClient,
        links: [
            { rel: "self", method: "GET", href: `${apiBase}/clients/${newClient.id}` },
            { rel: "update", method: "PUT", href: `${apiBase}/clients/${newClient.id}` },
            { rel: "delete", method: "DELETE", href: `${apiBase}/clients/${newClient.id}` },
            { rel: "all", method: "GET", href: `${apiBase}/clients` }
        ]
    });
};

exports.updateClient = (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const clientIndex = data.findIndex(cli => cli.id == id);

    if (clientIndex === -1) return res.status(404).json({ error: "Client not found." });

    if (!name && !email) {
        return res.status(400).json({ error: "At least one field (name or email) is required." });
    }

    if (email && data.some((cli, idx) => cli.email === email && idx !== clientIndex)) {
        return res.status(409).json({ error: "Email already exists." });
    }

    if (name) data[clientIndex].name = name;
    if (email) data[clientIndex].email = email;

    saveData();
    res.json({
        ...data[clientIndex],
        links: [
            { rel: "self", method: "GET", href: `${apiBase}/clients/${id}` },
            { rel: "update", method: "PUT", href: `${apiBase}/clients/${id}` },
            { rel: "delete", method: "DELETE", href: `${apiBase}/clients/${id}` },
            { rel: "all", method: "GET", href: `${apiBase}/clients` }
        ]
    });
};

exports.deleteClient = (req, res) => {
    const { id } = req.params;
    const clientIndex = data.findIndex(cli => cli.id == id);

    if (clientIndex === -1) return res.status(404).json({ error: "Client not found." });

    const deleted = data.splice(clientIndex, 1)[0];
    saveData();

    res.json({
        ...deleted,
        links: [
            { rel: "all", method: "GET", href: `${apiBase}/clients` }
        ]
    });
};