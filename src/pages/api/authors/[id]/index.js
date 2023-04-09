import connect from "@/utils/connect";
import User from "@/models/user.model";
// have to import for populate to work
import Author from "@/models/author.model";

export default async function handler(req, res) {
    await connect("authorsDB");

    switch(req.method) {
        case "GET":
            return Author.findOne({ _id: req.query.id }).populate("user")
                .then(author => res.json(author))
                .catch(error => res.status(400).json(error));
        case "PUT" || "PATCH":
            return Author.findOneAndUpdate({ _id: req.query.id }, req.body, { new: true, runValidators: true })
                .then(author => res.json(author))
                .catch(error => res.status(400).json(error));
        case "DELETE":
            return Author.deleteOne({ _id: req.query.id })
                .then(result => res.json(result))
                .catch(error => res.status(400).json(error));
        default:
            return res.status(404).json({ message: "404 not found" });
    }
}