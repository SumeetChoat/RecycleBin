const Object = require('../models/RecyclableObject');

async function showAll (req, res) {
    try {
        const objects = await Object.getAll();
        res.status(200).json(objects);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Object.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function showOne (req, res) {
    try {
        const id = parseInt(req.params.id);
        const object = await Object.getOneById(id);
        res.status(200).json(object);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function findInput (req, res) {
    try {
        const input = req.params.input;
        let name = await Object.searchInput(input);
        res.status(200).json(name);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const object = await Object.getOneById(id);
        const result = await object.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const recyclableObject = await Object.getOneById(id);     
        const result = await recyclableObject.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, create, showOne, destroy, update, findInput};
