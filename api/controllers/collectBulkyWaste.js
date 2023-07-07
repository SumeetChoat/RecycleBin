const CollectBulkyWaste =  require('../models/CollectBulkyWaste');

async function showAll (req, res) {
    try {
        const collectBulkyWaste = await CollectBulkyWaste.getAll();
        res.status(200).json(collectBulkyWaste);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await CollectBulkyWaste.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function showOne (req, res) {
    try {
        const id = parseInt(req.params.id);
        const collectBulkyWaste = await CollectBulkyWaste.getOneById(id);
        res.status(200).json(collectBulkyWaste);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneByWeight (req, res) {
    try {
        const weight = parseInt(req.params.weight);
        console.log(weight)
        const collectBulkyWaste = await CollectBulkyWaste.getOneByWeight(weight);
        res.status(200).json(collectBulkyWaste);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const collectBulkyWaste = await CollectBulkyWaste.getOneById(id);
        const result = await collectBulkyWaste.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const collectBulkyWaste = await CollectBulkyWaste.getOneById(id);  
        const result = await collectBulkyWaste.update(data);
        res.status(200).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, create, showOne, destroy, update, showOneByWeight};
