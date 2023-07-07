const db =  require('../database/connect');

class MaterialsType {
    constructor ({material_type_id, name}) {
        this.id = material_type_id;
        this.name = name;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM materials_type");
            return response.rows.map(a => new MaterialsType(a));
        } catch (error) {
            console.log(error);
        }
        
    };

    static async getOneByName(name) {
        try {
            const response = await db.query("SELECT * FROM materials_type WHERE name = $1", [name]);
            return new MaterialsType(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneById(id) {
        try {
            const response = await db.query("SELECT * FROM materials_type WHERE material_type_id = $1", [id]);
            return new MaterialsType(response.rows[0]);
        } catch (error) {
            console.log(error)
        }        
    };

    static async create(data) {
        try {
            const {name } = data;
            let response = await db.query("INSERT INTO materials_type (name) VALUES ($1) RETURNING *;", [name]);
            return new MaterialsType(response.rows[0]);    
        } catch (error) {
            console.log(error);
        }        
    };   

    async destroy() {
        try {
            await db.query("UPDATE recycling_object SET material_type_id = $1 WHERE material_type_id = $2 RETURNING *;", [1, this.id])
            const response = await db.query("DELETE FROM materials_type WHERE material_type_id = $1 RETURNING *;", [this.id]);
            return new MaterialsType(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async update(data) {       
        try {
            const {name} = data;        
            const response = await db.query("UPDATE materials_type SET name = $1 WHERE material_type_id = $2 RETURNING *;", [name, this.id]);
            return new MaterialsType(response.rows[0]);
        } catch (error) {
            console.log(error);
        }         
    };
};
module.exports = MaterialsType;
