import User from "@/models/user.model";
import connect from '@/utils/connect';
import withSessionRoute from "@/utils/session";

async function handler(req, res) {
    switch (req.method) {
        case "GET":
            // get requests should return logged-in user stored in session
            return res.send(req.session.user);
        case "POST":
            await connect("authorsDB"); // only need to connect to DB if logging in
            return User.checkLogin(req.body)
                .then(async user => {
                    req.session.user = user;
                    await req.session.save();
                    return res.json(user);
                })
                .catch(error => res.status(401).json(error))
        case "DELETE":
            req.session.destroy(); // clear session
            return res.json({ message: "success" });
        default:
            return res.status(404).json({ message: "404 not found" });
    }
}

export default withSessionRoute(handler);