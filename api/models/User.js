const db =  require('../database/connect');

class User {
    constructor({user_id, username, password, isadmin, address_id, points}){
    this.id = user_id;
    this.username = username;
    this.password = password;
    this.isAdmin = isadmin;
    this.address_id = address_id;
    this.points = points;
    };

    static async getAll() {
        try {
            const response = await db.query("SELECT * FROM user_account");
            return response.rows.map(a => new User(a));
        } catch (error) {
            console.log(error);
        }        
    };

    static async getOneById(id) {
        try {
            const response = await db.query('SELECT * from user_account WHERE user_id = $1', [id]);          
            return new User(response.rows[0]);      
        } catch (error) {
            console.log(error);
        } 
    };

    static async getOneByUsername(username) {
        try {
            const response = await db.query('SELECT * from user_account WHERE username = $1', [username]);
            return new User(response.rows[0]);      
        } catch (error) {
            console.log(error);
        } 
    };

    static async create(data, address_id) {    
        try {
            const {username, password, isAdmin = false} = data;
            const response = await db.query('INSERT INTO user_account (username, password, isAdmin, address_id) VALUES ($1, $2, $3, $4) RETURNING *', [username, password, isAdmin, address_id]); 
            return new User(response.rows[0]);      
        } catch (error) {
            console.log(error);
        } 
    };

    async updateIsAdmin(data) {
        try {
            const response =  await db.query("UPDATE user_account SET isAdmin = $1 WHERE user_id = $2 RETURNING *;", [data, this.id]);
            return new User(response.rows[0]);            
        } catch (error) {
            console.log(error);
        } 
    };

    async updatePoints(data) {
        try {
            const response =  await db.query("UPDATE user_account SET points = $1 WHERE user_id = $2 RETURNING *;", [data + this.points, this.id]);
            return new User(response.rows[0]);            
        } catch (error) {
            console.log(error);
        } 
    };

    async updateAddressId(data) {
        try {
            const response =  await db.query("UPDATE user_account SET address_id = $1 WHERE user_id = $2 RETURNING *;", [data, this.id]);
            return new User(response.rows[0]);            
        } catch (error) {
            console.log(error);
        } 
    };

    async updatePassword(user, data) {
        try {
            const response =  await db.query("UPDATE user_account SET password = $1 WHERE user_id = $2 RETURNING *;", [data, user]);
            return new User(response.rows[0]);            
        } catch (error) {
            console.log(error);
        } 
    };

    async updateUsername(data) {
        try {
            const response =  await db.query("UPDATE user_account SET username = $1 WHERE user_id = $2 RETURNING *;", [data, this.id]);
            return new User(response.rows[0]);            
        } catch (error) {
            console.log(error);
        } 
    };

    async destroy() {
        try {
            let response = await db.query("DELETE FROM user_account WHERE user_id = $1 RETURNING *;", [this.id]);
            return new User(response.rows[0]);
        } catch (error) {
            console.log(error);
        }        
    };
};
module.exports = User;
