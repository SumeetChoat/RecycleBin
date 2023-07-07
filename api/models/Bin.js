const db =  require('../database/connect');

class Bin {
    constructor ({bin_type_id, bin_type_name}) {
        this.bin_type_id = bin_type_id;
        this.bin_type_name = bin_type_name;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM bin_types");
            return response.rows.map(a => new Bin(a));
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneByName(name) {
        try {
            const response = await db.query("SELECT * FROM bin_types WHERE bin_type_name ILIKE '%' || $1 || '%'", [name]);
            return response.rows[0];
        } catch (error) {
            
        }
    };

    static async getOneById(id) {
        try {
           const response = await db.query("SELECT * FROM bin_types WHERE bin_type_id = $1", [id]);
           return new Bin(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    static async create(data) {
        try {
            const {bin_type_name } = data;
            const response = await db.query("INSERT INTO bin_types (bin_type_name) VALUES ($1) RETURNING *;", [bin_type_name]);
            return new Bin(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async destroy() {
        try {
            await db.query("DELETE FROM collect_days WHERE bin_type_id = $1 RETURNING *;", [this.bin_type_id]);
            await db.query("UPDATE recycling_object SET bin_type_id = $1 RETURNING *;", [8]);
            const response = await db.query("DELETE FROM bin_types WHERE bin_type_id = $1 RETURNING *;", [this.bin_type_id]);
            return new Bin(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async update(data) {        
        try {
            const {bin_type_name} = data;        
            const response = await db.query("UPDATE bin_types SET bin_type_name = $1 WHERE bin_type_id = $2 RETURNING *;", [bin_type_name, this.bin_type_id]);
            return new Bin(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };
};
module.exports = Bin;
