const db =  require('../database/connect');
const { v4: uuidv4 } = require("uuid");

class Token {
    constructor({token_id, user_id, token}) {
        this.user_id = user_id; 
        this.token_id = token_id;
        this.token = token;
    };

    static async create(user_id) {
        try {
            const token = uuidv4();
            const response =  await db.query('INSERT INTO token (user_id, token) VALUES ($1, $2) RETURNING *', [user_id, token]);
            return new Token(response.rows[0]);            
        } catch (error) {
            console.log(error);
        }    
    };

    // static async getOneById(token_id) {
    //     try {
    //         const response =  await db.query("SELECT * FROM token WHERE token_id = $1", [token_id]);
    //         return new Token(response.rows[0]);            
    //     } catch (error) {
    //         console.log(error);
    //     }    
    // };

    static async getOneByUserId(user_id) {
        try {
            const response =  await db.query("SELECT * FROM token WHERE user_id = $1", [user_id]);
            return new Token(response.rows[0]);            
        } catch (error) {
            console.log(error);
        }    
    };


    static async getOneByToken(token) {
        try {
            const response =  await db.query("SELECT * FROM token WHERE token = $1", [token]);
            return new Token(response.rows[0]);            
        } catch (error) {
            console.log(error);
        }    
    };

    async deleteByToken() {
        try {
            await db.query('DELETE FROM token WHERE user_id = $1', [this.user_id]);
            await db.query('DELETE FROM token WHERE token_id = $1', [this.id]);            
        } catch (error) {
            console.log(error);
        }        
    };
};
module.exports = Token;
