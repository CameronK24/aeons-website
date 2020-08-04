module.exports = {
    getAllMembers: async (req, res) => {
        const db = req.app.get('db');

        await db.get_all_users()
            .then(response => {
                return res.status(200).send(response);
            })
            .catch (err => res.status(500).send(err));
    },
    getSingleMember: async (req, res) => {
        const {id} = req.params;

        const db = req.app.get('db');

        await db.get_single_user([id])
            .then(user => {
                return res.status(200).send(user);
            })
            .catch(err => res.status(500).send(err));
    }
}