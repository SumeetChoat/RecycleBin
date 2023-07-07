const Bin = require('../models/Bin');

async function showAll (req, res) {
    try {
        const bins = await Bin.getAll();
        res.status(200).json(bins);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function showOneByName (req, res) {
    try {
        const name = (req.params.name).slice(0,3);
        const bin = await Bin.getOneByName(name);
        
        res.status(200).json(bin);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneById (req, res) {
    try {
        const id = parseInt(req.params.id);        
        const bin = await Bin.getOneById(id);
        res.status(200).json(bin);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Bin.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const bin = await Bin.getOneById(id);
        const result = await bin.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const bin = await Bin.getOneById(id);  
        const result = await bin.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, showOneByName, showOneById, destroy, update, create}; 
