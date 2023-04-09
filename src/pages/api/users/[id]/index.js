import connect from "@/utils/connect";
import User from "@/models/user.model";

export default async function handler(req, res) {
    await connect("authorsDB");

    switch(req.method) {
        case "GET":
            return User.findOne({ _id: req.query.id })
                .then(user => res.json(user))
                .catch(error => res.status(400).json(error));
        case "PUT" || "PATCH":
            return User.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true, runValidators: true })
                .then(user => res.json(user))
                .catch(error => res.status(400).json(error));
        case "DELETE":
            return User.deleteOne({ _id: req.query.id })
                .then(result => res.json(result))
                .catch(error => res.status(400).json(error));
        default:
            return res.status(404).json({ message: "404 not found"});
    }
}