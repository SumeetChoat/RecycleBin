const db =  require('../database/connect');

class CollectBulkyWaste {
    constructor ({bulky_waste_id, weight_kg, price}) {
        this.id = bulky_waste_id;
        this.weight_kg = weight_kg;
        this.price = price;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM collect_bulky_waste");
            return response.rows.map(o => new CollectBulkyWaste(o));
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneById(id) {
        try {
            const response = await db.query("SELECT * FROM collect_bulky_waste WHERE bulky_waste_id = $1", [id]);
            return new CollectBulkyWaste(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    static async getOneByWeight(weight) {
        try {
            const response = await db.query("SELECT * FROM collect_bulky_waste WHERE weight_kg = $1", [weight]);
            return new CollectBulkyWaste(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    static async create(data) {
        try {
            const { weight_kg, price } = data;
            const response = await db.query("INSERT INTO collect_bulky_waste (weight_kg, price) VALUES ($1, $2) RETURNING *;", [weight_kg, price]);
            return new CollectBulkyWaste(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async destroy() {
        try {
            let response = await db.query("DELETE FROM collect_bulky_waste WHERE bulky_waste_id = $1 RETURNING *;", [this.id]);
            return new CollectBulkyWaste(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async update(data) {        
        try {
            const {weight_kg, price} = data;        
            const response = await db.query("UPDATE collect_bulky_waste SET weight_kg = $1, price = $2 WHERE bulky_waste_id = $3 RETURNING *;", [weight_kg, price, this.id]);
            return new CollectBulkyWaste(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };
};
module.exports = CollectBulkyWaste;
