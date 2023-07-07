const db =  require('../database/connect');

class CollectDays {
    constructor ({collect_day_id, zone_id, bin_type_id, weekday_id}) {
        this.id = collect_day_id;
        this.zone_id = zone_id;
        this.bin_type_id = bin_type_id;
        this.weekday_id = weekday_id;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM collect_days");
            return response.rows.map(c => new CollectDays(c));
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneById(id) {
        try {
            const response = await db.query("SELECT * FROM collect_days WHERE collect_day_id = $1", [id]);
            return new CollectDays(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    static async getByZoneId(zone_id) {
        try {
            const response = await db.query("SELECT * FROM collect_days WHERE zone_id = $1", [zone_id]);
            return response.rows;
        } catch (error) {
            console.log(error);
        }
    };

    static async create(data) {
        try {
            const { zone_id, bin_type_id, weekday_id } = data;
            const response = await db.query("INSERT INTO collect_days (zone_id, bin_type_id, weekday_id) VALUES ($1, $2, $3) RETURNING *;", [zone_id, bin_type_id, weekday_id]);
            return new CollectDays(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async destroy() {
        try {
            let response = await db.query("DELETE FROM collect_days WHERE collect_day_id = $1 RETURNING *;", [this.id]);
            return new CollectDays(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };

    async update(data) {  
        try {
            const {zone_id, bin_type_id, weekday_id} = data;        
            const response = await db.query("UPDATE collect_days SET zone_id = $1, bin_type_id =$2, weekday_id = $3 WHERE collect_day_id = $4 RETURNING *;", [zone_id, bin_type_id, weekday_id, this.id]);
            return new CollectDays(response.rows[0]);
        } catch (error) {
            console.log(error);            
        }        
    };
};
module.exports = CollectDays;
