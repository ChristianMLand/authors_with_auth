import connect from "@/utils/connect";
import User from "@/models/user.model";

export default async function handler(req, res) {
    await connect("authorsDB");

    switch (req.method) {
        case "GET":
            return User.find()
                .then(allUsers => res.json(allUsers))
                .catch(error => res.status(400).json(error));
        case "POST":
            // could add user to session if we wanted to login immediately
            return User.create(req.body)
                .then(user => res.json(user)) 
                .catch(error => res.status(400).json(error));
        default:
            return res.status(404).json({ message: "404 not found" });
    }
}