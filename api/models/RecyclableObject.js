const db =  require('../database/connect');

class RecyclableObject {
    constructor ({object_id, name, material_type_id, bin_type_id}) {
        this.id = object_id;
        this.name = name;
        this.bin_type_id = bin_type_id
        this.material_type_id = material_type_id;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM recycling_object");
            return response.rows.map(o => new RecyclableObject(o));
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneById(id) {
        try {
            const response = await db.query("SELECT * FROM recycling_object WHERE object_id = $1", [id]);
            return new RecyclableObject(response.rows[0]);
        } catch (error) {
            console.log(error);
        }
    };

    static async create(data) {
        try {
            const { name, material_type_id, bin_type_id } = data;
            const response = await db.query("INSERT INTO recycling_object (name, material_type_id, bin_type_id) VALUES ($1, $2, $3) RETURNING *;", [name, material_type_id, bin_type_id]);
            return new RecyclableObject(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    static async searchInput(input) {        
        try {
            const response = await db.query("SELECT * FROM recycling_object WHERE name ILIKE '%' || $1 || '%'", [input]);       
            return response.rows;
        } catch (error) {
            console.log(error);
        }        
    };

    async destroy() {
        try {
            let response = await db.query("DELETE FROM recycling_object WHERE object_id = $1 RETURNING *;", [this.id]);
            return new RecyclableObject(response.rows[0]);            
        } catch (error) {
            console.log(error);
        }
    };

    async update(data) {      
        try {
            const {name, material_type_id, bin_type_id} = data;        
            const response = await db.query("UPDATE recycling_object SET name = $1, material_type_id = $2, bin_type_id =$3 WHERE object_id = $4 RETURNING *;", [name, material_type_id, bin_type_id, this.id]);
            return new RecyclableObject(response.rows[0]);            
        } catch (error) {
            console.log(error);
        }  
    };
};
module.exports = RecyclableObject;
