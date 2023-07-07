const MaterialsType = require('../models/MaterialsType');

async function showAll (req, res) {
    try {
        const materialsTypes = await MaterialsType.getAll();
        res.status(200).json(materialsTypes);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function showOneByName (req, res) {
    try {
        const name = req.params;        
        const materialsType = await MaterialsType.getOneByName(name.MaterialsType);
        res.status(200).json(materialsType);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneById (req, res) {
    try {
        const id = parseInt(req.params.id);        
        const materialsType = await MaterialsType.getOneById(id);
        res.status(200).json(materialsType);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await MaterialsType.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const materialsType = await MaterialsType.getOneById(id);
        const result = await materialsType.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const materialsType = await MaterialsType.getOneById(id);  
        const result = await materialsType.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, showOneByName, showOneById, destroy, update, create}; 
