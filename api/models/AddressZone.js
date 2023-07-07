const db =  require('../database/connect');

class AddressZone {
    constructor ({zone_id, zone_number}) {
        this.id = zone_id;
        this.zone_number = zone_number;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM address_zones");
            return response.rows.map(a => new AddressZone(a));
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneByNumber(number) {
        try {
            const response = await db.query("SELECT * FROM address_zones WHERE zone_number = $1", [number]);        
            return new AddressZone(response.rows[0]);
        } catch (error) {
            console.log(error);
        }       
    };

    static async getOneById(id) {
        try {
            const response = await db.query("SELECT * FROM address_zones WHERE zone_id = $1", [id]);        
            return new AddressZone(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    static async create(data) {
        try {
            const {zone_number } = data;
            const response = await db.query("INSERT INTO address_zones (zone_number) VALUES ($1) RETURNING *;", [zone_number]);
            return new AddressZone(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async destroy() {
        try {
            await db.query("UPDATE addresses_florin SET zone_id = $1 WHERE zone_id = $2 RETURNING *;", [1, this.id]);
            await db.query("UPDATE collect_days SET zone_id = $1 WHERE zone_id = $2 RETURNING *;", [1, this.id]);
            const response = await db.query("DELETE FROM address_zones WHERE zone_id = $1 RETURNING *;", [this.id]);
            return new AddressZone(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async update(data) { 
        try {
            const {zone_number} = data;        
            const response = await db.query("UPDATE address_zones SET zone_number = $1 WHERE zone_id = $2 RETURNING *;", [zone_number, this.id]);
            return new AddressZone(response.rows[0]);
        } catch (error) {
            console.log(error);
        }         
    };
};
module.exports = AddressZone;
