const AddressZone = require('../models/AddressZone');

async function showAll (req, res) {
    try {
        const addressZones = await AddressZone.getAll();
        res.status(200).json(addressZones);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function showOneByNumber(req, res) {
    try {
        const number = req.params;        
        const addressZone = await AddressZone.getOneByNumber(number.AddressZone);
        res.status(200).json(addressZone);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneById (req, res) {
    try {
        const id = parseInt(req.params.id);        
        const addressZone = await AddressZone.getOneById(id);
        res.status(200).json(addressZone);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await AddressZone.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const addressZone = await AddressZone.getOneById(id);
        const result = await addressZone.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const addressZone = await AddressZone.getOneById(id);  
        const result = await addressZone.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, showOneByNumber, showOneById, destroy, update, create}; 
