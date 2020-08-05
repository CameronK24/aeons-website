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
    }
}