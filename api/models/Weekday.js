const db =  require('../database/connect');

class Weekday {
    constructor ({weekday, weekday_id}) {
        this.id = weekday_id;
        this.weekday = weekday;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM weekdays");
            return response.rows.map(a => new Weekday(a));
        } catch (error) {
            console.log(error)
        }        
    };

    static async getOneByName(name) {
        try {
            const response = await db.query("SELECT * FROM weekdays WHERE weekday = $1", [name]);
            return new Weekday(response.rows[0]);
        } catch (error) {
            console.log(error)   
        }
    };

    static async getOneById(id) {
        try {
            const response = await db.query("SELECT * FROM weekdays WHERE weekday_id = $1", [id]);
            return new Weekday(response.rows[0]);
        } catch (error) {
            console.log(error)
        }        
    };

    static async create(data) {
        try {
            const {weekday} = data;
            let response = await db.query("INSERT INTO weekdays (weekday) VALUES ($1) RETURNING *;", [weekday]);
            return new Weekday(response.rows[0]);
        } catch (error) {
            console.log(error)
        }        
    };

    async destroy() {
        try {
            const response = await db.query("DELETE FROM weekdays WHERE weekday_id = $1 RETURNING *;", [this.id]);
            return new Weekday(response.rows[0]);
        } catch (error) {
            console.log(error)
        }        
    };

    async update(data) {        
        try {
            const {weekday} = data;        
            const response = await db.query("UPDATE weekdays SET weekday = $1 WHERE weekday_id = $2 RETURNING *;", [weekday, this.id]);
            return new Weekday(response.rows[0]);
            
        } catch (error) {
            console.log(error)
        }        
    };
};
module.exports = Weekday;
