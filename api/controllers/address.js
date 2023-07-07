const Address = require('../models/Address');

async function showAll (req, res) {
    try {
        const addresses = await Address.getAll();
        res.status(200).json(addresses);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Address.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function showOneById (req, res) {
    try {
        const id = parseInt(req.params.id);
        const address = await Address.getOneById(id);
        res.status(200).json(address);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneByUserInput (req, res) {
    try {
        const data = req.params;
        const address = await Address.getOneByUserInput(data);
        res.status(200).json(address);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const address = await Address.getOneById(id);
        const result = await address.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const address = await Address.getOneById(id);  
        const result = await address.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, create, destroy, update, showOneByUserInput, showOneById}; 
