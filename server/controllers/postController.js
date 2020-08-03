module.exports = {
    createPost: async (req, res) => {
        const {userId, title, image, content} = req.body;

        const db = req.app.get('db');

        await db.create_post([userId, title, image, content])
            .then(() => {
                res.sendStatus(200);
            })
            .catch(err => res.status(400).send(err));
    }
}