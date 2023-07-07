const bcrypt = require('bcrypt');
const User = require('../models/User');
const Token = require('../models/Token');
const Address =  require("../models/Address");

async function register(req, res) {
    try {
        const data = req.body;
        const validAddress = await Address.getOneByUserInput(data);        
        if(validAddress) {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        data.password = await bcrypt.hash(data.password, salt);
        const result = await User.create(data, validAddress.id);
        res.status(201).json(result);        
        }else {
            console.log("ERROR! Address not found")
        }        
    } catch (error) {
        res.status(400).json({"error": error.message})
    }
};

async function login(req, res) {
    try {
        const data = req.body;
        const user = await User.getOneByUsername(data.username);
        const authenticated = await bcrypt.compare(data.password, user.password);        
        if (!authenticated) {
            throw new Error("Incorrect credentials.");
        } else {
            console.log("AUTHORIZED" );
            const token = await Token.create(user.id);
            res.status(200).json({ authenticated: true, token: token.token });
        }
    } catch (error) {
        res.status(403).json({"error": error.message})
    }
};

async function logout(req, res) {
    try {
        const userToken = req.headers.authorization;
        const token = userToken
        if (!userToken) {
            throw new Error('User not authenticated!');
        } else {
            const getToken = await Token.getOneByToken(token);
            await getToken.deleteByToken();
            res.status(200).json({ message: 'You logged out.' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function getUserByUsername(req, res) {
    try {
        const data = req.params;
        const user = await User.getOneByUsername(data.username);
        if (user){
            res.status(200).json(user)
        } else {
            res.status(404).json({error: `User not found!`})
        }       
    } catch (error) {
        res.status(500).json({"error": error.message});
    }
};

async function getUserById(req, res) {
    try {
        const id = parseInt(req.params.id);       
        const user = await User.getOneById(id);
        res.status(200).json(user);        
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
};

async function updateIsAdmin(req, res) {
    try {
        const data = req.params;
        const body = req.body;
        const user = await User.getOneByUsername(data.username);
        const result = await user.updateIsAdmin(body.isadmin);
        res.status(200).json(result);        
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
};

async function updatePoints(req, res) {
    try {
        const data = req.params;
        const body = req.body;
        const user = await User.getOneByUsername(data.username);
        const result = await user.updatePoints(parseInt(body.points));
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
};

async function updateUsername(req, res) {
    try {
        const data = req.params;
        const body = req.body;
        const user = await User.getOneByUsername(data.username);
        const result = await user.updateUsername(body.username);
        res.status(200).json(result);        
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
};

async function updatePassword(req, res) {
    try {
        const data = req.params;
        const body = req.body;
        const user = await User.getOneByUsername(data.username);
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
        body.password = await bcrypt.hash(body.password, salt);
        const result = await user.updatePassword(parseInt(user.id), body.password);
        res.status(200).json(result);        
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
};

async function updateAddressId(req, res) {
    try {
        const data = req.params;
        console.log(data)
        const body = req.body;
        console.log(body)
        const user = await User.getOneByUsername(data.username);
        const result = await user.updateAddressId(parseInt(body.address_id));
        res.status(200).json(result);        
    } catch (error) {
        res.status(404).json({"error": error.message});
    }    
};

async function showAll (req, res) {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({"error": err.message});
    }
};

async function destroy (req, res) {
    try {
        const id = parseInt(req.params.id);
        const user = await User.getOneById(id);             
        const token = await Token.getOneByUserId(id);
        let result;
        if(token) {
            await token.deleteByToken();  
            result = await user.destroy();
        }else{
            result = await user.destroy();
        }
        
        res.status(204).json(result);       
    } catch (error) {
        res.status(404).json({"error": error.message});
    }
};
module.exports = {register, login, logout, getUserByUsername, updateIsAdmin, updatePoints, updateAddressId, getUserById, destroy, showAll, updateUsername, updatePassword};
