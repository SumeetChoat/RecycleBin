const db =  require('../database/connect');

class Address {
    constructor ({address_id, street_name, house_number, postcode, zone_id}) {
        this.id = address_id;
        this.street_name = street_name;
        this.house_number = house_number;
        this.postcode = postcode;
        this.zone_id = zone_id;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM addresses_florin");
            return response.rows.map(a => new Address(a));
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneById(id) {
        try {
            const response = await db.query("SELECT * FROM addresses_florin WHERE address_id = $1", [id]);
            return new Address(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    static async getOneByUserInput(input) {
        try {
            const house_number = parseInt(input.house_number);
            const postcode = input.postcode;
            const response = await db.query("SELECT * FROM addresses_florin WHERE postcode = $1 AND house_number = $2", [postcode, house_number]);
            return new Address(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    static async create(data) {
        try {
            const { street_name, house_number, postcode, zone_id} = data;
            let response = await db.query("INSERT INTO addresses_florin (street_name, house_number, postcode, zone_id) VALUES ($1, $2, $3, $4) RETURNING *", [street_name, house_number, postcode, zone_id]);
            return new Address(response.rows[0]);              
        } catch (error) {
            console.log(error);
        }
    };

    async destroy() {
        try {
            const response = await db.query("DELETE FROM addresses_florin WHERE address_id = $1 RETURNING address_id;", [this.id]);
            return new Address(response.rows[0]);            
        } catch (error) {
            console.log(error);
        }
    };

    async update(data) {      
        try {
            const {street_name, house_number, postcode} = data;      
            const response = await db.query("UPDATE addresses_florin SET street_name = $1, house_number = $2, postcode = $3 WHERE address_id = $4 RETURNING *;", [street_name, house_number, postcode, this.id]);
            return new Address(response.rows[0]);            
        } catch (error) {
            console.log(error);
        }  
    };
};
module.exports = Address;
