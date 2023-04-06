import connect from '@/utils/connect';
import Author from '@/models/author.model';
import User from "@/models/user.model"; // have to import for populate to work
import withSessionRoute from '@/utils/session';

async function handler(req, res) {
    await connect("authorsDB");

    switch (req.method) {
        case "GET":
            return Author.find().populate("user")
                .then(allAuthors => res.json(allAuthors))
                .catch(error => res.status(400).json(error));
        case "POST":
            return Author.create({...req.body, user: req.session.user._id })
                .then(author => res.json(author))
                .catch(error => res.status(400).json(error));
        default:
            return res.status(404).json({ message : "404 not found"});
    }
}

export default withSessionRoute(handler);