import connect from '@/utils/connect';
import User from '@/models/user.model';
import withSessionRoute from "@/utils/session";

async function handler(req, res) {
    if (req.method !== "POST")
        return res.status(404).json({ message : "404 not found"});

    await connect("authorsDB"); // connect to DB

    try {
        const user = await User.create(req.body);
        req.session.user = user;
        await req.session.save(); // save user to session
        return res.json(user);
    } catch (error) {
        return res.status(400).json(error);
    }
}

export default withSessionRoute(handler); // give the route access to session