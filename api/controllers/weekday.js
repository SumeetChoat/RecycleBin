const Weekday = require('../models/Weekday');

async function showAll (req, res) {
    try {
        const weekdays = await Weekday.getAll();
        res.status(200).json(weekdays);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function showOneByName (req, res) {
    try {
        const name = req.params;        
        const weekday = await Weekday.getOneByName(name.weekday);
        res.status(200).json(weekday);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function showOneById (req, res) {
    try {
        const id = parseInt(req.params.id);        
        const weekday = await Weekday.getOneById(id);
        res.status(200).json(weekday);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function create (req, res) {
    try {
        const data = req.body;
        const result = await Weekday.create(data);
        res.status(201).send(result);
    } catch (err) {
        res.status(400).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const weekday = await Weekday.getOneById(id);
        const result = await weekday.destroy();
        res.status(204).end();
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

async function update (req, res) {
    try {
        const id = parseInt(req.params.id);
        const data = req.body;
        const weekday = await Weekday.getOneById(id);  
        const result = await weekday.update(data);
        res.status(201).json(result);
    } catch (err) {
        res.status(404).json({"error": err.message});
    }
};

module.exports = {showAll, showOneByName, showOneById, create, destroy, update}; 
