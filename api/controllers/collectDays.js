const CollectDays =  require('../models/CollectDays');

async function showAll (req, res) {
    try {
        const collectDays = await CollectDays.getAll();
        res.status(200).json(collectDays);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await CollectDays.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function showOne (req, res) {
    try {
        const id = parseInt(req.params.id);
        const collectDays = await CollectDays.getOneById(id);
        res.status(200).json(collectDays);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showByZoneId (req, res) {
    try {
        const id = parseInt(req.params.id);
        const collectDays = await CollectDays.getByZoneId(id);
        res.status(200).json(collectDays);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const collectDays = await CollectDays.getOneById(id);
        const result = await collectDays.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const collectDays = await CollectDays.getOneById(id);  
        const result = await collectDays.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, create, showOne, destroy, update, showByZoneId };
