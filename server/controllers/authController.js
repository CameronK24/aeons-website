const bcrypt = require('bcryptjs');
const axios = require('axios');

const fcId = '9228579323923938447';

module.exports = {
    register: async (req, res) => {
        const {characterFirst, characterLast, email, password} = req.body;

        const character = await axios.get(`https://xivapi.com/character/search?name=${characterFirst}+${characterLast}&server=Mateus`)
            .then(response => {
                return response.data.Results;
            })
            .catch(err => console.log(err));
        // console.log(character);
        let characterInfo
        
        if (character[0]) {
            characterInfo = await axios.get(`https://xivapi.com/character/${character[0].ID}`)
            .then(info => {
                return info.data.Character;
            })
            .catch(err => console.log(err));
        }       
        else {
            return res.status(409).send('Character not found. Please check your spelling and try again. Thank you.');
        }
        if (characterInfo.FreeCompanyId !== fcId) {
            // console.log(characterInfo.FreeCompanyId, fcId);
            return res.status(409).send('You are not apart of the Order of Bahamut Free Company. If this is an error please contact Celestine Spiritfire on Discord or in game.');
        }
        const {Avatar, Name, Portrait} = characterInfo
        // console.log(Avatar, Name, Portrait);

        const db = req.app.get('db');
        const results = await db.get_user_by_name([Name]);
        const existingUser = results[0];
        if (existingUser) {
            return res.status(401).send(`${Name} has already registered on the website. If you are having trouble logging in or registering please contact Celestine Spiritfire on Discord or in game.`);
        }

        const emailResults = await db.get_user_by_email([email]);
        const emailCheck = emailResults[0];
        if (emailCheck) {
            return res.status(401).send('This email is already in use. Please use a different email. If you have any issues please contact Celestine Spiritfire on Discord or in game. Thank you.');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registerUser = await db.register_user([email, hash, Name, Avatar, Portrait]);
        const user = registerUser[0];
        
        return res.status(200).send(user);
    },
    login: async (req, res) => {
        const {email, password} = req.body;
        const db = req.app.get('db');
        const results = await db.get_user_by_email([email]);
        const existingUser = results[0];
        if (!existingUser) {
            return res.status(401).send('Email not found.');
        }
        const isAuthenticated = bcrypt.compareSync(password, existingUser.password);
        if (!isAuthenticated) {
            return res.status(403).send('Incorrect password');
        }
        return res.status(200).send(existingUser);
    }
}