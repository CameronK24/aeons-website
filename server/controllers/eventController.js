const { response } = require("express");

module.exports = {
    createEvent: async (req, res) => {
        const {userId, title, date, time, tz, details} = req.body;

        const db = req.app.get('db')

        await db.create_event([userId, title, date, time, tz, details])
            .then(response => {
                res.sendStatus(200);
            })
            .catch(err => res.status(500).send(err));
    },
    
    getAllEvents: async (req, res) => {
        const db = req.app.get('db');

        await db.get_all_events()
            .then(events => {
                res.status(200).send(events);
            })
            .catch(err => res.status(500).send(err));
    },

    getSingleEvent: async (req, res) => {
        const {id} = req.params;

        const db = req.app.get('db');

        await db.get_single_event([id])
            .then(event => {
                res.status(200).send(event);
            })
            .catch(err => res.status(500).send(err));
    },

    editEvent: async (req, res) => {
        const {event_id, event_title, event_date, event_time, event_timezone, event_details} = req.body;

        const db = req.app.get('db');

        await db.edit_event([event_id, event_title, event_date, event_time, event_timezone, event_details])
            .then(() => {
                return res.sendStatus(200);
            })
            .catch(err => res.status(500).send(err));

    }
}